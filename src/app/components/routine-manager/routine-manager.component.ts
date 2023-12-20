import { Component } from '@angular/core';
import { RoutineService } from 'src/app/shared/services/routine.service';
import { Lift } from 'src/app/shared/models/lift.model';
import { Routine } from 'src/app/shared/models/routine.model';

@Component({
  selector: 'app-routine-manager',
  templateUrl: './routine-manager.component.html',
  styleUrls: ['./routine-manager.component.scss'],
})
export class RoutineManagerComponent {
  routine: Lift[] = [];
  selectedLift: Lift;
  lifts: Lift;

  constructor(private routineService: RoutineService) {}

  onInit() {
    this.routineService.liftSelected$.subscribe((lift) => {
      this.selectedLift = lift;
      this.routine.push(this.selectedLift);
      console.log('current routine: ' + this.routine);
    });
  }

  getLift(lift: Lift): void {
    this.routineService.selectLift(lift);
  }
}
