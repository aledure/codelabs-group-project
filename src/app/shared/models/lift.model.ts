export class Lift {
  name: string;
  sets?: number;
  reps?: number;
  bodyPart: string;
  equipment: string;
  gifUrl?: string;

  constructor(
    name: string,
    sets: number,
    reps: number,
    bodyPart: string,
    equipment: string,
    gifUrl: string
  ) {
    this.name = name;
    this.sets = sets;
    this.reps = reps;
    this.bodyPart = bodyPart;
    this.equipment = equipment;
    this.gifUrl = gifUrl;
  }
}
