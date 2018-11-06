import { Action } from '@ngrx/store'

import { IExercise } from './../models/exercise'

export enum TrainingActionTypes {
  Add = '[Traing] Add New Exercise',
  Start = '[Training] Start Exercises',
  Stop = '[Training] Stop Exercises',
  Pause = '[Training] Pause Exercises',
}

export class AddNewExercise implements Action {
  readonly type = TrainingActionTypes.Add
  constructor(public exercise: IExercise) {}
}

export class StartExercises implements Action {
  readonly type = TrainingActionTypes.Start
}

export class StopExercises implements Action {
  readonly type = TrainingActionTypes.Stop
}

export class PauseExercises implements Action {
  readonly type = TrainingActionTypes.Pause
}

export type TrainingActions =
  | AddNewExercise
  | StartExercises
  | StopExercises
  | PauseExercises
