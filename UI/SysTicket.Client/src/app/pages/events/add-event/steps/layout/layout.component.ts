import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  generatorText: string = `   ,,, ,,,  ,,, ,,,
   ,,, ,,,  ,,, ,,,
   ,,, ,,,  ,,, ,,,
   ,,, ,,,  ,,, ,,,
   ,,, ,,,  ,,, ,,,
   ,,, ,,,  ,,, ,,,
   ,,, ,,,  ,,, ,,,
   ,,, ,,,  ,,, ,,,`;

  layoutFormGroup = new UntypedFormGroup({});
  isGeneratorVisible: boolean = false;

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

  useGenerator(): void {
    this.isGeneratorVisible = true;

    this.createSvgByGenerator(this.generatorText);
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

  private createSvgByGenerator(text: string): void {
    let svg: string = `<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="55.687" y="31.86" width="389.145" height="20.274" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);"></rect><text style="white-space: pre; fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 10.7px;" x="230.398" y="46.235" id="1.1">SCENA</text>
      <path d="M 89.157 99.072 H 94.328 L 94.328 97.682 L 98.169 99.587 L 94.328 101.492 L 94.328 100.103 H 89.157 V 99.072 Z" data-bx-shape="arrow 89.157 97.682 9.012 3.81 1.031 3.841 0 1@2b9cf34d" style="paint-order: stroke; stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255);" transform="matrix(-0.001603, -0.999999, 0.999999, -0.001603, 127.264091, 135.742447)" id="1.2"></path>
      <path d="M 89.157 99.072 H 94.328 L 94.328 97.682 L 98.169 99.587 L 94.328 101.492 L 94.328 100.103 H 89.157 V 99.072 Z" data-bx-shape="arrow 89.157 97.682 9.012 3.81 1.031 3.841 0 1@2b9cf34d" style="paint-order: stroke; stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255);" transform="matrix(-0.001603, -0.999999, 0.999999, -0.001603, 171.271484, 135.912033)" id="1.3"></path>
    `;

    const regions = text.split('\n');
    let x: number = 55;
    let y: number = 76;

    let regionNo = 1;
    let seatNo = 1;

    regions.forEach((region) => {
      Array.from(region).forEach((char) => {
        if (char === ',') {
          svg += `<rect x="${x}" y="${y}" width="11.569" height="11.355" style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 0.1px;" class="chair" id="${regionNo}.${seatNo}"></rect>`;
          seatNo += 1;
        }

        x += 17;
      });

      y += 17;
      x = 55;
      seatNo = 1;
      regionNo += 1;
    });

    svg += `</svg>`;

    this.selectedLayoutSrc = svg;

    this.cdr.markForCheck();
  }
}
