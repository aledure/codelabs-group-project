import { Injectable } from '@angular/core';
import { Lift } from '../models/lift.model';
import { Subject } from 'rxjs';
import { Routine } from '../models/routine.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  localStorageKey = 'routines';
  private routine: Routine[] = [];
  public lifts: Lift[] = [];

  public liftSelectedSource = new Subject<Lift>();

  liftSelected$ = this.liftSelectedSource.asObservable();

  getRoutineById(id: number): Observable<Routine> {
    const routinesString = localStorage.getItem(this.localStorageKey);
    const routines = routinesString ? JSON.parse(routinesString) : {};
    const routine = routines[id];
    return of(routine);
  }

  selectLift(lift: Lift): void {
    this.liftSelectedSource.next(lift);
    this.lifts.push(lift);
    this.updateLocalStorage();
    console.log(
      lift.name +
        ' has been added to your routine. ' +
        this.lifts.length +
        ' lifts in routine.'
    );
  }

  private updateLocalStorage(): void {
    localStorage.setItem('routine', JSON.stringify(this.routine));
    console.log();
  }
}
