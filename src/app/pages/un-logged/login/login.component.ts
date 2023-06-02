import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(6), this.usernameValidator],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6), this.passwordValidator],
      ],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const { username, password } = this.form.value;
    this.authService
      .login(username, password)
      .pipe(
        tap((response) => {
          console.log('response', response);
          this.tokenService.setToken(response.accessToken);
          this.router.navigate(['']);
        }),
        catchError((error) => {
          this.error = 'Login failed. Please check your credentials.';
          console.error('error', error);
          return error;
        })
      )
      .subscribe(null, null, () => {
        this.loading = false;
      });
  }

  usernameValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const valid = /^[a-zA-Z][a-zA-Z0-9_]{5,}$/.test(value);
    return valid ? null : { invalidUsername: true };
  }

  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const valid = /^(?=.*[A-Za-z])(?=.*\d{3,}).{6,}$/.test(value);
    return valid ? null : { invalidPassword: true };
  }
}
