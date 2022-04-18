import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ManageUsersRouting } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';

@NgModule({
  imports: [ManageUsersRouting, MatListModule],
  declarations: [ManageUsersComponent],
})
export class ManageUsersModule {}
