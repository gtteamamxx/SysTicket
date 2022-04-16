import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarModule } from './core/components/top-bar/top-bar.module';
import { CurrentPageState } from './core/store/current-page.state';
import { UserState } from './core/store/user.state';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [
  TopBarModule
];

const states = [
  CurrentPageState, UserState
];

const common = [
  HttpClientModule,
  MatSnackBarModule,
  NgxsModule.forRoot(states, {
    developmentMode: !environment.production,
  }),
]
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...common,
    ...components,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
