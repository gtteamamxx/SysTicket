import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventDetails } from '../../models/event-details.model';
import { Event } from '../../models/event.model';
import { RegionPrices } from '../../models/region-prices.model';
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

export interface GetEventDetailsRequest {
  eventId: number;
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

  getEventDetails(payload: GetEventDetailsRequest): Observable<EventDetails> {
    return this.http.get<EventDetails>(`${this.store.selectSnapshot(SettingsState.apiUrl)}/api/events/${payload.eventId}`);
  }

  getEventsPagination(payload: GetEventsPaginationRequest): Observable<GetEventsPaginationResponse> {
    return this.http.get<GetEventsPaginationResponse>(`${this.store.selectSnapshot(SettingsState.apiUrl)}/api/events?pageSize=${payload.pageSize}&pageIndex=${payload.pageIndex}`);
  }
}
