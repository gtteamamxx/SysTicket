import { Injectable } from "@angular/core";
import { RestoreUserSessionService } from "./restore-user-session.service";

@Injectable({ providedIn: 'root' })
export class AppInitializerService {
    constructor(private readonly restoreUserSessionService: RestoreUserSessionService) { }

    init(): Promise<boolean> {
        this.restoreUserSessionService.restoreUserSession();
        return Promise.resolve(true);
    }
}