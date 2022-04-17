import {
  ChangeDetectionStrategy,
  Component, ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { User } from 'src/app/core/models/user.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserStateActions } from 'src/app/core/store/user.state.actions';
import { LoginFacade } from './login.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFacade]
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private readonly loginFacade: LoginFacade) { }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginFacade.login(
      this.loginForm.get('login')?.value,
      this.loginForm.get('password')?.value
    );
  }
}
