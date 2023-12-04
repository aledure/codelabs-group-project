import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { GoalsComponent } from './components/goals/goals.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth/auth-guard/auth-guard.component';
import { FilterComponent } from './components/filter/filter.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'results', component: FilterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
