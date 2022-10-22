import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxsModule } from '@ngxs/store';
import { EventDetailsRoutingModule } from './event-details-routing.module';
import { EventDetailsComponent } from './event-details.component';
import { EventDetailsState } from './store/event-details.state';
import { ReserveSeatsModalComponent } from './reserve-seats-modal/reserve-seats-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    EventDetailsRoutingModule, //
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    NgxsModule.forFeature([EventDetailsState]),
    ReserveSeatsModalComponent,
  ],
  declarations: [EventDetailsComponent],
})
export class EventDetailsModule {}
