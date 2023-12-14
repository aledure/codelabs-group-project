import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { RoutineService } from 'src/app/shared/services/routine.service';
import { Routine } from 'src/app/shared/models/routine.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private routineService: RoutineService,
    private authService: AuthService
  ) {}

  routines: Routine[] = this.routineService.getRoutines();
  currentUser = this.authService.getCurrentUser();

  viewRoutine(routine: Routine): void {
    console.log(routine);
  }
}
