import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, Store } from '@ngxs/store';
import { EventDetails } from 'src/app/core/models/event-details.model';
import { RegionPrices } from 'src/app/core/models/region-prices.model';
import { SpinnerService } from 'src/app/core/services/misc/spinner.service';
import { ReserveSeatsModalComponent, ReserveSeatsModalInput, ReserveSeatsModalOutput } from './reserve-seats-modal/reserve-seats-modal.component';
import { EventDetailsState } from './store/event-details.state';
import { EventDetailsStateActions } from './store/event-details.state.actions';

@Injectable()
export class EventDetailsFacade {
  constructor(
    private readonly dialog: MatDialog, //
    private readonly spinner: SpinnerService,
    private readonly store: Store
  ) {}

  init(payload: { eventId: number }): void {
    this.spinner.show();

    this.store.dispatch(
      new EventDetailsStateActions.LoadEvent({
        eventId: payload.eventId,
      })
    );

    this.spinner.hide();
  }

  openReserveSeatsModal(): void {
    const event: EventDetails = this.store.selectSnapshot(EventDetailsState.event)!;

    const regionPrices: RegionPrices = {};
    event.regionPrices.forEach((x) => (regionPrices[x.region] = x.price));

    this.dialog
      .open(ReserveSeatsModalComponent, {
        width: '640px',
        height: '70vh',
        panelClass: 'reserve-seats-modal',
        data: <ReserveSeatsModalInput>{
          layout: event.layout,
          prices: regionPrices,
          reservedChairs: event.seats.map((x) => {
            return `${x.region}.${x.seatNumber}`;
          }),
        },
      })
      .afterClosed()
      .subscribe((result: ReserveSeatsModalOutput | null) => {
        if (result == null) {
          return;
        }

        this.spinner.show();

        this.store
          .dispatch(
            new EventDetailsStateActions.ReserveTickets({
              eventId: event.id!,
              seatIds: result.seatIds,
              userName: result.userName,
            })
          )
          .subscribe(() => {
            this.spinner.hide();

            this.init({ eventId: event.id! });
          });
      });
  }
}
