import { RouterModule, Routes } from '@angular/router';
import { CanEnterIntoReservationGuard } from './can-enter-into-reservation.guard';
import { ReservationsComponent } from './reservations.component';
import { ReservationsResolver } from './reservations.resolver';

const routes: Routes = [
  {
    path: ':id',
    canActivate: [CanEnterIntoReservationGuard],
    resolve: {
      reservation: ReservationsResolver,
    },
    component: ReservationsComponent,
  },
];

export const ReservationsRoutingModule = RouterModule.forChild(routes);
