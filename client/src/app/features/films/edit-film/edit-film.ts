import { Component, inject, OnInit } from '@angular/core';
import { AuthService, FilmsService, FormService } from '../../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Film } from '../../../models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-film',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatIconModule],
  templateUrl: './edit-film.html',
  styleUrl: './edit-film.scss',
})
export class EditFilm implements OnInit {
  protected filmService = inject(FilmsService);
  protected authService = inject(AuthService);
  protected formService = inject(FormService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editForm: FormGroup;

  genres: string[] = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Fantasy', 'Historical', 'Horror', 'Musical', 'Mystery',
    'Romance', 'Science Fiction', 'Thriller', 'War', 'Western', 'Other'
  ];

  constructor() {
    this.editForm = this.formService.createFilmForm();
  }

  ngOnInit(): void {
    const filmId = this.getFilmIdFromRoute();

    if (!filmId) {
      this.router.navigate(['/home']);
      return;
    }

    this.filmService.getFilmById(filmId).subscribe({
      next: (film: Film) => {
        this.editForm.patchValue({
          title: film.title,
          year: film.year,
          genre: film.genre,
          img: film.img,
          description: film.description
        });
      },
      error: () => {
        this.router.navigate([`/films/${filmId}/details`]);
      }
    });
  }

  get title(): AbstractControl<any, any> | null {
    return this.editForm.get('title');
  }

  get year(): AbstractControl<any, any> | null {
    return this.editForm.get('year');
  }

  get genre(): AbstractControl<any, any> | null {
    return this.editForm.get('genre');
  }

  get img(): AbstractControl<any, any> | null {
    return this.editForm.get('img');
  }

  get description(): AbstractControl<any, any> | null {
    return this.editForm.get('description');
  }

  get showTitleError(): boolean {
    return this.title?.invalid && (this.title?.dirty || this.title?.touched) || false;
  }

  get showYearError(): boolean {
    return this.year?.invalid && (this.year?.dirty || this.year?.touched) || false;
  }

  get showGenreError(): boolean {
    return this.genre?.invalid && (this.genre?.dirty || this.genre?.touched) || false;
  }

  get showImgError(): boolean {
    return this.img?.invalid && (this.img?.dirty || this.img?.touched) || false;
  }

  get showDescriptionError(): boolean {
    return this.description?.invalid && (this.description?.dirty || this.description?.touched) || false;
  }

  get titleErrorMessage(): string {
    if (this.title?.errors?.['required']) {
      return 'Title is required!';
    }

    if (this.title?.errors?.['minlength']) {
      return 'Title must be at least 2 characters!'
    }

    return '';
  }

  get yearErrorMessage(): string {
    if (this.year?.errors?.['required']) {
      return 'Year is required!';
    }

    if (this.year?.errors?.['min']) {
      return 'Year cannot be earlier than 1900!'
    }

    if (this.year?.errors?.['max']) {
      return `Year cannot be later than ${this.formService.maxYear}!`
    }

    return '';
  }

  get genreErrorMessage(): string {
    if (this.genre?.errors?.['required']) {
      return 'Genre is required!';
    }

    return '';
  }

  get imgErrorMessage(): string {
    if (this.img?.errors?.['required']) {
      return 'Image url is required!';
    }

    return '';
  }

  get descriptionErrorMessage(): string {
    if (this.description?.errors?.['required']) {
      return 'Description is required!';
    }

    if (this.description?.errors?.['minlength']) {
      return 'Description must be at least 5 characters!'
    }

    if (this.description?.errors?.['maxlength']) {
      return 'Description must not exceed 600 characters!'
    }

    return '';
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const { title, year, genre, img, description } = this.editForm.value;
      const filmId = this.getFilmIdFromRoute();
      const user = this.authService.currentUser();

      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      if (filmId) {
        this.filmService.updateFilm(
          filmId,
          title,
          year,
          genre,
          img,
          description,
          user.username)
          .subscribe({
            next: () => {
              this.router.navigate([`/films/${filmId}/details`]);
            },
            error: (err) => {
              this.editForm.reset();
              this.formService.markFormGroupTouched(this.editForm);
            }
          });
      } else {
        this.formService.markFormGroupTouched(this.editForm);
      }
    }
  }

  onCancel(): void {
    const filmId = this.getFilmIdFromRoute();

    this.router.navigate([`/films/${filmId}/details`]);
  }

  private getFilmIdFromRoute(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
