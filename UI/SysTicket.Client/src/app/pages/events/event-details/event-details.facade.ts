import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SpinnerService } from 'src/app/core/services/misc/spinner.service';
import { EventDetailsStateActions } from './store/event-details.state.actions';

@Injectable()
export class EventDetailsFacade {
  constructor(private readonly spinner: SpinnerService, private readonly store: Store) {}

  init(payload: { eventId: number }): void {
    this.spinner.show();

    this.store.dispatch(
      new EventDetailsStateActions.LoadEvent({
        eventId: payload.eventId,
      })
    );

    this.spinner.hide();
  }
}
