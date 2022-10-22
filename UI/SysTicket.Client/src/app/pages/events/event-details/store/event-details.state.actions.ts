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

  export class Clear {
    static type = '[Event Details State] Clear';
  }
}
