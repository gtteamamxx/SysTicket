import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateNewUserRequest, UsersService } from 'src/app/core/services/http/users.service';
import { NotificationsService } from 'src/app/core/services/misc/notifications.service';
import { SpinnerService } from 'src/app/core/services/misc/spinner.service';

interface UserForm {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
  isAdmin: FormControl<boolean | null>;
}

@Component({
  selector: 'app-add-new-user-modal',
  templateUrl: './add-new-user-modal.component.html',
  styleUrls: ['./add-new-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AddNewUserModalComponent implements OnInit {
  userForm = new FormGroup<UserForm>({
    login: new FormControl<string>('', [Validators.minLength(3), Validators.maxLength(32), Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^.*[A-Z]+.*$'), // minimum jedna duża litera
      Validators.pattern('^.*[0-9]+.*$'), // minimum jedna cyfra
    ]),
    isAdmin: new FormControl<boolean | null>(false),
  });

  constructor(
    private readonly usersService: UsersService, //
    private readonly notificationsService: NotificationsService,
    private readonly spinner: SpinnerService,
    private readonly matDialogRef: MatDialogRef<AddNewUserModalComponent>
  ) {}

  ngOnInit(): void {
    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();
  }

  addNewUser(): void {
    if (this.spinner.isVisible) {
      return;
    }

    this.spinner.show('Dodawanie nowego użytkownika...');
    this.userForm.disable();

    this.usersService
      .createNewUser(<CreateNewUserRequest>{
        isAdmin: this.userForm.controls.isAdmin.value,
        userName: this.userForm.controls.login.value,
        password: this.userForm.controls.password.value,
      })
      .subscribe(() => {
        this.notificationsService.showSuccess({ message: `Pomyślnie dodano użytkownika '${this.userForm.controls.login.value}'!` });

        this.matDialogRef.close(true);
      })
      .add(() => {
        this.userForm.enable();
        this.spinner.hide();
      });
  }

  cancel(): void {
    this.matDialogRef.close(false);
  }
}
