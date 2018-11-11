import { Action } from '@ngrx/store'
import { Exercise } from './../models/exercise'

export enum TrainingActionTypes {
  Add = '[Traing] Add New Exercise',
  Start = '[Training] Start Exercises',
  Completed = '[Training] Completed Exercises',
  Stop = '[Training] Stop Exercises',
  Pause = '[Training] Pause Exercises',
  Load = '[Training] Load Exercises',
  LoadSuccess = '[Training] Load Exercises Sucess',
  LoadFailue = '[Training] Load Exercises Failure',
  SaveFinished = '[Training] Save Finished Exercises',
  SaveFinishedSuccess = '[Training] Save Finished Exercises Success',
}

export class AddNewExercise implements Action {
  readonly type = TrainingActionTypes.Add
  constructor(public exercise: Exercise) {}
}

export class StartExercises implements Action {
  readonly type = TrainingActionTypes.Start
}

export class CompletedExercise implements Action {
  readonly type = TrainingActionTypes.Completed
  constructor(public completedExercise: Exercise) {}
}

export class StopExercises implements Action {
  readonly type = TrainingActionTypes.Stop
  constructor(public progress: number) {}
}

export class PauseExercises implements Action {
  readonly type = TrainingActionTypes.Pause
}

export class Load implements Action {
  readonly type = TrainingActionTypes.Load
}

export class LoadSuccess implements Action {
  readonly type = TrainingActionTypes.LoadSuccess
  constructor(public exercises: Exercise[]) {}
}

export class LoadFailue implements Action {
  readonly type = TrainingActionTypes.LoadFailue
}

export class SaveFinished implements Action {
  readonly type = TrainingActionTypes.SaveFinished
}

export class SaveFinishedSuccess implements Action {
  readonly type = TrainingActionTypes.SaveFinishedSuccess
  constructor(public ids: string[]) {}
}

export type TrainingActions =
  | AddNewExercise
  | StartExercises
  | CompletedExercise
  | StopExercises
  | PauseExercises
  | Load
  | LoadSuccess
  | LoadFailue
  | SaveFinished
  | SaveFinishedSuccess
