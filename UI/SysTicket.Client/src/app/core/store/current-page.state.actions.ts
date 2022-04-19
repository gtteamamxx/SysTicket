export namespace CurrentPageStateActions {
  export class SetCurrentPageInfo {
    static type = '[Current Page State] Set Current Page Info';
    constructor(
      public payload: {
        title: string | undefined;
        url: string;
      }
    ) {}
  }
}
