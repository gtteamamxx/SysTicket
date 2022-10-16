import { NgModule } from '@angular/core';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
  declarations: [EventsComponent],
  imports: [EventsRoutingModule],
})
export class EventsModule {}
