import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Constants } from '../resources/constants';
import { CurrentPageStateActions as Actions } from './current-page.state.actions';

interface CurrentPageStateModel {
  title: string | null;
  currentUrl: string | null;
}

@State({
  name: new StateToken<CurrentPageStateModel>('appState'),
  defaults: {
    title: null,
    currentUrl: null,
  },
})
@Injectable()
export class CurrentPageState {
  @Selector()
  static title(state: CurrentPageStateModel): string | null {
    return state.title;
  }

  @Selector()
  static isOnLoginPage(state: CurrentPageStateModel): boolean {
    return state.currentUrl?.includes(Constants.loginPage) === true;
  }

  @Selector()
  static isOnManageUsersPage(state: CurrentPageStateModel): boolean {
    return state.currentUrl?.includes(Constants.manageUsers) === true;
  }

  @Action(Actions.SetCurrentPageInfo)
  setCurrentPageTItle(ctx: StateContext<CurrentPageStateModel>, action: Actions.SetCurrentPageInfo): void {
    document.title = action.payload.title!;

    ctx.patchState({
      title: action.payload.title,
      currentUrl: action.payload.url,
    });
  }
}
