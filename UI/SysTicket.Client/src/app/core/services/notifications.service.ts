import { Injectable } from '@angular/core';
import { NotificationsService as SimpleNotificationsService, Options } from 'angular2-notifications';
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor(private service: SimpleNotificationsService) {}

  showInfo(
    message: string,
    config?: {
      timeoutInMs: number;
    }
  ): void {
    this.service.info('Informacja', message, <Options>{
      timeOut: config?.timeoutInMs ?? 5000,
      position: ['bottom', 'right'],
    });
  }

  showSuccess(
    message: string,
    config?: {
      timeoutInMs: number;
    }
  ): void {
    this.service.success('Informacja', message, <Options>{
      timeOut: config?.timeoutInMs ?? 5000,
      position: ['bottom', 'right'],
    });
  }
}
