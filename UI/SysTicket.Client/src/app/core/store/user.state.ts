import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { UserModel } from '../models/user.model';
import { UserStateActions as Actions } from './user.state.actions';

interface UserStateModel {
  loggedUser: UserModel | null;
}

@State({
  name: new StateToken<UserStateModel>('userState'),
  defaults: {
    loggedUser: null,
  },
})
export class UserState {
  @Selector()
  static loggedUser(state: UserStateModel): UserModel | null {
    return state.loggedUser;
  }

  @Action(Actions.SetLoggedUser)
  setLoggedUser(
    ctx: StateContext<UserStateModel>,
    action: Actions.SetLoggedUser
  ): void {
    ctx.patchState({
      loggedUser: action.payload.user,
    });
  }
}
