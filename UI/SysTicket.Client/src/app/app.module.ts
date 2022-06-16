import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { AppInitializerService } from './core/services/app-initializer.service';
import { HttpErrorInterceptor } from './core/services/http-error-interceptor.service';
import { HttpHeadersInterceptor } from './core/services/http-headers-interceptor.service';
import { CurrentPageState } from './core/store/current-page.state';
import { SettingsState } from './core/store/settings.state';
import { SpinnerState } from './core/store/spinner.state';
import { UserState } from './core/store/user.state';

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

const components = [
  TopBarModule, //
  SpinnerModule,
];

const states = [
  CurrentPageState, //
  UserState,
  SettingsState,
  SpinnerState
];

const common = [
  HttpClientModule, //
  MatProgressSpinnerModule,
  SimpleNotificationsModule.forRoot(),
  NgxsModule.forRoot(states, {
    developmentMode: !environment.production,
  }),
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, //
    AppRoutingModule,
    BrowserAnimationsModule,
    ...common,
    ...components,
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
export class AppModule { }

function initializeAppFactory(appInitializerService: AppInitializerService): () => Observable<boolean> {
  return () => appInitializerService.init();
}
