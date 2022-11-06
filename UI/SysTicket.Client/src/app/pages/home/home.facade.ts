import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CalendarEvent } from 'angular-calendar';
import { map, Observable } from 'rxjs';
import { Event } from 'src/app/core/models/event.model';
import { NavigationService } from 'src/app/core/services/misc/navigation.service';
import { SpinnerService } from 'src/app/core/services/misc/spinner.service';
import { HomeState } from './store/home.state';
import { HomeStateActions as Actions } from './store/home.state.actions';

@Injectable()
export class HomeFacade {
  get events$(): Observable<CalendarEvent<Event>[]> {
    return this.store.select(HomeState.events).pipe(
      map((events) =>
        events
          .map((event) => {
            return {
              start: new Date(event.dateFrom!),
              end: new Date(event.dateTo!),
              title: event.title,
              draggable: false,
              id: event.id,
              meta: event,
            } as CalendarEvent<Event>;
          })
          .sort((x, y) => {
            return x.start > y.end! ? 1 : -1;
          })
      )
    );
  }

  constructor(
    private readonly spinner: SpinnerService, //
    private readonly store: Store,
    private readonly navigationService: NavigationService
  ) {}

  init(): void {
    const pageSize: number = this.store.selectSnapshot(HomeState.pageSize);
    const pageIndex: number = this.store.selectSnapshot(HomeState.pageIndex);

    this.loadEvents({
      pageSize,
      pageIndex,
    });
  }

  loadEvents(payload: {
    pageSize: number; //
    pageIndex: number;
  }): void {
    window.scroll({
      top: 0,
    });

    this.spinner.show();

    this.store
      .dispatch(
        new Actions.LoadEvents({
          pageSize: payload.pageSize,
          pageIndex: payload.pageIndex,
        })
      )
      .subscribe()
      .add(() => this.spinner.hide());
  }

  navigateToEventDetails(event: Event) {
    this.navigationService.navigateToEventPage(event.id!);
  }
}
