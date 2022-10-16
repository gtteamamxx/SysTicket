import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RegionPrices } from 'src/app/core/models/region-prices.model';

export interface LayoutConfig {
  regions: string[];
  layout: string;
  setRegionPrices: (config: RegionPrices) => void;
}

@Component({
  selector: 'app-seat-layout-viewer',
  templateUrl: './seat-layout-viewer.component.html',
  styleUrls: ['./seat-layout-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class SeatLayoutViewerComponent implements OnChanges {
  @ViewChild('contentDiv', { read: ElementRef }) contentDiv!: ElementRef<HTMLDivElement>;

  @Input() layoutSvgSrc!: string;
  @Input() allowChairSelect: boolean = false;
  @Output() onLoad = new EventEmitter<LayoutConfig>();

  content!: SafeHtml | string;

  private regionPrices: RegionPrices = {};

  constructor(
    private sanitizer: DomSanitizer, //
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnChanges(changes: SimpleChanges & { [Property in keyof SeatLayoutViewerComponent]: SimpleChange }): void {
    if (changes.layoutSvgSrc != null) {
      this.loadLayout();
    }
  }

  private loadLayout(): void {
    this.http.get('./' + this.layoutSvgSrc, { responseType: 'text' }).subscribe((svg: string) => {
      this.content = this.sanitizer.bypassSecurityTrustHtml(svg);

      this.cdr.detectChanges();

      this.registerEventsOnChairs();
      this.emitLayoutMetadata();
    });
  }

  private registerEventsOnChairs(): void {
    const chairs: HTMLElement[] = <HTMLElement[]>Array.from(this.contentDiv.nativeElement.getElementsByClassName('chair'));

    chairs.forEach((chair: HTMLElement) => {
      chair.addEventListener('mouseenter', (ev: MouseEvent) => {
        this.onChairHover(chair);
      });

      chair.addEventListener('click', (ev: MouseEvent) => {
        this.onChairClick(chair);
      });

      chair.addEventListener('mouseleave', (ev: MouseEvent) => {
        Array.from(this.contentDiv.nativeElement.getElementsByClassName('tooltip')).forEach((tooltipDiv) => {
          this.contentDiv.nativeElement.removeChild(tooltipDiv);
        });
      });
    });
  }

  private onChairClick(chair: HTMLElement): void {
    if (!this.allowChairSelect) {
      return;
    }
    if (chair.classList.contains('selected')) {
      chair.classList.remove('selected');
    } else {
      chair.classList.add('selected');
    }
  }

  private emitLayoutMetadata(): void {
    const regions: string[] = Array.from(
      new Set(
        (<HTMLElement[]>Array.from(this.contentDiv.nativeElement.getElementsByClassName('chair'))) //
          .map((x) => x.id.split('.')[0])
      )
    );

    this.onLoad.emit(<LayoutConfig>{
      regions: regions,
      layout: this.contentDiv.nativeElement!.innerHTML,
      setRegionPrices: (newPrices: RegionPrices) => {
        this.regionPrices = newPrices ?? {};
      },
    });
  }

  private onChairHover(chair: HTMLElement) {
    const svgRect: DOMRect = this.contentDiv.nativeElement.firstElementChild!.getBoundingClientRect();
    const chairRect: DOMRect = chair.getBoundingClientRect();

    const x: string = `${chairRect.x - chairRect.width - 100}px`;
    const y: string = `${chairRect.y - svgRect.y - chairRect.height - 60}px`;

    const tooltipDiv: HTMLDivElement = document.createElement('div');
    this.contentDiv.nativeElement.appendChild(tooltipDiv);

    tooltipDiv.classList.add('tooltip');
    this.renderer.setStyle(tooltipDiv, 'left', x);
    this.renderer.setStyle(tooltipDiv, 'top', y);
    this.renderer.setStyle(tooltipDiv, 'position', 'absolute');
    this.renderer.setProperty(tooltipDiv, 'innerHTML', this.getChairTooltipHtml(chair));
  }

  private getChairTooltipHtml(chair: HTMLElement): string {
    const region: string = chair.id.split('.')[0];
    const seatNumber: number = +chair.id.split('.')[1];
    const price: number | null = this.getChairPrice(region);

    return `
      <div class='tooltip-container'>
        <span class="region">Rząd: ${region}</span>
        <span class="seat-number">Miejsce: ${seatNumber}</span>
        <span class="price">Cena: ${price == null ? 'Brak ustalonej ceny' : price + 'zł'}</span>
      </div>
    `;
  }

  private getChairPrice(region: string): number | null {
    const key = Object.getOwnPropertyNames(this.regionPrices) //
      .find((key) => key.includes(region));

    return this.regionPrices[key!];
  }
}
