import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      {
        path: 'add-event',
        loadChildren: () => import('./add-event/add-event.module').then((m) => m.AddEventModule),
      },
    ],
  },
];

export const EventsRoutingModule = RouterModule.forChild(routes);
