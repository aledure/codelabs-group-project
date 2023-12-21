import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { GoalsComponent } from './components/goals/goals.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth/auth-guard/auth-guard.component';
import { FilterComponent } from './components/filter/filter.component';
import { LiftDetailComponent } from './components/lift-detail/lift-detail.component';
import { EditRoutineComponent } from './components/edit-routine/edit-routine.component';
import { ActiveRoutineComponent } from './components/active-routine/active-routine.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'routines/new', component: FilterComponent },
  { path: 'edit/:id', component: EditRoutineComponent },
  { path: 'start/:id', component: ActiveRoutineComponent },
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },

  {
    path: 'lift/:id',
    component: LiftDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
