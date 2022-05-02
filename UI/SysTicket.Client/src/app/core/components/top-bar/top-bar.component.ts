import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { NotificationsService } from '../../services/notifications.service';
import { CurrentPageState } from '../../store/current-page.state';
import { UserState } from '../../store/user.state';
import { UserStateActions } from '../../store/user.state.actions';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TopBarComponent {
  @Select(CurrentPageState.title)
  currentPageTitle$!: Observable<string>;

  @Select(UserState.isUserLogged)
  isUserLogged$!: Observable<boolean>;

  @Select(UserState.isUserAdmin)
  isUserAdmin$!: Observable<boolean>;

  @Select(CurrentPageState.isOnLoginPage)
  isOnLoginPage$!: Observable<boolean>;

  @Select(CurrentPageState.isOnManageUsersPage)
  isOnManageUsersPage$!: Observable<boolean>;

  constructor(
    private readonly store: Store, //
    private readonly notificationsService: NotificationsService,
    private readonly navigationService: NavigationService
  ) {}

  login(): void {
    this.navigationService.navigateToLoginPage();
  }

  manageUsers(): void {
    this.navigationService.navigateToManageUsers();
  }

  logout(): void {
    this.store
      .dispatch(new UserStateActions.Logout())
      .subscribe()
      .add(() => {
        this.navigationService.navigateToMainPage();
        this.notificationsService.showInfo({ message: 'Wylogowano pomyślnie.' });
      });
  }
}
