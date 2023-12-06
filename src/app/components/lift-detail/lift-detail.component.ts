import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lift } from 'src/app/shared/models/lift.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-lift-detail',
  templateUrl: './lift-detail.component.html',
  styleUrls: ['./lift-detail.component.scss'],
})
export class LiftDetailComponent implements OnInit {
  liftId: number;
  liftDetails: any; // Adjust the type based on your lift data model

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idOrName = params.get('id');
      console.log('id or name:', idOrName);

      if (idOrName) {
        const id = Number(idOrName); // Convert idOrName to a number
        this.apiService.getLiftDetails(id).subscribe(
          (data: Lift) => {
            this.liftDetails = data;
          },
          (error: any) => {
            console.error('Error fetching lift details:', error);
          }
        );
      }
    });
  }
}
