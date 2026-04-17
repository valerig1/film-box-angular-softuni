import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected authService = inject(AuthService);

  readonly isLoggedIn = this.authService.isLoggedIn;
}
