export namespace CurrentPageStateActions {
  export class SetCurrentPageTitle {
    static type = '[Current Page State] Set Current Page';
    constructor(
      public payload: {
        title: string | null;
      }
    ) {}
  }
}
