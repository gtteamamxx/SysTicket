import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxsModule } from '@ngxs/store';
import { SeatLayoutViewerComponent } from '../../../shared/components/seat-layout-viewer/seat-layout-viewer.component';
import { EventDetailsRoutingModule } from './event-details-routing.module';
import { EventDetailsComponent } from './event-details.component';
import { EventDetailsState } from './store/event-details.state';

@NgModule({
  imports: [
    EventDetailsRoutingModule, //
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxsModule.forFeature([EventDetailsState]),
    SeatLayoutViewerComponent,
  ],
  declarations: [EventDetailsComponent],
})
export class EventDetailsModule {}
