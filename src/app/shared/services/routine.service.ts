import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  localStorageKey = 'routines';

  getRoutines(): any[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  addRoutine(routine: any): void {
    const routines = this.getRoutines();
    routines.push(routine);
    localStorage.setItem(this.localStorageKey, JSON.stringify(routines));
  }

  updateRoutine(routine: any): void {
    const routines = this.getRoutines();
    const index = routines.findIndex((r) => r.id === routine.id);
    routines[index] = routine;
    localStorage.setItem(this.localStorageKey, JSON.stringify(routines));
  }

  deleteRoutine(routine: any): void {
    const routines = this.getRoutines();
    const index = routines.findIndex((r) => r.id === routine.id);
    routines.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(routines));
  }
}
