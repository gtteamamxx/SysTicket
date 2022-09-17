import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginFacade } from './login.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFacade],
})
export class LoginComponent {
  loginForm = new UntypedFormGroup({
    login: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
  });

  constructor(private readonly loginFacade: LoginFacade) {}

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginFacade.login(this.loginForm.get('login')?.value, this.loginForm.get('password')?.value);
  }
}
