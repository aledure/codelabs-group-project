import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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
    const storedLifts = localStorage.getItem('lifts');

    if (storedLifts) {
      // Data is present in local storage, return it as an Observable
      return of(JSON.parse(storedLifts));
    } else {
      // Data is not present in local storage, make the API call
      return this.http
        .get<Lift[]>(
          `https://${this.apiUrl}/exercises?offset=0&limit=500`,
          this.getHeaders()
        )
        .pipe(
          tap((lifts) => {
            // Save the API response to local storage
            localStorage.setItem('lifts', JSON.stringify(lifts));
          }),
          catchError((error) => {
            console.error('Error fetching lifts:', error);
            return of([] as Lift[]);
          })
        );
    }
  }
}
