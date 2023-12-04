import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthService } from '../auth/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authService.currentUser.unsubscribe();
  }

  onSignOut() {
    this.authService.signOut();
  }
}
