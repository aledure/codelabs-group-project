import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-active-routine',
  templateUrl: './active-routine.component.html',
  styleUrls: ['./active-routine.component.scss'],
})
export class ActiveRoutineComponent implements OnInit {
  routineId: string;
  routine: any;
  selectedSet: number | null = null;
  isEditMode = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routineId = this.route.snapshot.paramMap.get('id');
    this.retrieveRoutineById();
  }

  OnModeSwitch(): void {
    this.isEditMode = !this.isEditMode;
  }

  retrieveRoutineById() {
    const existingRoutinesString = localStorage.getItem('routines');
    const existingRoutines = existingRoutinesString
      ? JSON.parse(existingRoutinesString)
      : [];

    // Find the routine with the specified ID
    this.routine = existingRoutines.find(
      (routine) => routine.id === parseInt(this.routineId, 10)
    );

    if (this.routine) {
      // Access data within the "lifts" array of objects
      this.routine.lifts.forEach((lift) => {
        // Access lift-specific data, e.g., lift.sets, lift.reps, etc.
        console.log(lift.sets);
        console.log(lift.reps);
      });

      // Access rest of the routine's data
      const title = this.routine.title;
      const description = this.routine.description;
      const restDuration = this.routine.restDuration;
    } else {
      console.error('Routine not found.');
    }
  }

  displayRoutineProperties(): string {
    // Format routine properties as a string (customize this part based on your data structure)
    if (this.routine) {
      const lifts = this.routine.lifts.map((lift) => lift.name).join(', ');
      console.log('hello' + this.routine);
      return `
        Title: ${this.routine.title}
        Description: ${this.routine.description}
        Rest Duration: ${this.routine.restDuration}
        Lifts: ${lifts}
        Sets: ${this.routine.lift.sets}
      `;
    } else {
      return 'Routine not found.';
    }
  }

  getNumberArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index + 1);
  }

  toggleCircleColor(set: number): void {
    this.selectedSet = this.selectedSet === set ? null : set;
  }
}
