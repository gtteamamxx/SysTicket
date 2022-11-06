import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/core/models/user.model';
import { SpinnerService } from 'src/app/core/services/misc/spinner.service';
import { AddNewUserModalOpener } from './components/add-new-user-modal/add-new-user-modal-opener';
import { ManageUsersStateActions } from './store/manage-users.state.actions';

@Injectable()
export class ManageUsersFacade implements OnDestroy {
  constructor(
    private readonly store: Store, //
    private readonly addNewUserModalOpener: AddNewUserModalOpener,
    private readonly spinner: SpinnerService
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(new ManageUsersStateActions.Clear());
  }

  init(): void {
    this.loadUsersList();
  }

  openAddNewUserModal(): void {
    this.addNewUserModalOpener.openAddNewUserModal().subscribe((result: boolean | undefined) => {
      if (result === true) {
        this.loadUsersList();
      }
    });
  }

  removeUser(user: User): void {
    this.spinner.show('Usuwanie użytkownika...');

    this.store
      .dispatch(new ManageUsersStateActions.RemoveUser({ user })) //
      .subscribe()
      .add(() => this.spinner.hide());
  }

  private loadUsersList(): void {
    this.spinner.show('Trwa wczytywanie listy użytkowników...');

    this.store
      .dispatch(new ManageUsersStateActions.LoadAllUsers())
      .subscribe()
      .add(() => this.spinner.hide());
  }
}
