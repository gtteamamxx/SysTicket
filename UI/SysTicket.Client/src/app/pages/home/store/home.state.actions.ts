export namespace HomeStateActions {
  export class LoadEvents {
    static type = '[Home State] Load Events';

    constructor(
      public payload: {
        pageSize: number;
        pageIndex: number;
      }
    ) {}
  }

  export class Clear {
    static type = '[Home State] Clear';
  }
}
