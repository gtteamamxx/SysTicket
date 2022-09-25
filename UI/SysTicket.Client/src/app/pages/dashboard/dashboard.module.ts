import { NgModule } from '@angular/core';
import { DashboardRouting } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [DashboardRouting],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
