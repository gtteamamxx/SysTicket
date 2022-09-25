import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NgxsModule } from '@ngxs/store';
import { AddNewUserModalOpener } from './components/add-new-user-modal/add-new-user-modal-opener';
import { AddNewUserModalComponent } from './components/add-new-user-modal/add-new-user-modal.component';
import { ManageUsersRouting } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';
import { ManageUsersState } from './store/manage-users.state';

@NgModule({
  imports: [
    ManageUsersRouting, //
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([ManageUsersState]),
  ],
  declarations: [ManageUsersComponent, AddNewUserModalComponent],
  providers: [AddNewUserModalOpener],
})
export class ManageUsersModule {}
