import { UserModel } from '../models/user.model';

export namespace UserStateActions {
  export class SetLoggedUser {
    static type = '[User State] Set Logged User';
    constructor(
      public payload: {
        user: UserModel | null;
      }
    ) {}
  }
}
