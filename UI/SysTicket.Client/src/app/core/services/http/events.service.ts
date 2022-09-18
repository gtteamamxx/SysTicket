import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingsState } from '../../store/settings.state';

export interface CreateEventRequest {
  title: string;
  body: string;
  dateFrom: Date;
  dateTo: Date;
  userId: number;
  logoBase64: string;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  constructor(
    private readonly store: Store, //
    private readonly http: HttpClient
  ) {}

  createNewEvent(payload: CreateEventRequest): Observable<number> {
    return this.http.post<number>(`${this.store.selectSnapshot(SettingsState.apiUrl)}/api/events`, JSON.stringify(payload));
  }
}
