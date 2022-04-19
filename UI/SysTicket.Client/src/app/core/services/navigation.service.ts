import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../resources/constants';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  navigateToMainPage(): void {
    this.router.navigateByUrl('/');
  }

  navigateToManageUsers(): void {
    this.router.navigate([Constants.manageUsers]);
  }

  navigateToLoginPage(): void {
    this.router.navigate([Constants.loginPage]);
  }
}
