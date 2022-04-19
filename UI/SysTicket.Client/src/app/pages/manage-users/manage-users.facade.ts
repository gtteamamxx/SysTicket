import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { AddNewUserModalComponent } from './components/add-new-user-modal/add-new-user-modal.component';
import { ManageUsersStateActions } from './store/manage-users.state.actions';

@Injectable()
export class ManageUsersFacade implements OnDestroy {
  constructor(
    private readonly store: Store,
    private readonly modal: MatDialog,
    private readonly spinner: SpinnerService
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(new ManageUsersStateActions.Clear());
  }

  init(): void {
    this.loadUsersList();
  }

  openAddNewUserModal(): void {
    this.modal
      .open(AddNewUserModalComponent, {
        width: '350px',
        height: '375px',
      })
      .afterClosed()
      .subscribe((result: boolean | undefined) => {
        if (result === true) {
          this.loadUsersList();
        }
      });
  }

  private loadUsersList(): void {
    this.spinner.show('Trwa wczytywanie listy użytkowników...');

    this.store
      .dispatch(new ManageUsersStateActions.LoadAllUsers())
      .subscribe()
      .add(() => this.spinner.hide());
  }
}
