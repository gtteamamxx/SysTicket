import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CurrentPageListenerService } from './core/services/current-page-listener.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly currentPageListenerService: CurrentPageListenerService
  ) {}

  ngOnInit(): void {
    this.currentPageListenerService.startListening();
  }
}
