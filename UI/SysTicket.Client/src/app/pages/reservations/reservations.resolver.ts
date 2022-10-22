import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/core/models/reservation.model';
import { ReservationsService } from 'src/app/core/services/http/reservations.service';

@Injectable({ providedIn: 'root' })
export class ReservationsResolver implements Resolve<Reservation> {
  constructor(private readonly reservationsService: ReservationsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reservation> {
    return this.reservationsService.getReservation({
      id: route.paramMap.get('id')!,
    });
  }
}
