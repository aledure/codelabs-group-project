import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-routine',
  templateUrl: './edit-routine.component.html',
  styleUrls: ['./edit-routine.component.scss'],
})
export class EditRoutineComponent implements OnInit {
  routineId: string;
  routine: any; // Adjust the type accordingly

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the routine ID from the route parameters
    this.routineId = this.route.snapshot.paramMap.get('id');
    console.log('Routine ID:', this.routineId); // Log the ID to the console

    // Fetch routine data from local storage (assuming it's stored as a JSON string)
    const routinesString = localStorage.getItem('routines');
    const routines = routinesString ? JSON.parse(routinesString) : {};

    // Retrieve the specific routine using its ID
    this.routine = routines[this.routineId];
    console.log('Routine:', this.routine); // Log the routine to the console
  }
}
