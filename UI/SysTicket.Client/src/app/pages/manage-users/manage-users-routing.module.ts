import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SysTicketRoutes } from 'src/app/core/models/common/systticket-routes.model';
import { ManageUsersComponent } from './manage-users.component';
import { ManageUsersGuard } from './manage-users.guard';

const routes: SysTicketRoutes = [
  {
    path: '',
    data: {
      title: 'Zarządzanie użytkownikami',
    },
    canActivate: [ManageUsersGuard],
    component: ManageUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ManageUsersGuard],
  exports: [RouterModule],
})
export class ManageUsersRouting {}
