import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRoutingModule = RouterModule.forChild([
  {
    path: '',
    data: {
      title: 'SysTicket - Lista wydarzeń',
    },
    component: HomeComponent,
  },
]);
