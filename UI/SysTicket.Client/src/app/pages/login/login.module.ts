import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  imports: [LoginRoutingModule, MatCardModule, MatButtonModule, MatInputModule],
  declarations: [LoginComponent],
})
export class TopBarModule {}
