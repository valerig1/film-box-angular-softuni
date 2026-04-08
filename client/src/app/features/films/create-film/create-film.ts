import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilmsService } from '../../../core/services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-film',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './create-film.html',
  styleUrl: './create-film.scss',
})
export class CreateFilm {
  protected filmService = inject(FilmsService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  createForm: FormGroup;

  genres: string[] = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Fantasy', 'Historical', 'Horror', 'Musical', 'Mystery',
    'Romance', 'Science Fiction', 'Thriller', 'War', 'Western', 'Other'
  ];

  constructor() {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      genre: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  get title(): AbstractControl<any, any> | null {
    return this.createForm.get('title');
  }

  get year(): AbstractControl<any, any> | null {
    return this.createForm.get('year');
  }

  get genre(): AbstractControl<any, any> | null {
    return this.createForm.get('genre');
  }

  get img(): AbstractControl<any, any> | null {
    return this.createForm.get('img');
  }

  get description(): AbstractControl<any, any> | null {
    return this.createForm.get('description');
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

    return '';
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const { title, year, genre, img, description } = this.createForm.value;

      this.filmService.createFilm(title, year, genre, img, description).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert(err.error.message);
          this.createForm.reset();
          this.markFormGroupTouched();
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.createForm.controls).forEach(key => {
      const control = this.createForm.get(key);
      control?.markAsTouched();
    })
  }

}
