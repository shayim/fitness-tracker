import { IExercise } from '../models/exercise'
import { TrainingActions, TrainingActionTypes } from './training-actions'

export interface State {
  exercises: IExercise[]
  current: IExercise[]
  past: IExercise[]
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
      }
    case TrainingActionTypes.Start:
      return {
        ...state,
        trainingStatus: true,
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
