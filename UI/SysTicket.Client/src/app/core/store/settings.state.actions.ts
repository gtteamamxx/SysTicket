export namespace SettingsStateActions {
  export class SetApiUrl {
    static type = '[Settings State] Set Api Url';
    constructor(public payload: { apiUrl: string }) {}
  }
}
