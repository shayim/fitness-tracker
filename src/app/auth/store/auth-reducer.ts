import { AuthActions, AuthActionTypes } from './auth-actions'
import { User } from '../models/user.model'

export interface State {
  user: User
}

export const INITIAL_STATE: State = {
  user: null,
}

export const reducer = function(state: State = INITIAL_STATE, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      const user: User = { email: action.email, userId: action.userId }
      return {
        user: user,
      }

    case AuthActionTypes.Logout:
      return {
        user: null,
      }

    default:
      return state
  }
}
