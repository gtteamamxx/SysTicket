import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { EventDetails } from 'src/app/core/models/event-details.model';
import { EventsService } from 'src/app/core/services/http/events.service';
import { EventDetailsStateActions } from './event-details.state.actions';

interface EventDetailsStateModel {
  event: EventDetails | null;
}

const defaultState: EventDetailsStateModel = {
  event: null,
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

  constructor(private readonly eventService: EventsService) {}

  @Action(EventDetailsStateActions.LoadEvent)
  loadEvent(ctx: StateContext<EventDetailsStateModel>, action: EventDetailsStateActions.LoadEvent): Observable<any> {
    return this.eventService.getEventDetails({ eventId: action.payload.eventId }).pipe(
      tap((eventDetails: EventDetails) => {
        ctx.patchState({
          event: eventDetails,
        });
      })
    );
  }

  @Action(EventDetailsStateActions.Clear)
  clear(ctx: StateContext<EventDetailsStateModel>): void {
    ctx.setState(defaultState);
  }
}
