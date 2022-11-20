import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxsModule } from '@ngxs/store';
import { CalendarModule } from 'angular-calendar';
import { NgxMasonryModule } from 'ngx-masonry';
import { EventPreviewComponent } from 'src/app/shared/components/event-preview/event-preview.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeState } from './store/home.state';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule, //
    MatIconModule,
    MatPaginatorModule,
    EventPreviewComponent,
    NgxMasonryModule,
    MatButtonModule,
    CalendarModule,
    NgxsModule.forFeature([HomeState]),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
