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
    this.getLifts().subscribe((lifts) => {
      this.lifts = lifts;
    });
  }

  getLifts() {
    return this.apiService.getAllLifts();
  }
}
