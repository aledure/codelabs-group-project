export class Lift {
  name: string;
  id: number;
  sets?: number;
  reps?: number;
  bodyPart: string;
  equipment: string;
  gifUrl?: string;
  instructions?: string;

  constructor(
    name: string,
    id: number,
    sets: number,
    reps: number,
    bodyPart: string,
    equipment: string,
    gifUrl: string,
    instructions: string
  ) {
    this.name = name;
    this.id = id;
    this.sets = sets;
    this.reps = reps;
    this.bodyPart = bodyPart;
    this.equipment = equipment;
    this.gifUrl = gifUrl;
    this.instructions = instructions;
  }
}
