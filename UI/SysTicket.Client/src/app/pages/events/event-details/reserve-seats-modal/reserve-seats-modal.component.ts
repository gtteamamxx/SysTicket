import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { SafeHtml } from '@angular/platform-browser';
import { RegionPrices } from 'src/app/core/models/region-prices.model';
import { LayoutConfig, SeatLayoutViewerComponent, SelectedChair } from 'src/app/shared/components/seat-layout-viewer/seat-layout-viewer.component';

export interface ReserveSeatsModalInput {
  layout: string;
  prices: RegionPrices;
  reservedChairs: string[];
}

export interface ReserveSeatsModalOutput {
  userName: string;
  seatIds: string[];
}

@Component({
  selector: 'app-reserve-seats-modal',
  templateUrl: './reserve-seats-modal.component.html',
  styleUrls: ['./reserve-seats-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule, //
    MatStepperModule,
    MatButtonModule,
    SeatLayoutViewerComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ReserveSeatsModalComponent implements OnInit {
  layoutSvgSrc!: SafeHtml;

  get isValid(): boolean {
    return this.selectedChairs.length > 0 && this.userNameFormControl.valid;
  }

  selectedChairs: SelectedChair[] = [];

  userNameFormControl = new FormControl<string>('', [Validators.required]);

  get priceSum(): number {
    return this.selectedChairs.map((x) => x.price).reduce((x, y) => x + y);
  }

  constructor(
    private matDialogRef: MatDialogRef<ReserveSeatsModalComponent>, //
    @Inject(MAT_DIALOG_DATA) private data: ReserveSeatsModalInput
  ) {}

  ngOnInit(): void {
    this.layoutSvgSrc = this.data.layout;
  }

  onLayoutLoaded(event: LayoutConfig): void {
    event.setRegionPrices(this.data.prices);
    event.setSelectedSeats(this.data.reservedChairs);
  }

  onChairSelectionChanged(selectedChairs: SelectedChair[]): void {
    this.selectedChairs = selectedChairs;
  }

  trackByChairId(selectedChair: SelectedChair): string {
    return selectedChair.id;
  }

  onReserveSeatsClick(): void {
    this.matDialogRef.close(<ReserveSeatsModalOutput>{
      userName: this.userNameFormControl.value,
      seatIds: this.selectedChairs.map((x) => x.id),
    });
  }
}
