import { Injectable } from '@angular/core';
// import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
interface IDecodedToken {
  sub: string;
  iat: number;
  exp: number;
}
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

  // decodeToken(token: string): IDecodedToken {
  //     return jwtDecode(token);
  // }

  // isTokenExpired(): boolean {
  //     const token = this.getToken();
  //     if (!token) {
  //         return true;
  //     }

  //     const decodedToken: any = jwtDecode(token);
  //     const currentTime = Date.now() / 1000;
  //     return decodedToken.exp < currentTime;
  // }
}
