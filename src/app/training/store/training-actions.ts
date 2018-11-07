import { Action } from '@ngrx/store'
import { IExercise } from './../models/exercise'

export enum TrainingActionTypes {
  Add = '[Traing] Add New Exercise',
  Start = '[Training] Start Exercises',
  Stop = '[Training] Stop Exercises',
  Pause = '[Training] Pause Exercises',
  Load = '[Training] Load Exercises',
  LoadSuccess = '[Training] Load Exercises Sucess',
  LoadFailue = '[Training] Load Exercises Failure',
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

export class Load implements Action {
  readonly type = TrainingActionTypes.Load
}

export class LoadSuccess implements Action {
  readonly type = TrainingActionTypes.LoadSuccess
  constructor(public exercises: IExercise[]) {}
}

export class LoadFailue implements Action {
  readonly type = TrainingActionTypes.LoadFailue
}

export type TrainingActions =
  | AddNewExercise
  | StartExercises
  | StopExercises
  | PauseExercises
  | Load
  | LoadSuccess
  | LoadFailue
