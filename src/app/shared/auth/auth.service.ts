import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router: Router) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.currentUser.next(
        new User(
          parsedUserData.email,
          parsedUserData.userId,
          parsedUserData.token,
          new Date(parsedUserData.tokenExpiration)
        )
      );
    }
  }
  currentUser = new BehaviorSubject<User>(null);

  userToken: string = null;

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

  isAuthenticated = () => !!this.currentUser.value;

  getCurrentUser() {
    return this.currentUser.value;
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
    // Token Expiration
    const expDate = new Date(
      new Date().getTime() + expiresIn * 1000 * 60 * 60 * 24 * 3
    );

    // Create a new user based on the info passed in the form and emit that user
    const formUser = new User(email, userId, token, expDate);
    this.currentUser.next(formUser);

    // Save the new user in localStorage
    localStorage.setItem('userData', JSON.stringify(formUser));
    console.log(localStorage.getItem('userData'));
  }

  signOut() {
    this.currentUser.next(null);
    this.router.navigate(['auth']);
  }
}
