import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem('user');
  }

  getUser(): User | undefined {
    const userJson: string | null = localStorage.getItem('user');

    if (userJson == null) return undefined;

    return <User>JSON.parse(userJson);
  }
}
