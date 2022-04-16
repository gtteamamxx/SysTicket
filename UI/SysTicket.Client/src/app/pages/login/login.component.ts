import {
  ChangeDetectionStrategy,
  Component, ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserModel } from 'src/app/core/models/user.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserStateActions } from 'src/app/core/store/user.state.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private readonly store: Store,
    private readonly navigationService: NavigationService,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService) { }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.usersService.login({
      name: this.loginForm.get('login')?.value,
      password: this.loginForm.get('password')?.value
    }).subscribe((user: UserModel | null) => {
      if (user != null) {
        this.store.dispatch(new UserStateActions.SetLoggedUser({ user }))
          .subscribe(() => {
            this.notificationsService.showInfo('Zalogowano jako ' + user.name + ".", { timeoutInMs: 2000 });
            this.navigationService.navigateToMainPage()
          });
      } else {
        this.notificationsService.showInfo('Nie znaleziono takiego użytkownika.');
      }
    });
  }
}
