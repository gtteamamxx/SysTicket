import { RegionPrices } from 'src/app/core/models/event.model';

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
        layout: string;
        regionPrices: RegionPrices;
      }
    ) {}
  }

  export class Clear {
    static type = '[Add Event State] Clear';
  }
}
