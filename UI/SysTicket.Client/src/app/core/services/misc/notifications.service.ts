import { Injectable } from '@angular/core';
import { NotificationsService as SimpleNotificationsService, Options } from 'angular2-notifications';

export interface NotificationOptions {
  message: string;
  config?: {
    timeoutInMs: number;
  };
}

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor(private service: SimpleNotificationsService) {}

  showInfo(payload: NotificationOptions): void {
    this.service.info('Informacja.', payload.message, <Options>{
      timeOut: payload?.config?.timeoutInMs ?? 5000,
      position: ['top', 'right'],
    });
  }

  showError(payload: NotificationOptions): void {
    this.service.error('Błąd!', payload.message, <Options>{
      timeOut: payload.config?.timeoutInMs ?? 5000,
      position: ['top', 'right'],
    });
  }

  showSuccess(payload: NotificationOptions): void {
    this.service.success('Sukces!', payload.message, <Options>{
      timeOut: payload.config?.timeoutInMs ?? 5000,
      position: ['top', 'right'],
    });
  }
}
