import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  login(payload: { name: string; password: string }): Observable<User> {
    return this.http.get<User>(
      `${environment.api}/api/users?name=${payload.name}&password=${payload.password}`
    );
  }
}
