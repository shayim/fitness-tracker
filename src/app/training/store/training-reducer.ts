import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Exercise } from '../models/exercise'
import { TrainingActions, TrainingActionTypes } from './training-actions'

export interface State {
  exercises: Exercise[]
  current: Exercise[]
  past: Exercise[]
  trainingStatus: boolean
}

export const INITIAL_STATE: State = {
  exercises: [],
  current: [],
  past: [],
  trainingStatus: false,
}

export const reducer = function(
  state: State = INITIAL_STATE,
  action: TrainingActions
): State {
  switch (action.type) {
    case TrainingActionTypes.Add:
      return {
        ...state,
        current: [...state.current, action.exercise],
        exercises: state.exercises.filter(e => e.id !== action.exercise.id),
      }
    case TrainingActionTypes.Start:
      return {
        ...state,
        trainingStatus: true,
      }
    case TrainingActionTypes.Completed:
      return {
        ...state,
        past: [...state.past, action.completedExercise],
        current: state.current.filter(e => e.id !== action.completedExercise.id),
      }
    case TrainingActionTypes.Stop:
      return {
        ...state,
        current: [],
        past: [...state.past, ...state.current],
        trainingStatus: false,
      }
    case TrainingActionTypes.Pause:
      return {
        ...state,
        trainingStatus: false,
      }
    case TrainingActionTypes.LoadSuccess:
      return {
        ...state,
        exercises: [...action.exercises],
      }
    default:
      return state
  }
}

const selectTrainingState = createFeatureSelector<any, State>('training')

export const selectTrainingExercises = createSelector(
  selectTrainingState,
  (state: State) => state.exercises
)

export const selectCurrentTraining = createSelector(
  selectTrainingState,
  (state: State) => state.current
)
export const selectPastTraining = createSelector(
  selectTrainingState,
  (state: State) => state.past
)

export const selectTrainingStatus = createSelector(
  selectTrainingState,
  (state: State) => state.trainingStatus
)
