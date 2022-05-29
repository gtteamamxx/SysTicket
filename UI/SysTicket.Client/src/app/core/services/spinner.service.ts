import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SpinnerState } from '../store/spinner.state';
import { SpinnerStateActions } from '../store/spinner.state.actions';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  get isVisible(): boolean {
    return this.store.selectSnapshot(SpinnerState.isVisible);
  }

  private spinnerCount = 0;

  constructor(private store: Store) { }

  show(text?: string): void {
    this.store.dispatch(new SpinnerStateActions.SetVisibility({ isVisible: true, loadingText: text }));
    this.spinnerCount++;
  }

  hide(): void {
    setTimeout(() => {
      this.spinnerCount--;

      if (this.spinnerCount <= 0) {
        this.store.dispatch(new SpinnerStateActions.SetVisibility({ isVisible: false }));
        this.spinnerCount = 0;
      }
    }, 300);
  }
}
