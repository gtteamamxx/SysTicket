import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { EventDetails } from 'src/app/core/models/event-details.model';
import { EventsService } from 'src/app/core/services/http/events.service';
import { SelectedChair } from 'src/app/shared/components/seat-layout-viewer/seat-layout-viewer.component';
import { EventDetailsStateActions } from './event-details.state.actions';

interface EventDetailsStateModel {
  event: EventDetails | null;
  isBuyingTickets: boolean;
  selectedChairs: SelectedChair[];
  reservationId: string;
}

const defaultState: EventDetailsStateModel = {
  event: null,
  isBuyingTickets: false,
  selectedChairs: [],
  reservationId: '',
};

@State({
  name: 'eventDetailsState',
  defaults: defaultState,
})
@Injectable()
export class EventDetailsState {
  @Selector()
  static event(state: EventDetailsStateModel): EventDetails | null {
    return state.event;
  }

  @Selector()
  static isBuyingTickets(state: EventDetailsStateModel): boolean {
    return state.isBuyingTickets;
  }

  @Selector()
  static selectedChairs(state: EventDetailsStateModel): SelectedChair[] {
    return state.selectedChairs;
  }

  @Selector()
  static totalSeatCount(state: EventDetailsStateModel): number {
    return state.event?.numberOfSeats ?? 0;
  }

  @Selector()
  static reservationId(state: EventDetailsStateModel): string {
    return state.reservationId;
  }

  @Selector()
  static reservedSeatCount(state: EventDetailsStateModel): number {
    return state.event?.seats.length ?? 0;
  }

  constructor(private readonly eventService: EventsService) {}

  @Action(EventDetailsStateActions.LoadEvent)
  loadEvent(ctx: StateContext<EventDetailsStateModel>, action: EventDetailsStateActions.LoadEvent): Observable<any> {
    return this.eventService.getEventDetails({ eventId: action.payload.eventId }).pipe(
      tap((eventDetails: EventDetails) => {
        ctx.patchState({
          isBuyingTickets: false,
          selectedChairs: [],
          event: eventDetails,
        });
      })
    );
  }

  @Action(EventDetailsStateActions.ReserveTickets)
  reserveTickets(ctx: StateContext<EventDetailsStateModel>, action: EventDetailsStateActions.ReserveTickets): Observable<any> {
    return this.eventService
      .reserveTickets({
        eventId: action.payload.eventId,
        chairIds: action.payload.seatIds,
        userName: action.payload.userName,
      })
      .pipe(tap((id: string) => ctx.patchState({ reservationId: id })));
  }

  @Action(EventDetailsStateActions.BuyTickets)
  buyTickets(ctx: StateContext<EventDetailsStateModel>): void {
    ctx.patchState({
      isBuyingTickets: true,
    });
  }

  @Action(EventDetailsStateActions.SelectChairs)
  selectChairs(ctx: StateContext<EventDetailsStateModel>, action: EventDetailsStateActions.SelectChairs): void {
    ctx.patchState({
      selectedChairs: action.payload,
    });
  }

  @Action(EventDetailsStateActions.Clear)
  clear(ctx: StateContext<EventDetailsStateModel>): void {
    ctx.setState(defaultState);
  }
}
