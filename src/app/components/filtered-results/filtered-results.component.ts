import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Lift } from '../../shared/models/lift.model';

@Component({
  selector: 'app-filtered-results',
  templateUrl: './filtered-results.component.html',
  styleUrls: ['./filtered-results.component.scss'],
})
export class FilteredResultsComponent {
  lifts: Lift[] = [];

  constructor(private apiService: ApiService) {}

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
}
