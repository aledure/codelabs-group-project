import { Lift } from './lift.model';

export class Routine {
  id: string;
  name: string;
  lifts: Lift[];
  description: string;
  restDuration: number;
  userId: string;

  constructor(
    id: string,
    name: string,
    lifts: Lift[],
    description: string,
    restDuration: number,
    userId: string
  ) {
    this.id = id;
    this.name = name;
    this.lifts = lifts;
    this.description = description;
    this.restDuration = restDuration;
    this.userId = userId;
  }
}
