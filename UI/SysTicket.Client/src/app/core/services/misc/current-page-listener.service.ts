import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SysTicketRoutes } from '../../models/common/systicket-routes.model';
import { CurrentPageState } from '../../store/current-page.state';
import { CurrentPageStateActions } from '../../store/current-page.state.actions';

@Injectable({ providedIn: 'root' })
export class CurrentPageListenerService {
  constructor(
    private readonly store: Store, //
    private readonly router: Router
  ) {}

  startListening(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        let pageTitle: string | undefined = (<SysTicketRoutes>(<any>event.snapshot.firstChild))?.data?.title;

        // in case no page title found - use last one
        if (pageTitle == undefined) {
          pageTitle = this.store.selectSnapshot(CurrentPageState.title)!;
        }

        this.store.dispatch(
          new CurrentPageStateActions.SetCurrentPageInfo({
            title: pageTitle,
            url: location.pathname,
          })
        );
      }
    });
  }
}
