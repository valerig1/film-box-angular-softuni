import { Component, inject, OnInit } from '@angular/core';
import { AuthService, FilmsService, LikesService } from '../../../core/services';
import { map, Observable, of, switchMap } from 'rxjs';
import { Film, Like } from '../../../models';
import { FilmItem } from '../film-item/film-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-films-board',
  imports: [FilmItem, CommonModule],
  templateUrl: './favorite-films-board.html',
  styleUrl: './favorite-films-board.scss',
})
export class FavoriteFilmsBoard implements OnInit {
  private filmsService = inject(FilmsService);
  private likesService = inject(LikesService);
  private authService = inject(AuthService);

  films$!: Observable<Film[]>;

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      this.films$ = of([]);
      return;
    }

    this.films$ = this.likesService.getUserLikes(userId)
      .pipe(
        map((likes: Like[]) => likes.map(like => like.filmId)),
        switchMap(filmIds => this.filmsService.getFilmsByIds(filmIds)
            .pipe(
              map(films => this.orderFilms(filmIds, films))
            )
        )
      );
  }

  private orderFilms(filmIds: string[], films: Film[]): Film[] {
    return filmIds
      .map(id => films.find(f => f._id === id))
      .filter((f): f is Film => !!f);
  }
}
