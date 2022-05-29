import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { SpinnerStateActions as Actions } from './spinner.state.actions';

interface SpinnerStateModel {
    isVisible: boolean;
    loadingText: string | null;
}

@State({
    name: new StateToken<SpinnerStateModel>('spinnerState'),
    defaults: {
        isVisible: false,
        loadingText: null
    },
})
@Injectable()
export class SpinnerState {
    @Selector()
    static isVisible(state: SpinnerStateModel): boolean {
        return state.isVisible;
    }

    @Selector()
    static loadingText(state: SpinnerStateModel): string | null {
        return state.loadingText;
    }

    @Action(Actions.SetVisibility)
    setVisibility(ctx: StateContext<SpinnerStateModel>, action: Actions.SetVisibility): void {
        ctx.patchState({
            isVisible: action.payload.isVisible,
            loadingText: action.payload.loadingText
        });
    }
}
