import { User } from 'src/app/core/models/user.model';

export namespace ManageUsersStateActions {
  export class LoadAllUsers {
    static type = '[Manage Users State] Load All Users';
  }

  export class RemoveUser {
    static type = '[Manage Users State] Remove User';
    constructor(
      public payload: {
        user: User;
      }
    ) {}
  }

  export class Clear {
    static type = '[Manage Users State] Clear';
  }
}
