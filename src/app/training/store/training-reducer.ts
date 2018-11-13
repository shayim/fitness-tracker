import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Exercise } from '../models/exercise'
import { TrainingActions, TrainingActionTypes } from './training-actions'

export interface State {
  exercises: Exercise[]
  current: Exercise
  new: Exercise[]
  finished: Exercise[]
  past: Exercise[]
  trainingStatus: boolean
}

export const INITIAL_STATE: State = {
  exercises: [],
  current: undefined,
  new: [],
  finished: [],
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
      const startState = {
        ...state,
        current: state.new.length > 0 ? { ...state.new[0] } : undefined,
        new: state.new.length > 0 ? state.new.slice(1) : [],
        trainingStatus: true,
      }
      return startState

    case TrainingActionTypes.Completed:
      return {
        ...state,
        current: undefined,
        finished: [...state.finished, action.completedExercise],
        trainingStatus: false,
      }

    case TrainingActionTypes.Stop:
      const stopState: State = {
        ...state,
        trainingStatus: false,
        new: [],
        current: undefined,
      }
      if (state.current) {
        const currentExe = {
          ...state.current,
          state: 'cancelled',
          duration: (state.current.duration * action.progress) / 100,
          calories: (state.current.calories * action.progress) / 100,
          date: new Date(),
        } as Exercise
        stopState.finished = [...stopState.finished, currentExe]
      }
      if (state.new.length > 0) {
        const news = state.new.map(
          e =>
            ({
              ...e,
              calories: 0,
              duration: 0,
              state: 'cancelled',
              date: new Date(),
            } as Exercise)
        )
        stopState.past = [...stopState.past, ...news]
        stopState.finished = [...stopState.finished, ...news]
      }

      return stopState

    case TrainingActionTypes.SaveFinishedSuccess:
      let finished = state.finished
      if (action.ids.length > 0) {
        action.ids.forEach(id => (finished = finished.filter(e => e.id !== id)))
      }
      return {
        ...state,
        finished: finished,
      }

    case TrainingActionTypes.LoadSelectionsSuccess:
      return {
        ...state,
        exercises: [...action.selections],
      }

    case TrainingActionTypes.LoadPastSuccess:
      return {
        ...state,
        past: [...action.pastExercises],
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

export const selectFinishedTraining = createSelector(
  selectTrainingState,
  (state: State) => state.finished
)

export const selectPastTraining = createSelector(
  selectTrainingState,
  (state: State) => state.past
)

export const selectTrainingStatus = createSelector(
  selectTrainingState,
  (state: State) => state.trainingStatus
)
