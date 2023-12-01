import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lift } from '../models/lift.model';
import { environment } from '../environments/environment';

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
      `https://${this.apiUrl}/exercises?offset=0&limit=5`,
      this.getHeaders()
    );
  }
}
