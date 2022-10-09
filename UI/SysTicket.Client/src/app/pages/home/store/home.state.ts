import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { EventsService, GetEventsPaginationResponse } from 'src/app/core/services/http/events.service';
import { Event } from '../../../core/models/event.model';
import { HomeStateActions as Actions } from './home.state.actions';

interface HomeStateModel {
  totalEventsCount: number;
  events: Event[];
  pageSize: number;
  pageIndex: number;
}

const defaultState: HomeStateModel = {
  totalEventsCount: 0,
  events: [],
  pageIndex: 0,
  pageSize: 10,
};

@State({
  name: new StateToken<HomeStateModel>('homeState'),
  defaults: defaultState,
})
@Injectable()
export class HomeState {
  @Selector()
  static events(state: HomeStateModel): Event[] {
    return state.events;
  }

  @Selector()
  static pageSize(state: HomeStateModel): number {
    return state.pageSize;
  }

  @Selector()
  static totalEventsCount(state: HomeStateModel): number {
    return state.totalEventsCount;
  }

  @Selector()
  static pageIndex(state: HomeStateModel): number {
    return state.pageIndex;
  }

  constructor(private readonly eventsService: EventsService) {}

  @Action(Actions.LoadEvents)
  loadEvents(ctx: StateContext<HomeStateModel>, action: Actions.LoadEvents): Observable<any> {
    ctx.patchState({
      events: [],
    });

    return this.eventsService
      .getEventsPagination({
        pageIndex: action.payload.pageIndex,
        pageSize: action.payload.pageSize,
      })
      .pipe(
        tap((response: GetEventsPaginationResponse) => {
          ctx.patchState({
            totalEventsCount: response.numberOfAllEvents,
            events: response.events,
          });
        })
      );
  }

  @Action(Actions.Clear)
  clear(ctx: StateContext<HomeStateModel>): void {
    ctx.setState(defaultState);
  }
}
