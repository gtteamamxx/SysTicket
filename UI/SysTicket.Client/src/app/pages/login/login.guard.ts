import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/core/services/misc/navigation.service';
import { UserState } from 'src/app/core/store/user.state';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly navigationService: NavigationService, //
    private readonly store: Store
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.store.selectSnapshot(UserState.isUserLogged)) {
      this.navigationService.navigateToMainPage();
      return false;
    }

    return true;
  }
}
