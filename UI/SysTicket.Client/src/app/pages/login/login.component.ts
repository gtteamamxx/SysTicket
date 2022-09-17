import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFacade } from './login.facade';

interface LoginForm {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFacade],
})
export class LoginComponent {
  loginForm = new FormGroup<LoginForm>({
    login: new FormControl<string | null>('', [Validators.required]),
    password: new FormControl<string | null>('', [Validators.required]),
  });

  constructor(private readonly loginFacade: LoginFacade) {}

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginFacade.login(
      this.loginForm.controls.login.value!, //
      this.loginForm.controls.password.value!
    );
  }
}
