import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Lift } from '../models/lift.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  // Fetches api url & api key from environment file
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'x-rapidapi-host': this.apiUrl,
        'x-rapidapi-key': this.apiKey,
      }),
    };
  }

  getAllLifts(): Observable<Lift[]> {
    // Specify the return type as an array of Lift
    return this.http.get<Lift[]>(
      `https://${this.apiUrl}/exercises?offset=0&limit=20`,
      this.getHeaders()
    );
  }

  getLiftsByMuscle(bodyPart: string): Observable<Lift[]> {
    return this.http.get<Lift[]>(
      `https://${this.apiUrl}/exercises/bodyPart/${bodyPart}?offset=0&limit=20`,
      this.getHeaders()
    );
  }

  getLiftsByEquipment(equipment: string): Observable<Lift[]> {
    return this.http.get<Lift[]>(
      `https://${this.apiUrl}/exercises/equipment/${equipment}?offset=0&limit=20`,
      this.getHeaders()
    );
  }
}
