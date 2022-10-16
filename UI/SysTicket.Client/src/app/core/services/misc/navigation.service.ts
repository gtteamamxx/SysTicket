import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../resources/constants';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  navigateToMainPage(): void {
    this.router.navigateByUrl('/');
  }

  navigateToManageUsersPage(): void {
    this.router.navigate([Constants.manageUsersPage]);
  }

  navigateToLoginPage(): void {
    this.router.navigate([Constants.loginPage]);
  }

  navigateToAddEventPage(): void {
    this.router.navigate([Constants.eventsPage, Constants.addEventPage]);
  }

  navigateToEventPage(eventId: number) {
    return this.router.navigate([Constants.eventsPage, eventId]);
  }

  navigateToHome(): void {
    this.router.navigate([Constants.homePage]);
  }
}
