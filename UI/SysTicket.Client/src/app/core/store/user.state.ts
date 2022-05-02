import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { User } from '../models/user.model';
import { LocalStorageService } from '../services/local-storage.service';
import { UserStateActions as Actions } from './user.state.actions';

interface UserStateModel {
  loggedUser: User | null | undefined;
}

@State({
  name: new StateToken<UserStateModel>('userState'),
  defaults: {
    loggedUser: undefined,
  },
})
@Injectable()
export class UserState {
  @Selector()
  static loggedUser(state: UserStateModel): User | null | undefined {
    return state.loggedUser;
  }

  @Selector()
  static isUserLogged(state: UserStateModel): boolean {
    return state.loggedUser != null;
  }

  @Selector()
  static isUserAdmin(state: UserStateModel): boolean {
    return state.loggedUser?.isAdmin === true;
  }

  constructor(private readonly localStorageService: LocalStorageService) {}

  @Action(Actions.SetLoggedUser)
  setLoggedUser(ctx: StateContext<UserStateModel>, action: Actions.SetLoggedUser): void {
    ctx.patchState({ loggedUser: action.payload.user });

    this.localStorageService.saveUser(action.payload.user);
  }

  @Action(Actions.Logout)
  logout(ctx: StateContext<UserStateModel>): void {
    ctx.patchState({ loggedUser: null });

    this.localStorageService.clearUser();
  }
}
