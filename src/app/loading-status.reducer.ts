import { Action, createFeatureSelector, createSelector } from '@ngrx/store'

export enum LoadingStatusActionTypes {
  Loading = '[Loading Status] Loading',
  Loaded = '[Loading Status] Loaded',
}

export class Loading implements Action {
  readonly type = LoadingStatusActionTypes.Loading
}

export class Loaded implements Action {
  readonly type = LoadingStatusActionTypes.Loaded
}

export interface State {
  status: boolean
}

const INITIAL_STATE: State = {
  status: false,
}

export const reducer = function(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case LoadingStatusActionTypes.Loaded:
      return { status: false }
    case LoadingStatusActionTypes.Loading:
      return { status: true }
    default:
      return state
  }
}

export const selectLoadingState = createFeatureSelector<any, State>('loading')
export const selectLoadingStatus = createSelector(
  selectLoadingState,
  loading => loading.status
)
