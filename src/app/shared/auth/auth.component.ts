import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;

  errMsg: string = null;

  authObservable: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthFormSubmit(formObj: NgForm) {
    if (formObj.invalid) return;

    const { email, password } = formObj.value;

    if (this.isLoginMode) {
      this.authObservable = this.authService.signIn(email, password);
    } else {
      this.authObservable = this.authService.signUp(email, password);
    }

    this.authObservable.subscribe(
      (res) => {
        console.log('Auth response success: ', res);
        {
          this.errMsg = null;
          this.router.navigate(['profile']);
        }
      },
      (err) => {
        console.log('Auth response error: ', err);
        this.errMsg = this.isLoginMode
          ? // SIGN UP/IN ERROR MESSAGES
            'There was an issue signing in.'
          : 'There was an issue signing up.';
      },
      () => {
        this.errMsg = null;
      }
    );

    formObj.reset();
  }
}
