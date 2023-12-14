import { Component } from '@angular/core';
import { RoutineService } from 'src/app/shared/services/routine.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-routine-manager',
  templateUrl: './routine-manager.component.html',
  styleUrls: ['./routine-manager.component.scss'],
})
export class RoutineManagerComponent {
  constructor(
    private routineService: RoutineService,
    private authService: AuthService
  ) {}

  onInit() {
    console.log(localStorage.getItem('user'));
  }

  routines = this.routineService.getRoutines();

  createRoutine(routineDetails: any): void {
    console.log('User is authenticated: ' + this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      // Get the current user from the authentication service
      const currentUser = this.authService.getCurrentUser();
      // Create a routine object to save to the database
      const routine = {
        userId: currentUser.id,
        routineDetails: routineDetails,
      };
      this.routineService.addRoutine(routine);
      console.log('data saved' + JSON.stringify(routine));
    } else {
      console.log('User is not authenticated');
      console.log(routineDetails);
    }
  }
}
