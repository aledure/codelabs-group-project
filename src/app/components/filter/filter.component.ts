import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Lift } from '../../shared/models/lift.model';
import { Router } from '@angular/router';
import { RoutineService } from 'src/app/shared/services/routine.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  lifts: Lift[] = [];
  selectedBodyPart: string = '';
  selectedEquipment: string = '';
  searchQuery: string = '';
  selectedLifts: Lift[] = [];
  routineTitle: string = '';
  routineDescription: string = '';
  restDuration: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private routineService: RoutineService
  ) {}

  ngOnInit() {
    this.fetchLiftsData();
  }

  onLiftClick(item: Lift) {
    const index = this.selectedLifts.indexOf(item);
    if (index === -1) {
      this.selectedLifts.push(item);
      console.log(item.name + ' has been added to your routine.');
      console.log(this.selectedLifts.length + ' lifts in routine.');
    } else {
      this.selectedLifts.splice(index, 1);
    }
  }

  removeLift(index: number) {
    if (index !== -1) {
      const removedLift = this.selectedLifts.splice(index, 1)[0];
      console.log(removedLift.name + ' has been removed from your routine.');
      console.log(this.selectedLifts.length + ' lifts in routine.');
    }
  }

  fetchLiftsData() {
    this.apiService.getAllLifts().subscribe(
      (data) => {
        this.lifts = data;
        console.log(this.lifts);
        return this.lifts;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  saveRoutine(title: string, description: string, restDuration: number) {
    // Retrieve existing routines from local storage
    const existingRoutinesString = localStorage.getItem('routines');
    const existingRoutines = existingRoutinesString
      ? JSON.parse(existingRoutinesString)
      : [];

    const newRoutine = {
      id: Date.now(),
      title: title,
      description: description,
      restDuration: restDuration,
      lifts: this.selectedLifts,
    };

    existingRoutines.push(newRoutine);

    localStorage.setItem('routines', JSON.stringify(existingRoutines));

    console.log(
      'Routine saved to local storage. Lifts in routine: ' +
        this.selectedLifts.length
    );
  }

  onBodyPartSelected(): void {
    if (this.selectedBodyPart) {
      this.apiService
        .getLiftsByMuscle(this.selectedBodyPart.toLowerCase())
        .subscribe((data: Lift[]) => {
          this.lifts = data;
        });
      console.log(this.selectedBodyPart);
    }
  }

  onEquipmentSelected(): void {
    if (this.selectedEquipment) {
      this.apiService
        .getLiftsByEquipment(this.selectedEquipment.toLowerCase())
        .subscribe((data: Lift[]) => {
          this.lifts = data;
          console.log(this.lifts);
        });
    }
  }

  navigateToLift(id: number) {
    this.router.navigate(['/lift', id]);
  }
}
