import { Component, inject } from '@angular/core';
import { FavoriteFilmsBoard, LatestFilmsBoard } from '../films';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services';

@Component({
  selector: 'app-home',
  imports: [LatestFilmsBoard, FavoriteFilmsBoard, RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected authService = inject(AuthService);

  readonly isLoggedIn = this.authService.isLoggedIn;
}
