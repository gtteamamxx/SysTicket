import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import {
  CreateNewUserRequest,
  UsersService,
} from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-new-user-modal',
  templateUrl: './add-new-user-modal.component.html',
  styleUrls: ['./add-new-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AddNewUserModalComponent implements OnInit {
  userForm = new FormGroup({
    login: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(32),
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^.*[A-Z]+.*$'), // minimum jedna duża litera
      Validators.pattern('^.*[0-9]+.*$'), // minimum jedna cyfra
    ]),
    isAdmin: new FormControl(false),
  });

  constructor(
    private readonly usersService: UsersService,
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

    this.usersService
      .createNewUser(<CreateNewUserRequest>{
        isAdmin: this.userForm.get('isAdmin')!.value,
        userName: this.userForm.get('login')!.value,
        password: this.userForm.get('password')!.value,
      })
      .subscribe(() => {
        this.notificationsService.showInfo(
          `Pomyślnie dodano użytkownika '${this.userForm.get('login')!.value}'!`
        );
        this.matDialogRef.close(true);
      })
      .add(() => this.spinner.hide());
  }

  cancel(): void {
    this.matDialogRef.close(false);
  }
}
