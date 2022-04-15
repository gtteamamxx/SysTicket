import { NavigationEnd, Router } from '@angular/router';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { CurrentPageStateActions as Actions } from './current-page.state.actions';

interface CurrentPageStateModel {
  title: string | null;
}

@State({
  name: new StateToken<CurrentPageStateModel>('appState'),
  defaults: {
    title: null,
  },
})
export class CurrentPageState {
  @Selector()
  static title(state: CurrentPageStateModel): string | null {
    return state.title;
  }

  @Action(Actions.SetCurrentPageTitle)
  setCurrentPageTItle(
    ctx: StateContext<CurrentPageStateModel>,
    action: Actions.SetCurrentPageTitle
  ): void {
    ctx.patchState({
      title: action.payload.title,
    });
  }
}
