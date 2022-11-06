import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
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

  navigateToReservation({ reservation }: { reservation: string }): Observable<any> {
    return from(this.router.navigate([Constants.reservationsPage, reservation]));
  }

  navigateToEventPage(eventId: number): void {
    this.router.navigate([Constants.eventsPage, eventId]);
  }

  navigateToHome(): void {
    this.router.navigate([Constants.homePage]);
  }
}
