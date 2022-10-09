import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-predefined-layout-modal',
  templateUrl: './select-predefined-layout-modal.component.html',
  styleUrls: ['./select-predefined-layout-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectPredefinedLayoutModalComponent {
  readonly predefinedLayouts: string[] = ['assets/hall.svg'];

  constructor(private matDialogRef: MatDialogRef<SelectPredefinedLayoutModalComponent>) {}

  selectHall(hallSrc: string): void {
    this.matDialogRef.close(hallSrc);
  }
}
