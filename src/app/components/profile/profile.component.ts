import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Routine } from 'src/app/shared/models/routine.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  savedRoutines: [];

  ngOnInit() {
    const savedRoutineString = localStorage.getItem('routines');
    this.savedRoutines = savedRoutineString
      ? JSON.parse(savedRoutineString)
      : null;
  }

  constructor(private authService: AuthService, private router: Router) {}

  currentUser = this.authService.getCurrentUser();

  editRoutine(savedRoutine: any) {
    const editRoute = `/edit/${savedRoutine.id}`;
    this.router.navigate([editRoute]);
  }

  startRoutine(savedRoutine: any) {
    const startRoute = `/start/${savedRoutine.id}`;
    this.router.navigate([startRoute]);
  }

  deleteRoutine(savedRoutine: any) {
    const savedRoutines = JSON.parse(localStorage.getItem('routines'));
    const newSavedRoutines = savedRoutines.filter(
      (routine: any) => routine.id !== savedRoutine.id
    );
    localStorage.setItem('routines', JSON.stringify(newSavedRoutines));
    this.savedRoutines = newSavedRoutines;
  }
}
