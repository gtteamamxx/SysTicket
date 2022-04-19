import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { ManageUsersFacade } from './manage-users.facade';
import { ManageUsersState } from './store/manage-users.state';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ManageUsersFacade],
})
export class ManageUsersComponent implements OnInit {
  @Select(ManageUsersState.users)
  users$!: Observable<User[]>;

  constructor(private readonly facade: ManageUsersFacade) {}

  ngOnInit(): void {
    this.facade.init();
  }

  addNewUser(): void {
    this.facade.openAddNewUserModal();
  }
}
