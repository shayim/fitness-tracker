import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Exercise } from '../models/exercise'
import { TrainingActions, TrainingActionTypes } from './training-actions'

export interface State {
  exercises: Exercise[]
  current: Exercise
  new: Exercise[]
  past: Exercise[]
  trainingStatus: boolean
}

export const INITIAL_STATE: State = {
  exercises: [],
  current: undefined,
  new: [],
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
        new: [...state.new, action.exercise],
        exercises: state.exercises.filter(e => e.id !== action.exercise.id),
      }
    case TrainingActionTypes.Start:
      return {
        ...state,
        current: { ...state.new[0] },
        new: state.new.slice(1),
        trainingStatus: true,
      }
    case TrainingActionTypes.Completed:
      return {
        ...state,
        current: undefined,
        past: [...state.past, action.completedExercise],
        trainingStatus: false,
      }
    case TrainingActionTypes.Stop:
      const newState: State = {
        ...state,
        trainingStatus: false,
        new: [],
        current: undefined,
      }
      if (state.current) {
        newState.past = [
          ...newState.past,
          {
            ...state.current,
            state: 'cancelled',
            duration: (state.current.duration * action.progress) / 100,
            calories: (state.current.calories * action.progress) / 100,
            date: new Date(),
          },
        ]
      }
      if (state.new.length > 0) {
        newState.past = [
          ...newState.past,
          ...[...state.new].map(
            e =>
              ({
                ...e,
                calories: 0,
                state: 'cancelled',
              } as Exercise)
          ),
        ]
      }
      return newState
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

export const selectNewTraining = createSelector(
  selectTrainingState,
  (state: State) => state.new
)
export const selectPastTraining = createSelector(
  selectTrainingState,
  (state: State) => state.past
)

export const selectTrainingStatus = createSelector(
  selectTrainingState,
  (state: State) => state.trainingStatus
)
