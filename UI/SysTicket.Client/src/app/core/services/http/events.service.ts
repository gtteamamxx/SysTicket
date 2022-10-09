import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Event, RegionPrices } from '../../models/event.model';
import { SettingsState } from '../../store/settings.state';

export interface CreateEventRequest {
  title: string;
  body: string;
  dateFrom: Date;
  dateTo: Date;
  userId: number;
  logoBase64: string;
  layout: string;
  regionPrices: RegionPrices;
}

export interface GetEventsPaginationRequest {
  pageSize: number;
  pageIndex: number;
}

export interface GetEventsPaginationResponse {
  numberOfAllEvents: number;
  events?: Event[];
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

  getEventsPagination(payload: GetEventsPaginationRequest): Observable<GetEventsPaginationResponse> {
    return this.http.get<GetEventsPaginationResponse>(`${this.store.selectSnapshot(SettingsState.apiUrl)}/api/events?pageSize=${payload.pageSize}&pageIndex=${payload.pageIndex}`);
  }
}
