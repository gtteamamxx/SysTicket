import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Store } from '@ngxs/store';
import { catchError, map, Observable, of } from 'rxjs';
import { SettingsStateActions } from '../store/settings.state.actions';
import { RestoreUserSessionService } from './restore-user-session.service';

@Injectable({ providedIn: 'root' })
export class AppInitializerService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly restoreUserSessionService: RestoreUserSessionService
  ) {}

  init(): Observable<boolean> {
    this.restoreUserSessionService.restoreUserSession();

    return this.http.get('./assets/settings.json').pipe(
      map((settings: Object & any) => {
        this.store.dispatch(
          new SettingsStateActions.SetApiUrl({ apiUrl: settings.apiUrl })
        );
        return true;
      }),
      catchError(() => {
        console.error('unable to load settings');
        return of(false);
      })
    );
  }
}
