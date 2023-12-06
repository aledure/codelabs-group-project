import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Lift } from '../../shared/models/lift.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  lifts: Lift[] = [];
  selectedBodyPart: string = '';
  selectedEquipment: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchLiftsData();
  }

  fetchLiftsData() {
    this.apiService.getAllLifts().subscribe(
      (data) => {
        this.lifts = data; // Store the fetched data in the property
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

  navigateToLift(id: number): void {
    this.router.navigate(['/lift', id]);
  }
}
