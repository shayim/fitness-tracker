import { Action } from '@ngrx/store'
import { Exercise } from './../models/exercise'

export enum TrainingActionTypes {
  Add = '[Traing] Add New Exercise',
  Start = '[Training] Start Exercises',
  Completed = '[Training] Completed Exercises',
  Stop = '[Training] Stop Exercises',
  Pause = '[Training] Pause Exercises',
  LoadSelections = '[Training] Load Exercise Selections',
  LoadSelectionsSuccess = '[Training] Load Exercise Selections Sucess',
  LoadSelectionsFailure = '[Training] Load Exercises Failure',
  SaveFinished = '[Training] Save Finished Exercises',
  SaveFinishedSuccess = '[Training] Save Finished Exercises Success',
  SaveFinishedFailure = '[Training] Save Finished Exercises Failure',
  LoadPast = '[Training] Load Past Exercises',
  LoadPastSuccess = '[Training] Load Past Exercises Success',
  LoadPastFailure = '[Training] Load Past Exercises Failure',
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

export class LoadSelections implements Action {
  readonly type = TrainingActionTypes.LoadSelections
}

export class LoadSelectionsSuccess implements Action {
  readonly type = TrainingActionTypes.LoadSelectionsSuccess
  constructor(public selections: Exercise[]) {}
}

export class LoadSelectionsFailure implements Action {
  readonly type = TrainingActionTypes.LoadSelectionsFailure
  constructor(public error: any) {}
}

export class SaveFinished implements Action {
  readonly type = TrainingActionTypes.SaveFinished
}

export class SaveFinishedSuccess implements Action {
  readonly type = TrainingActionTypes.SaveFinishedSuccess
  constructor(public ids: string[]) {}
}

export class SaveFinishedFailure implements Action {
  readonly type = TrainingActionTypes.SaveFinishedFailure
  constructor(public error: any) {}
}

export class LoadPast implements Action {
  readonly type = TrainingActionTypes.LoadPast
}

export class LoadPastSuccess implements Action {
  readonly type = TrainingActionTypes.LoadPastSuccess
  constructor(public pastExercises: Exercise[]) {}
}

export class LoadPastFailure implements Action {
  readonly type = TrainingActionTypes.LoadPastFailure
  constructor(public error: any) {}
}

export type TrainingActions =
  | AddNewExercise
  | StartExercises
  | CompletedExercise
  | StopExercises
  | PauseExercises
  | LoadSelections
  | LoadSelectionsSuccess
  | LoadSelectionsFailure
  | SaveFinished
  | SaveFinishedSuccess
  | LoadPast
  | LoadPastSuccess
  | LoadPastFailure
