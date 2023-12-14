interface Lift {
  name: string;
  sets: number;
  reps: number;
}

interface Routine {
  id: number;
  lifts: Lift[];
  restDuration: number;
  dayOfWeek: string;
}

const routines: Routine[] = [
  {
    id: 1,
    lifts: [
      { name: 'Squat', sets: 3, reps: 8 },
      { name: 'Bench Press', sets: 3, reps: 8 },
      { name: 'Deadlift', sets: 3, reps: 8 },
    ],
    restDuration: 60,
    dayOfWeek: 'Monday',
  },
  {
    id: 2,
    lifts: [
      { name: 'Overhead Press', sets: 3, reps: 8 },
      { name: 'Barbell Row', sets: 3, reps: 8 },
      { name: 'Pull-ups', sets: 3, reps: 8 },
    ],
    restDuration: 45,
    dayOfWeek: 'Wednesday',
  },
  {
    id: 3,
    lifts: [
      { name: 'Lunges', sets: 3, reps: 8 },
      { name: 'Dumbbell Press', sets: 3, reps: 8 },
      { name: 'Hamstring Curls', sets: 3, reps: 8 },
    ],
    restDuration: 75,
    dayOfWeek: 'Friday',
  },
];

export default routines;
