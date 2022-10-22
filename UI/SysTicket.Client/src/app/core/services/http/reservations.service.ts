import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Reservation } from '../../models/reservation.model';
import { SettingsState } from '../../store/settings.state';

export interface GetReservationRequest {
  id?: string;
}

@Injectable({ providedIn: 'root' })
export class ReservationsService {
  constructor(
    private readonly store: Store, //
    private readonly http: HttpClient
  ) {}

  getReservation(payload: GetReservationRequest): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.store.selectSnapshot(SettingsState.apiUrl)}/api/reservations/${payload.id}`);
  }
}
