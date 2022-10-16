import { RouterModule } from '@angular/router';
import { EventDetailsComponent } from './event-details.component';

export const EventDetailsRoutingModule = RouterModule.forChild([
  {
    path: '',
    component: EventDetailsComponent,
  },
]);
