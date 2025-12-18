
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface WorkoutLog {
  id: string;
  planId: string;
  planName: string;
  date: string;
  exercises: Exercise[];
  totalVolume: number;
}

export type View = 'plans' | 'workout' | 'history' | 'insights';
