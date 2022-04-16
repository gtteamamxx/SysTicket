import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CurrentPageStateActions } from './core/store/current-page.state.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store, private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        const pageTitle: string = event.snapshot.firstChild?.data['title'];

        this.store.dispatch(
          new CurrentPageStateActions.SetCurrentPageTitle({ title: pageTitle })
        );
      }
    });
  }
}
