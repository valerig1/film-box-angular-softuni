import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService, FilmsService } from '../../../../core/services';
import { Film } from '../../../../models';
import { FilmItem } from '../../../films';
import { RouterLink } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-uploads',
  imports: [FilmItem, RouterLink, CommonModule],
  templateUrl: './my-uploads.html',
  styleUrl: './my-uploads.scss',
})

export class MyUploads implements OnInit {
  protected filmsService = inject(FilmsService);
  protected authService = inject(AuthService);

  films$!: Observable<Film[]>;

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      this.films$ = of([]);
      return;
    }

    this.films$ = this.filmsService.getFilms().pipe(
      map(films => films.filter(f => f._ownerId === userId))
    );
  }
}
