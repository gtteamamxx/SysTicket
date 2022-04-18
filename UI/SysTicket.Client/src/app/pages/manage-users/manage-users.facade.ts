import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { UsersService } from 'src/app/core/services/users.service';

@Injectable()
export class ManageUsersFacade {
  constructor(
    private readonly store: Store,
    private readonly navigationService: NavigationService,
    private readonly notificationsService: NotificationsService,
    private readonly spinner: SpinnerService,
    private readonly usersService: UsersService
  ) {}
}
