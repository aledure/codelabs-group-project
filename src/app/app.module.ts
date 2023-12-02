import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilteredResultsComponent } from './components/filtered-results/filtered-results.component';
import { GoalsComponent } from './components/goals/goals.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthComponent } from './shared/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    FilterComponent,
    FilteredResultsComponent,
    GoalsComponent,
    NavbarComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
