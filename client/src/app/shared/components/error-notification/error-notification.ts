import { Component, inject } from '@angular/core';
import { ErrorService } from '../../../core/services';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-error-notification',
  imports: [MatIcon],
  templateUrl: './error-notification.html',
  styleUrl: './error-notification.scss',
})
export class ErrorNotification {
  private errorService = inject(ErrorService);

  readonly error = this.errorService.error;
}
