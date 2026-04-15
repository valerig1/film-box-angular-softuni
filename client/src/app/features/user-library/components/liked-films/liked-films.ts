import { Component, inject } from '@angular/core';
import { AuthService, FilmsService, LikesService } from '../../../../core/services';
import { map, Observable, of, switchMap } from 'rxjs';
import { Film } from '../../../../models';
import { FilmItem } from '../../../films';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liked-films',
  imports: [FilmItem, CommonModule],
  templateUrl: './liked-films.html',
  styleUrl: './liked-films.scss',
})

export class LikedFilms {
  protected filmsService = inject(FilmsService);
  protected authService = inject(AuthService);
  protected likesService = inject(LikesService);

  films$!: Observable<Film[]>;

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      this.films$ = of([]);
      return;
    }

    this.films$ = this.likesService.getUserLikes(userId).pipe(
      map(likes => likes.map(l => l.filmId)),
      switchMap(ids => {
        if (ids.length === 0) {
          return of([]);
        }
        return this.filmsService.getFilmsByIds(ids);
      })
    );
  }
}
