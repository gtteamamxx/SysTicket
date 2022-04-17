import { Injectable } from "@angular/core";
import { ActivationEnd, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { SysTicketRoutes } from "../models/common/systticket-routes.model";
import { CurrentPageStateActions } from "../store/current-page.state.actions";

@Injectable({ providedIn: 'root' })
export class CurrentPageListenerService {
    constructor(
        private readonly store: Store,
        private readonly router: Router) { }

    startListening(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof ActivationEnd) {
                const pageTitle: string | undefined = (<SysTicketRoutes><any>event.snapshot.firstChild)?.data?.title;

                this.store.dispatch(new CurrentPageStateActions.SetCurrentPageInfo({
                    title: pageTitle,
                    url: location.pathname
                }));
            }
        });
    }
}