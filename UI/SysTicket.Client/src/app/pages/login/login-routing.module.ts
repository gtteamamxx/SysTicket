import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SysTicketRoutes } from 'src/app/core/models/common/systticket-routes.model';
import { LoginComponent } from './login.component';
import { LoginGuard } from './login.guard';

const routes: SysTicketRoutes = [
  {
    path: '',
    data: {
      title: 'Logowanie',
    },
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [LoginGuard],
  exports: [RouterModule],
})
export class LoginRoutingModule { }
