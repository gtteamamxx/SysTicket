import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { EventDetails } from 'src/app/core/models/event-details.model';
import { RegionPrices } from 'src/app/core/models/region-prices.model';
import { NavigationService } from 'src/app/core/services/misc/navigation.service';
import { SpinnerService } from 'src/app/core/services/misc/spinner.service';
import { LayoutConfig, SelectedChair } from 'src/app/shared/components/seat-layout-viewer/seat-layout-viewer.component';
import { EventDetailsState } from './store/event-details.state';
import { EventDetailsStateActions } from './store/event-details.state.actions';

@Injectable()
export class EventDetailsFacade implements OnDestroy {
  constructor(
    private readonly spinner: SpinnerService, //
    private readonly navigationService: NavigationService,
    private readonly store: Store
  ) {}

  init(payload: { eventId: number }): void {
    this.spinner.show();

    this.store
      .dispatch(
        new EventDetailsStateActions.LoadEvent({
          eventId: payload.eventId,
        })
      )
      .subscribe(() => {
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new EventDetailsStateActions.Clear());
  }

  setLayoutProp(loadConfig: LayoutConfig): void {
    const event: EventDetails = this.store.selectSnapshot(EventDetailsState.event)!;

    const regionPrices: RegionPrices = {};
    event.regionPrices.forEach((x) => (regionPrices[x.region] = x.price));

    loadConfig.setRegionPrices(regionPrices);
    loadConfig.setSelectedSeats(
      event.seats.map((x) => {
        return `${x.region}.${x.seatNumber}`;
      })
    );
  }

  navigateToEvents() {
    this.navigationService.navigateToHome();
  }

  selectChairs(selectedChairs: SelectedChair[]): void {
    this.store.dispatch(new EventDetailsStateActions.SelectChairs(selectedChairs));
  }

  orderSelectedTickets(userName: string): void {
    const event: EventDetails = this.store.selectSnapshot(EventDetailsState.event)!;

    this.spinner.show();
    this.store
      .dispatch(
        new EventDetailsStateActions.ReserveTickets({
          eventId: event.id!,
          seatIds: this.store.selectSnapshot(EventDetailsState.selectedChairs).map((x) => x.id),
          userName: userName,
        })
      )
      .subscribe(() => {
        this.navigationService
          .navigateToReservation({
            reservation: this.store.selectSnapshot(EventDetailsState.reservationId),
          })
          .subscribe(() => this.spinner.hide());
      });
  }

  buyTickets(): void {
    this.store.dispatch(new EventDetailsStateActions.BuyTickets());
  }
}
