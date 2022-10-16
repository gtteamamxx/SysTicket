import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxsModule } from '@ngxs/store';
import { EventDetailsRoutingModule } from './event-details-routing.module';
import { EventDetailsComponent } from './event-details.component';
import { EventDetailsState } from './store/event-details.state';

@NgModule({
  imports: [
    EventDetailsRoutingModule, //
    CommonModule,
    MatCardModule,
    MatButtonModule,
    NgxsModule.forFeature([EventDetailsState]),
  ],
  declarations: [EventDetailsComponent],
})
export class EventDetailsModule {}
