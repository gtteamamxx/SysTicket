import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserModel } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private readonly http: HttpClient) { }

    login(payload: {
        name: string;
        password: string
    }): Observable<UserModel> {
        return this.http.get<UserModel>(`${environment.api}/api/users?name=${payload.name}&password=${payload.password}`)
    }
}