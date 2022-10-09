import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SpinnerService } from 'src/app/core/services/misc/spinner.service';
import { HomeState } from './store/home.state';
import { HomeStateActions as Actions } from './store/home.state.actions';

@Injectable()
export class HomeFacade {
  constructor(
    private readonly spinner: SpinnerService, //
    private readonly store: Store
  ) {}

  init(): void {
    const pageSize: number = this.store.selectSnapshot(HomeState.pageSize);
    const pageIndex: number = this.store.selectSnapshot(HomeState.pageIndex);

    this.loadEvents({
      pageSize,
      pageIndex,
    });
  }

  loadEvents(payload: {
    pageSize: number; //
    pageIndex: number;
  }): void {
    window.scroll({
      top: 0,
    });

    this.spinner.show();

    this.store
      .dispatch(
        new Actions.LoadEvents({
          pageSize: payload.pageSize,
          pageIndex: payload.pageIndex,
        })
      )
      .subscribe()
      .add(() => this.spinner.hide());
  }
}
