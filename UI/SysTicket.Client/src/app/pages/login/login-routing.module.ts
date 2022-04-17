import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysTicketRoutes } from 'src/app/core/models/common/systticket-routes.model';
import { LoginComponent } from './login.component';

const routes: SysTicketRoutes = [
  {
    path: '',
    data: {
      title: 'Logowanie',
    },
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
