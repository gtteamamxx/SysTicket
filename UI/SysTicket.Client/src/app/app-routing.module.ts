import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './core/resources/constants';

const routes: Routes = [
  {
    path: Constants.homePage,
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: Constants.loginPage,
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: Constants.manageUsersPage,
    loadChildren: () => import('./pages/manage-users/manage-users.module').then((m) => m.ManageUsersModule),
  },
  {
    path: Constants.manageUsersPage,
    loadChildren: () => import('./pages/manage-users/manage-users.module').then((m) => m.ManageUsersModule),
  },
  {
    path: Constants.eventsPage,
    loadChildren: () => import('./pages/events/events.module').then((m) => m.EventsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
