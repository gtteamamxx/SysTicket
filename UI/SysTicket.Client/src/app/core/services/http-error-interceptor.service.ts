import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly notificationsService: NotificationsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error) {
          try {
            const errorsObject: {
              errors: string;
            } = JSON.parse(err.error);

            if (errorsObject.errors != null) {
              this.notificationsService.showError({ message: errorsObject.errors });
              throw throwError(() => err);
            }
          } catch {}
        }

        this.notificationsService.showError({ message: 'Wystąpił problem podczas połączenia z serwerem.' });

        throw throwError(() => err);
      })
    );
  }
}
