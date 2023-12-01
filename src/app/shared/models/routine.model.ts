import { Lift } from './lift.model';

export class Routine {
  name: string;
  lifts: Lift[];
  description: string;
  restDuration: number;
  userId: string;

  constructor(
    name: string,
    lifts: Lift[],
    description: string,
    restDuration: number,
    userId: string
  ) {
    this.name = name;
    this.lifts = lifts;
    this.description = description;
    this.restDuration = restDuration;
    this.userId = userId;
  }
}
