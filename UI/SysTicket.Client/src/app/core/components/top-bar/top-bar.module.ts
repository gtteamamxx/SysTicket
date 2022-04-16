import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { TopBarComponent } from './top-bar.component';

@NgModule({
  imports: [BrowserModule, MatButtonModule],
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
})
export class TopBarModule { }
