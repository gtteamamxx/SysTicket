import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerModule } from './core/components/spinner/spinner.module';
import { TopBarModule } from './core/components/top-bar/top-bar.module';
import { HttpErrorInterceptor } from './core/services/interceptors/http-error-interceptor.service';
import { HttpHeadersInterceptor } from './core/services/interceptors/http-headers-interceptor.service';
import { AppInitializerService } from './core/services/misc/app-initializer.service';
import { CurrentPageState } from './core/store/current-page.state';
import { SettingsState } from './core/store/settings.state';
import { SpinnerState } from './core/store/spinner.state';
import { UserState } from './core/store/user.state';
import { SeatLayoutViewerComponent } from './shared/components/seat-layout-viewer/seat-layout-viewer.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

export function momentAdapterFactory() {
  moment.updateLocale('pl', {
    week: {
      dow: 1,
      doy: 0,
    },
  });

  return adapterFactory(moment);
}

const httpInterceptors = [
  {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
  },
  {
    multi: true,
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptor,
  },
];

const componentModules = [
  TopBarModule, //
  SpinnerModule,
];

const states = [
  CurrentPageState, //
  UserState,
  SettingsState,
  SpinnerState,
];

const common = [
  HttpClientModule, //
  SimpleNotificationsModule.forRoot(),
  NgxsModule.forRoot(states, {
    developmentMode: !environment.production,
  }),
  CalendarModule.forRoot({
    provide: DateAdapter, //
    useFactory: momentAdapterFactory,
  }),
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, //
    AppRoutingModule,
    BrowserAnimationsModule,
    ...common,
    ...componentModules,
  ],
  providers: [
    ...httpInterceptors,
    {
      multi: true,
      deps: [AppInitializerService],
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

function initializeAppFactory(appInitializerService: AppInitializerService): () => Observable<boolean> {
  return () => appInitializerService.init();
}
