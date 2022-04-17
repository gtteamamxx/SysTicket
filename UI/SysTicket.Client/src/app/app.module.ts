import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerModule } from './core/components/spinner/spinner.module';
import { TopBarModule } from './core/components/top-bar/top-bar.module';
import { AppInitializerService } from './core/services/app-initializer.service';
import { ErrorInterceptor } from './core/services/error-interceptor.service';
import { CurrentPageState } from './core/store/current-page.state';
import { UserState } from './core/store/user.state';

const components = [
  TopBarModule,
  SpinnerModule
];

const states = [
  CurrentPageState, UserState
];

const common = [
  HttpClientModule,
  MatSnackBarModule,
  NgxsModule.forRoot(states, {
    developmentMode: !environment.production,
  })
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
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor
    },
    {
      multi: true,
      deps: [AppInitializerService],
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

function initializeAppFactory(appInitializerService: AppInitializerService): () => Promise<boolean> {
  return () => appInitializerService.init();
}
