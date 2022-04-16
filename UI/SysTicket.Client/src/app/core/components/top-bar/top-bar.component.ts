import {
  ChangeDetectionStrategy,
  Component, ViewEncapsulation
} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { CurrentPageState } from '../../store/current-page.state';
import { UserState } from '../../store/user.state';

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

  constructor(private readonly navigationService: NavigationService) { }

  login(): void {
    this.navigationService.navigateToLoginPage();
  }
}
