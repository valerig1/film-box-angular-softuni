import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class FormService {
  private fb = inject(FormBuilder);
  
  readonly maxYear = new Date().getFullYear();

  createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(5)]],
        rePassword: ['', [Validators.required, Validators.minLength(5)]]
      }, { validators: this.passwordMatchValidator })
    });
  }

  createFilmForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]],
      genre: ['', [Validators.required]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(600)]]
    });
  }

  createCommentForm(): FormGroup {
    return this.fb.group({
      content: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]
      ]
    });
  }

  markFormGroupTouched(form: FormGroup): void {
    Object.values(form.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
    const password = passwordsControl.get('password');
    const rePassword = passwordsControl.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}