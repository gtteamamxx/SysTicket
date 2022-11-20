import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { catchError, fromEvent, Observable, pluck, switchMap, take, tap, throwError } from 'rxjs';
import { EventsService } from 'src/app/core/services/http/events.service';
import { UserState } from 'src/app/core/store/user.state';
import { AddEventActions } from './add-event.state.actions';

interface AddEventStateModel {
  createdEventId: number | null;
}

const defaultState: AddEventStateModel = {
  createdEventId: null,
};

@State({
  name: new StateToken<AddEventStateModel>('addEventState'),
  defaults: defaultState,
})
@Injectable()
export class AddEventState {
  @Selector()
  static createdEventId(state: AddEventStateModel): number | null {
    return state.createdEventId;
  }

  constructor(
    private readonly store: Store, //
    private readonly eventsService: EventsService
  ) {}

  @Action(AddEventActions.Clear)
  clear(ctx: StateContext<AddEventStateModel>): void {
    ctx.setState(defaultState);
  }

  @Action(AddEventActions.AddEvent)
  addEvent(ctx: StateContext<AddEventStateModel>, action: AddEventActions.AddEvent): Observable<any> {
    return this.imageToBase64(action.payload.logo).pipe(
      switchMap((logoB64: string) => {
        return this.eventsService
          .createNewEvent({
            title: action.payload.title,
            body: action.payload.body,
            dateFrom: action.payload.dateFrom,
            dateTo: action.payload.dateTo,
            userId: this.store.selectSnapshot(UserState.loggedUser)?.id!,
            logoBase64: logoB64,
            layout: action.payload.layout,
            place: action.payload.place,
            regionPrices: action.payload.regionPrices,
          })
          .pipe(
            tap((eventId: number) => {
              ctx.patchState({ createdEventId: eventId });
            }),
            catchError((err: Error) => {
              ctx.patchState({ createdEventId: null });
              return throwError(() => err);
            })
          );
      })
    );
  }

  private imageToBase64(fileToRead: File): Observable<string> {
    const logoFileReader = new FileReader();

    logoFileReader.readAsDataURL(fileToRead);

    return <Observable<string>>fromEvent(logoFileReader, 'load').pipe(
      take(1), //
      pluck('currentTarget', 'result')
    );
  }
}
