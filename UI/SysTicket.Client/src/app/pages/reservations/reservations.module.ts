import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanEnterIntoReservationGuard } from './can-enter-into-reservation.guard';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';

@NgModule({
  imports: [
    CommonModule, //
    ReservationsRoutingModule,
  ],
  declarations: [ReservationsComponent],
  providers: [CanEnterIntoReservationGuard],
})
export class ReservationsModule {}
