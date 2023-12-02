import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// Firebase Key and URLS //
const AUTH_API_KEY = 'AIzaSyBOqLQQcB5UEpHRyCKhx3ELfNxXwPan9AE';
const SIGN_UP_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const SIGN_IN_URL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(SIGN_UP_URL + AUTH_API_KEY, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          const { email, localId, idToken, expiresIn } = res;
          this.handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(SIGN_IN_URL + AUTH_API_KEY, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        tap((res) => {
          const { email, localId, idToken, expiresIn } = res;
          this.handleAuth(email, localId, idToken, +expiresIn);
        })
      );
  }

  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
  }
}
