import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { RegionPrices } from 'src/app/core/models/region-prices.model';
import { LayoutConfig } from 'src/app/shared/components/seat-layout-viewer/seat-layout-viewer.component';
import { SelectPredefinedLayoutModalComponent } from './select-predefined-layout-modal/select-predefined-layout-modal.component';

export interface LayoutStepData {
  layout: string;
  regionPrices: RegionPrices;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  selectedLayoutSrc!: string | SafeResourceUrl | null;

  get regions(): string[] {
    return Object.keys(this.layoutFormGroup.controls);
  }

  get isValid(): boolean {
    return this.layoutFormGroup.valid && this.regionPrices != null;
  }

  layoutFormGroup = new UntypedFormGroup({});

  private layoutConfig!: LayoutConfig;
  private regionPrices!: RegionPrices | null;

  constructor(
    private readonly dialog: MatDialog, //
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  selectPredefinedLayout(): void {
    this.dialog
      .open(SelectPredefinedLayoutModalComponent)
      .afterClosed()
      .subscribe((hallSrc: string | null) => {
        if (hallSrc != null) {
          this.selectedLayoutSrc = hallSrc;
          this.cdr.markForCheck();
        }
      });
  }

  onLayoutLoaded(event: LayoutConfig): void {
    this.layoutConfig = event;

    this.layoutConfig.regions.forEach((region: string) => {
      this.layoutFormGroup.addControl(region, new FormControl<number | null>(null, [Validators.required]));
    });
  }

  setPrices(): void {
    if (!this.layoutFormGroup.valid) {
      this.layoutFormGroup.markAllAsTouched();
      this.layoutFormGroup.updateValueAndValidity();
      return;
    }

    const newPrices: RegionPrices = {};

    Object.keys(this.layoutFormGroup.controls).forEach((region: string) => {
      newPrices[region] = this.layoutFormGroup.get(region)!.value;
    });

    this.regionPrices = newPrices;

    this.layoutConfig!.setRegionPrices(newPrices);
  }

  getStepData(): LayoutStepData {
    return {
      layout: this.layoutConfig!.layout,
      regionPrices: this.regionPrices!,
    };
  }
}
