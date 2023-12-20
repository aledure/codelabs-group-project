import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lift } from '../models/lift.model';

@Injectable({
  providedIn: 'root',
})
export class LiftService {
  private lift: Lift[] = [];
  localStorageKey = 'lifts';
  private liftSelectedSource = new Subject<Lift>();

  liftSelected$ = this.liftSelectedSource.asObservable();

  selectLift(lift: Lift): void {
    this.liftSelectedSource.next(lift);
    this.lift.push(lift);
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('lift', JSON.stringify(this.lift));
  }
}
