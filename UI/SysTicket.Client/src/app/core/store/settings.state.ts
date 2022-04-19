import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { SettingsStateActions } from './settings.state.actions';

interface SettingsStateModel {
  apiUrl: string;
}

@State({
  name: new StateToken<SettingsStateModel>('settingsState'),
  defaults: {
    apiUrl: '',
  },
})
@Injectable()
export class SettingsState {
  @Selector()
  static apiUrl(state: SettingsStateModel): string {
    return state.apiUrl;
  }

  @Action(SettingsStateActions.SetApiUrl)
  logout(
    ctx: StateContext<SettingsStateModel>,
    action: SettingsStateActions.SetApiUrl
  ): void {
    ctx.patchState({ apiUrl: action.payload.apiUrl });
  }
}
