import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { RegionPrices } from 'src/app/core/models/region-prices.model';

export interface LayoutConfig {
  regions: string[];
  layout: string;
  setRegionPrices: (config: RegionPrices) => void;
  setSelectedSeats: (chairIds: string[]) => void;
}

export type SelectedChair = {
  id: string;
  region: string;
  seatNumber: string;
  price: number;
};

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
  @Output() chairSelectionChanged = new EventEmitter<SelectedChair[]>();

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
    const svgSource$: Observable<string> = this.layoutSvgSrc.startsWith('<svg') //
      ? of(this.layoutSvgSrc)
      : this.http.get('./' + this.layoutSvgSrc, { responseType: 'text' });

    svgSource$.subscribe((svg: string) => {
      this.content = this.sanitizer.bypassSecurityTrustHtml(svg);

      this.cdr.detectChanges();

      this.registerEventsOnChairs();
      this.emitLayoutMetadata();
    });
  }

  private registerEventsOnChairs(): void {
    const chairs: HTMLElement[] = <HTMLElement[]>Array.from(this.contentDiv.nativeElement.getElementsByClassName('chair'));

    chairs.forEach((chair: HTMLElement) => {
      chair.addEventListener('mouseenter', (_: MouseEvent) => {
        this.onChairHoverStart(chair);
      });

      chair.addEventListener('mousemove', (event: MouseEvent) => {
        this.onChairMouseOver(event);
      });

      chair.addEventListener('click', (_: MouseEvent) => {
        this.onChairClick(chair);
      });

      chair.addEventListener('mouseleave', (_: MouseEvent) => {
        Array.from(this.contentDiv.nativeElement.getElementsByClassName('tooltip')) //
          .forEach((tooltipDiv) => {
            this.contentDiv.nativeElement.removeChild(tooltipDiv);
          });
      });
    });
  }

  private onChairClick(chair: HTMLElement): void {
    if (!this.allowChairSelect || chair.classList.contains('taken')) {
      return;
    }

    if (chair.classList.contains('selected')) {
      chair.classList.remove('selected');
      this.chairSelectionChanged.emit(this.getSelectedChairs());
    } else {
      chair.classList.add('selected');
      this.chairSelectionChanged.emit(this.getSelectedChairs());
    }
  }

  private emitLayoutMetadata(): void {
    const regions: string[] = Array.from(
      new Set(
        (<HTMLElement[]>Array.from(this.contentDiv.nativeElement.getElementsByClassName('chair'))) //
          .map((x) => x.id.split('.')[0])
      )
    );

    setTimeout(() => {
      this.onLoad.emit(<LayoutConfig>{
        regions: regions,
        layout: this.contentDiv.nativeElement!.innerHTML,
        setRegionPrices: (newPrices: RegionPrices) => {
          this.regionPrices = newPrices ?? {};
        },
        setSelectedSeats: (chairIds: string[]) => {
          chairIds.forEach((chairId) => {
            document.getElementById(chairId)?.classList.add('taken');
          });
        },
      });
    });
  }

  private onChairMouseOver(event: MouseEvent): void {
    const tooltipDiv: HTMLDivElement = Array.from(this.contentDiv.nativeElement.getElementsByClassName('tooltip'))[0] as HTMLDivElement;
    if (tooltipDiv == null) {
      return;
    }

    const left: number = event.offsetX - tooltipDiv.offsetWidth / 2;
    const top: number = event.offsetY - 100;

    this.renderer.setStyle(tooltipDiv, 'left', `${left}px`);
    this.renderer.setStyle(tooltipDiv, 'top', `${top}px`);
  }

  private onChairHoverStart(chair: HTMLElement): void {
    const tooltipDiv: HTMLDivElement = document.createElement('div');
    this.contentDiv.nativeElement.appendChild(tooltipDiv);

    tooltipDiv.classList.add('tooltip');

    this.renderer.setStyle(tooltipDiv, 'position', 'absolute');
    this.renderer.setStyle(tooltipDiv, 'white-space', 'nowrap');
    this.renderer.setProperty(tooltipDiv, 'innerHTML', this.getChairTooltipHtml(chair));
  }

  private getChairTooltipHtml(chair: HTMLElement): string {
    const region: string = chair.id.split('.')[0];
    const seatNumber: number = +chair.id.split('.')[1];
    const price: number | null = this.getChairPrice(region);

    if (chair.classList.contains('taken')) {
      return `
      <div class='tooltip-container'>
          <span class="region">Rząd: ${region}</span>
          <span class="seat-number">Miejsce: ${seatNumber}</span>
          <span class="price">Miejsce zajęte</span>
        </div>
    `;
    } else {
      return `
        <div class='tooltip-container'>
            <span class="region">Rząd: ${region}</span>
            <span class="seat-number">Miejsce: ${seatNumber}</span>
            <span class="price">Cena: ${price == null ? 'Brak ustalonej ceny' : price + 'zł'}</span>
          </div>
      `;
    }
  }

  private getChairPrice(region: string): number | null {
    const key = Object.getOwnPropertyNames(this.regionPrices) //
      .find((key) => key.includes(region));

    return this.regionPrices[key!];
  }

  private getSelectedChairs(): SelectedChair[] {
    return Array.from(document.getElementsByClassName('chair'))
      .filter((x) => x.classList.contains('selected'))
      .map((x) => {
        const region: string = x.id.split('.')[0];
        const seatNumber: string = x.id.split('.')[1];

        return <SelectedChair>{
          id: x.id,
          price: this.getChairPrice(region),
          region: region,
          seatNumber: seatNumber,
        };
      });
  }
}
