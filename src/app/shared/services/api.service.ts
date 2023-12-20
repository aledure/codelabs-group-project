import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Lift } from '../models/lift.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private cache = new Map<string, any>();

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
    const cacheKey = 'allLifts';

    // If data is available in the cache, return it
    if (this.cache.has(cacheKey)) {
      console.log('Returning cached data:', this.cache.get(cacheKey));
      return of(this.cache.get(cacheKey));
    } else {
      // If data is not in the cache, make an API request
      return this.http
        .get<Lift[]>(
          `https://${this.apiUrl}/exercises?offset=0&limit=1000`,
          this.getHeaders()
        )
        .pipe(
          tap((data) => {
            this.cache.set(cacheKey, data);
          }),
          catchError((error) => {
            console.error('Error fetching data from API:', error);
            return of([]);
          })
        );
    }
  }

  getLiftDetails(id: string): Observable<Lift> {
    const cacheKey = `lift-${id}`;
    // If data is available in the cache, return it

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    } else {
      return this.http
        .get<Lift>(
          `https://${this.apiUrl}/exercises/exercise/${id}`,
          this.getHeaders()
        )
        .pipe(
          tap((data) => {
            console.log(id);
            console.log('Data from API:', data);
            this.cache.set(cacheKey, data);
          }),
          catchError((error) => {
            console.error('Error fetching data from API:', error);
            return of({} as Lift);
          })
        );
    }
  }

  getLiftsByMuscle(bodyPart: string): Observable<Lift[]> {
    return this.http.get<Lift[]>(
      `https://${this.apiUrl}/exercises/bodyPart/${bodyPart}?offset=0&limit=100`,
      this.getHeaders()
    );
  }

  getLiftsByEquipment(equipment: string): Observable<Lift[]> {
    return this.http.get<Lift[]>(
      `https://${this.apiUrl}/exercises/equipment/${equipment}?offset=0&limit=100`,
      this.getHeaders()
    );
  }

  getLiftById(id: number): Observable<Lift> {
    return this.http.get<Lift>(
      `https://${this.apiUrl}/exercises/exercise/${id}`,
      this.getHeaders()
    );
  }
}
