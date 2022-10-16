export namespace EventDetailsStateActions {
  export class LoadEvent {
    static type = '[Event Details State] Load Event';
    constructor(public payload: { eventId: number }) {}
  }

  export class Clear {
    static type = '[Event Details State] Clear';
  }
}
