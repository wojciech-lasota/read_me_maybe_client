import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/auth/login`,
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3000/auth/register`,
      {
        username,
        email,
        password,
        role: 'user',
      },
      httpOptions
    );
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
