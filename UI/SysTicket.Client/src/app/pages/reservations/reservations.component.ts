import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { toDataURL as generateQR } from 'qrcode';
import { from } from 'rxjs';
import { Reservation } from 'src/app/core/models/reservation.model';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  reservation!: Reservation;

  qrCode!: SafeResourceUrl;

  constructor(
    private cdr: ChangeDetectorRef, //
    private domSanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservation = this.activatedRoute.snapshot.data['reservation'];

    from(
      generateQR(this.reservation.id!, {
        width: 1200,
      })
    ) //
      .subscribe((qrCode: string) => {
        this.qrCode = this.domSanitizer.bypassSecurityTrustResourceUrl(qrCode);
        this.cdr.detectChanges();
      });
  }

  getPrice(region: string): number {
    return this.reservation.event?.regionPrices?.find((x) => x.region === region)?.price!;
  }
}
