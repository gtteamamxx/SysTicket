import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxsModule } from '@ngxs/store';
import { NgxMasonryModule } from 'ngx-masonry';
import { EventPreviewComponent } from 'src/app/shared/components/event-preview/event-preview.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeState } from './store/home.state';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule, //
    MatPaginatorModule,
    EventPreviewComponent,
    NgxMasonryModule,
    NgxsModule.forFeature([HomeState]),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
