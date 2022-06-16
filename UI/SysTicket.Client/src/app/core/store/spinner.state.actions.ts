export namespace SpinnerStateActions {
  export class SetVisibility {
    static type = '[Spinner State] Set Visibiility';

    constructor(
      public payload: {
        isVisible: boolean;
        loadingText?: string;
      }
    ) { }
  }
}
