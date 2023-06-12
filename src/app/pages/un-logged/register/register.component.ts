import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

function usernameValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^[a-zA-Z]{1}[a-zA-Z0-9_]{5,}$/.test(control.value);
  return valid
    ? null
    : { invalidUsername: { valid: false, value: control.value } };
}

function passwordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const valid = /^(?=.*[A-Za-z])(?=.*\d){3,}.*[A-Za-z\d]{6,}$/.test(
    control.value
  );
  return valid
    ? null
    : { invalidPassword: { valid: false, value: control.value } };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  success = false;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, usernameValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), passwordValidator],
      ],
      confirmPassword: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.submitted = true;
    this.success = false;
    this.error = false;

    if (
      this.form.invalid ||
      this.form.value.password !== this.form.value.confirmPassword
    ) {
      this.error = true;
      return;
    }

    this.loading = true;
    this.authService
      .register(
        this.form.value.username,
        this.form.value.email,
        this.form.value.password
      )
      .pipe(
        tap((response) => {
          this.success = true;
          this.loading = false;
        }),
        catchError((error) => {
          this.error = true;
          this.loading = false;
          return error;
        })
      )
      .subscribe();
  }
}
