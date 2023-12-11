import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  collapsed: boolean = true;
  show: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(user);
    });
  }

  onSignOut() {
    this.authService.signOut();
  }
}
