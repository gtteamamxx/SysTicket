import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { RegionPrices } from 'src/app/core/models/region-prices.model';
import { NavigationService } from 'src/app/core/services/misc/navigation.service';
import { NotificationsService } from 'src/app/core/services/misc/notifications.service';
import { SpinnerService } from 'src/app/core/services/misc/spinner.service';
import { AddEventState } from './store/add-event.state';
import { AddEventActions } from './store/add-event.state.actions';

@Injectable()
export class AddEventFacade implements OnDestroy {
  constructor(
    private readonly spinner: SpinnerService, //
    private readonly notifications: NotificationsService,
    private readonly navigationService: NavigationService,
    private readonly store: Store
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(new AddEventActions.Clear());
  }

  createEvent(payload: {
    title: string; //
    body: string;
    dateFrom: Date;
    dateTo: Date;
    logo: File;
    layout: string;
    place: string;
    regionPrices: RegionPrices;
  }) {
    payload.dateFrom.setSeconds(0, 0);
    payload.dateTo.setSeconds(0, 0);

    this.spinner.show();

    this.store
      .dispatch(new AddEventActions.AddEvent(payload))
      .subscribe(() => {
        const eventId: number | null = this.store.selectSnapshot(AddEventState.createdEventId);

        if (eventId == null) {
          return;
        }

        this.notifications.showSuccess({
          message: `Zdarzenie o id: ${eventId} zostało dodane!`,
          config: {
            timeoutInMs: 2000,
          },
        });

        this.navigationService.navigateToHome();
      })
      .add(() => this.spinner.hide());
  }
}
