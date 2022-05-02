import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/core/models/user.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserStateActions } from 'src/app/core/store/user.state.actions';

@Injectable()
export class LoginFacade {
  constructor(
    private readonly store: Store, //
    private readonly navigationService: NavigationService,
    private readonly notificationsService: NotificationsService,
    private readonly spinner: SpinnerService,
    private readonly usersService: UsersService
  ) {}

  login(name: string, password: string): void {
    if (this.spinner.isVisible) {
      return;
    }

    this.spinner.show('Trwa logowanie...');

    this.usersService
      .login({ name, password })
      .subscribe((user: User | null) => {
        if (user != null) {
          this.store.dispatch(new UserStateActions.SetLoggedUser({ user })).subscribe(() => {
            this.notificationsService.showInfo({ message: 'Zalogowano jako ' + user.name + '.', config: { timeoutInMs: 2000 } });
            this.navigationService.navigateToMainPage();
          });
        } else {
          this.notificationsService.showInfo({ message: 'Nie znaleziono takiego użytkownika.' });
        }
      })
      .add(() => this.spinner.hide());
  }
}
