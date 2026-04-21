import { Component, inject } from '@angular/core';
import { AuthService, FormService } from '../../../core/services';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected authService = inject(AuthService);
  protected formService = inject(FormService);
  private router = inject(Router);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formService.createLoginForm();
  }

  get email(): AbstractControl<any, any> | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }

  get showEmailError(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get showPasswordError(): boolean {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched) || false;
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['required']) {
      return 'Email is required!';
    }

    if (this.email?.errors?.['email']) {
      return 'Email is not valid!';
    }

    return '';
  }

  get passwordErrorMessage(): string {
    if (this.password?.errors?.['required']) {
      return 'Password is required!';
    }

    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    return '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loginForm.reset();
          this.formService.markFormGroupTouched(this.loginForm);
        }
      });
    } else {
      this.formService.markFormGroupTouched(this.loginForm);
    }
  }
}