import { RouterModule } from '@angular/router';
import { AddEventComponent } from './add-event.component';

export const AddEventRouting = RouterModule.forChild([
  {
    path: '',
    data: {
      title: 'Dodaj wydarzenie',
    },
    component: AddEventComponent,
  },
]);
