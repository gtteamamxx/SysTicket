import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { SettingsState } from '../store/settings.state';

export interface CreateNewUserRequest {
  userName: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private readonly store: Store, //
    private readonly http: HttpClient
  ) {}

  login(payload: { name: string; password: string }): Observable<User> {
    return this.http.get<User>(`${this.store.selectSnapshot(SettingsState.apiUrl)}/api/users?name=${payload.name}&password=${payload.password}`);
  }

  createNewUser(payload: CreateNewUserRequest): Observable<void> {
    return this.http.post<void>(`${this.store.selectSnapshot(SettingsState.apiUrl)}/api/users`, JSON.stringify(payload));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.store.selectSnapshot(SettingsState.apiUrl)}/api/users/all`);
  }
}
