import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SysTicketRoutes } from 'src/app/core/models/common/systticket-routes.model';
import { DashboardComponent } from './dashboard.component';

const routes: SysTicketRoutes = [
  {
    path: '',
    data: {
      title: 'Strona główna',
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouting {}
