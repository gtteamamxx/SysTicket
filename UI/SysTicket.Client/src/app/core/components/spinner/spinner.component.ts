import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  title: string | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  setTitle(title: string): void {
    if (title !== this.title) {
      this.title = title;
      this.cdr.markForCheck();
    }
  }
}
