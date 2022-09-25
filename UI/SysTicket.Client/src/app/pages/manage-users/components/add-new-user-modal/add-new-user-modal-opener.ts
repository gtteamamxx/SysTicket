import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddNewUserModalComponent } from './add-new-user-modal.component';

@Injectable()
export class AddNewUserModalOpener {
  constructor(private readonly modal: MatDialog) {}

  openAddNewUserModal(): Observable<boolean | undefined> {
    return this.modal
      .open(AddNewUserModalComponent, {
        width: '350px',
        height: '375px',
        panelClass: 'add-new-user-modal',
      })
      .afterClosed();
  }
}
