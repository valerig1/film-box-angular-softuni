import { Component, inject, OnInit } from '@angular/core';
import { AuthService, FilmsService } from '../../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  editForm: FormGroup;

  genres: string[] = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Fantasy', 'Historical', 'Horror', 'Musical', 'Mystery',
    'Romance', 'Science Fiction', 'Thriller', 'War', 'Western', 'Other'
  ];

  constructor() {
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      genre: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(600)]]
    })
  }

  ngOnInit(): void {
    const filmId = this.getFilmIdFromRoute();

    if (filmId) {
      this.filmService.getFilmById(filmId).subscribe({
        next: (film: Film) => {   
          this.editForm.patchValue({
            title: film.title,
            year: film.year,
            genre: film.genre,
            img: film.img,
            description: film.description
          });
        }
      });
    }
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
      return 'Year cannot be later than 2026!'
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
        this.filmService.updateFilm(filmId, title, year, genre, img, description, user.username).subscribe({
          next: () => {
            this.router.navigate([`/films/${filmId}/details`]);
          },
          error: (err) => {
            this.editForm.reset();
            this.markFormGroupTouched();
          }
        });
      } else {
        this.markFormGroupTouched();
      }
      }
  }

  onCancel(): void {
     const filmId = this.getFilmIdFromRoute();

     this.router.navigate([`/films/${filmId}/details`]);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.editForm.controls).forEach(key => {
      const control = this.editForm.get(key);
      control?.markAsTouched();
    })
  }

  private getFilmIdFromRoute(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }
}
