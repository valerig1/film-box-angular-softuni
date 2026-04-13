import { Component, inject, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService, FilmsService } from '../../../core/services';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Film } from '../../../models';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CapitalizeTextPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-film-details',
  imports: [RouterModule, RouterLink, CommonModule, CapitalizeTextPipe],
  templateUrl: './film-details.html',
  styleUrl: './film-details.scss',
})
export class FilmDetails implements OnInit, OnDestroy {
  protected filmService = inject(FilmsService);
  protected authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private filmSubscription: Subscription | null = null;

  film: Film | null = null;
  isLoading: boolean = true;

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

  ngOnInit(): void {
    const filmId = this.getFilmIdFromRoute();

    if (filmId) {
      this.filmSubscription = this.filmService.getFilmById(filmId).subscribe({
        next: (film) => {
          this.film = film;
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
        error: (err) => {
          this.isLoading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.filmSubscription) {
      this.filmSubscription.unsubscribe();
    }
  }

  deleteFilmHandler(): void {
    const filmId = this.getFilmIdFromRoute();

    const isConfirmed = confirm(`Are you sure you want to delete this film: ${this.film?.title}`);

    if (!isConfirmed) {
      return;
    }

    if (filmId) {
      this.filmService.deleteFilm(filmId).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        }
      })
    }
  }

  private getFilmIdFromRoute(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
