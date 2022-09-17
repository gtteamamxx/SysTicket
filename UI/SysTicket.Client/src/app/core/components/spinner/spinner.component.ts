import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpinnerState } from '../../store/spinner.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Select(SpinnerState.isVisible)
  isSpinnerVisible$!: Observable<boolean>;

  @Select(SpinnerState.loadingText)
  spinnerLoadingText$!: Observable<string | null>;
}
