import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  get isVisible(): boolean {
    return this._isVisible;
  }

  private _isVisible: boolean = false;
  private matSnackbarRef: MatSnackBarRef<SpinnerComponent> | undefined;
  private timeout: any | undefined;

  constructor(private snackbar: MatSnackBar) {}

  show(title: string): void {
    this.matSnackbarRef?.dismiss(); // close current if exists

    this.timeout = setTimeout(() => {
      this.matSnackbarRef = this.snackbar.openFromComponent(SpinnerComponent, {
        duration: 999999,
      });

      this._isVisible = true;

      this.matSnackbarRef.instance.setTitle(title);
    }, 100);
  }

  hide(): void {
    if (this.timeout != null && !this._isVisible) {
      clearTimeout(this.timeout);
      return;
    }

    setTimeout(() => {
      this._isVisible = false;
      this.matSnackbarRef?.dismiss();
    }, 500);
  }
}
