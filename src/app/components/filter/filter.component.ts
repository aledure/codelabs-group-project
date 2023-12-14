import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Lift } from '../../shared/models/lift.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutineService } from 'src/app/shared/services/routine.service';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  lifts: Lift[] = [];
  selectedBodyPart: string = '';
  selectedEquipment: string = '';
  liftsList: any[] = [];
  searchQuery: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private routineService: RoutineService
  ) {}

  ngOnInit() {
    this.fetchLiftsData();
  }

  fetchLiftsData() {
    this.apiService.getAllLifts().subscribe(
      (data) => {
        this.lifts = data;
        console.log(this.lifts);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
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
