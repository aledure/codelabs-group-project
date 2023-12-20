import { Lift } from './lift.model';

export class Routine {
  name: string;
  lift: Lift[];
  description: string;
  restDuration: number;
  userId: string;

  constructor(
    name: string,
    lift: Lift[],
    description: string,
    restDuration: number,
    userId: string
  ) {
    this.name = name;
    this.lift = lift;
    this.description = description;
    this.restDuration = restDuration;
    this.userId = userId;
  }
}
