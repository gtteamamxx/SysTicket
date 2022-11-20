import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/http/users.service';
import { ManageUsersStateActions as Actions } from './manage-users.state.actions';

interface ManageUsersStateModel {
  users: User[];
}

const defaultState: ManageUsersStateModel = {
  users: [],
};

@State({
  name: new StateToken<ManageUsersStateModel>('manageUsersState'),
  defaults: defaultState,
})
@Injectable()
export class ManageUsersState {
  @Selector()
  static users(state: ManageUsersStateModel): User[] {
    return state.users;
  }

  constructor(private readonly usersService: UsersService) {}

  @Action(Actions.LoadAllUsers)
  loadAllUsers(ctx: StateContext<ManageUsersStateModel>): Observable<any> {
    return this.usersService.getAllUsers().pipe(
      tap((users: User[]) => {
        ctx.patchState({
          users: users,
        });
      })
    );
  }

  @Action(Actions.RemoveUser)
  removeUser(ctx: StateContext<ManageUsersStateModel>, action: Actions.RemoveUser): Observable<any> {
    return this.usersService.removeUser({ id: action.payload.user.id! }).pipe(
      tap(() => {
        ctx.dispatch(new Actions.LoadAllUsers());
      })
    );
  }

  @Action(Actions.Clear)
  clear(ctx: StateContext<ManageUsersStateModel>): void {
    ctx.setState(defaultState);
  }
}
