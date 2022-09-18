export namespace AddEventActions {
  export class AddEvent {
    static type = '[Add Event State] Add Event';

    constructor(
      public payload: {
        title: string; //
        body: string;
        dateFrom: Date;
        dateTo: Date;
        logo: File;
      }
    ) {}
  }

  export class Clear {
    static type = '[Add Event State] Clear';
  }
}
