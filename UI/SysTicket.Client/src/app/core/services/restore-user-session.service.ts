import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { User } from "../models/user.model";
import { UserStateActions } from "../store/user.state.actions";
import { LocalStorageService } from "./local-storage.service";

@Injectable({ providedIn: 'root' })
export class RestoreUserSessionService {
    constructor(
        private readonly localStorageService: LocalStorageService,
        private readonly store: Store) { }

    restoreUserSession(): void {
        const user: User | undefined = this.localStorageService.getUser();

        if (user != null) {
            this.store.dispatch(new UserStateActions.SetLoggedUser({ user }));
        }
    }
}