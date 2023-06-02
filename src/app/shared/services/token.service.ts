import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setToken(token: string): void {
    this.removeToken();
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) ?? '';
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
