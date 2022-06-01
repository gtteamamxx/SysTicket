import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CurrentPageListenerService } from './core/services/current-page-listener.service';
import { SpinnerState } from './core/store/spinner.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @Select(SpinnerState.isVisible)
  isSpinnerVisible$!: Observable<boolean>;


  @Select(SpinnerState.loadingText)
  spinnerLoadingText$!: Observable<string | null>;

  constructor(
    private readonly currentPageListenerService: CurrentPageListenerService) { }

  ngOnInit(): void {
    this.currentPageListenerService.startListening();
  }
}
