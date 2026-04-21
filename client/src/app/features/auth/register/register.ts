import { Component, inject } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, FormService } from '../../../core/services';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  protected authService = inject(AuthService);
  protected formService = inject(FormService);
  private router = inject(Router);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formService.createRegisterForm();
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get('email');
  }

  get passwords(): FormGroup<any> {
    return this.registerForm.get('passwords') as FormGroup;
  }

  get password(): AbstractControl<any, any> | null {
    return this.passwords.get('password');
  }

  get rePassword(): AbstractControl<any, any> | null {
    return this.passwords.get('rePassword');
  }

  get showUsernameError(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false;
  }

  get showEmailError(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get showPasswordError(): boolean {
    return this.passwords?.invalid && (this.passwords?.dirty || this.passwords?.touched) || false;
  }

  get usernameErrorMessage(): string {
    if (this.username?.errors?.['required']) {
      return 'Username is required!';
    }

    if (this.username?.errors?.['minlength']) {
      return 'Username must have at least 2 characters!';
    }

    if (this.username?.errors?.['maxlength']) {
      return 'Username must not exceed 30 characters!';
    }

    return '';
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

    if (this.passwords?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }

  get rePasswordErrorMessage(): string {
    if (this.rePassword?.errors?.['required']) {
      return 'Confirm password is required!';
    }

    if (this.rePassword?.errors?.['minlength']) {
      return 'Confirm password must be at least 5 characters!';
    }

    if (this.passwords?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, email } = this.registerForm.value;
      const { password, rePassword } = this.registerForm.value.passwords;

      this.authService.register(
        username,
        email,
        password,
        rePassword).subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.registerForm.reset();
            this.formService.markFormGroupTouched(this.registerForm);
          }
        })
    } else {
      this.formService.markFormGroupTouched(this.registerForm);
    }
  }
}
