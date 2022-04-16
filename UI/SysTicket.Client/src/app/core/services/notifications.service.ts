import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    constructor(private readonly snackbar: MatSnackBar) { }

    showInfo(message: string, config?: {
        timeoutInMs: number
    }): void {
        this.snackbar.open(message, 'Zamknij', {
            duration: config?.timeoutInMs ?? 5000
        });
    }
}