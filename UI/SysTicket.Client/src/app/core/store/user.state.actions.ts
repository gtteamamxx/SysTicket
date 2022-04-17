import { User } from '../models/user.model';

export namespace UserStateActions {
  export class SetLoggedUser {
    static type = '[User State] Set Logged User';
    constructor(
      public payload: {
        user: User;
      }
    ) { }
  }

  export class Logout {
    static type = '[User State] Logout';
  }
}
