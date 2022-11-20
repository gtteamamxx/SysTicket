import { SelectedChair } from 'src/app/shared/components/seat-layout-viewer/seat-layout-viewer.component';

export namespace EventDetailsStateActions {
  export class LoadEvent {
    static type = '[Event Details State] Load Event';
    constructor(public payload: { eventId: number }) {}
  }

  export class ReserveTickets {
    static type = '[Event Details State] Reserve tickets';
    constructor(
      public payload: {
        eventId: number;
        userName: string;
        seatIds: string[];
      }
    ) {}
  }

  export class BuyTickets {
    static type = '[Event Details State] Buy Tickets';
  }

  export class SelectChairs {
    static type = '[Event Details State] Select Chairs';
    constructor(public payload: SelectedChair[]) {}
  }

  export class Clear {
    static type = '[Event Details State] Clear';
  }
}
