import { AuthActionTypes, Login, LoginSuccess, LoginFailure } from './auth-actions'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'

import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { AuthService } from '../services/auth.service'
import { User } from '../models/user.model'

@Injectable()
export class AuthEffects {
  constructor(private auth: AuthService, private actions$: Actions) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      tap(action => console.log(action.type)),
    mergeMap((action: Login) =>
      this.auth.login(action.email, action.password).pipe(
        tap(user => console.log(user)),
        map((user: User) => new LoginSuccess(user.email, user.userId)),
        catchError(error => {

          // TODO error handling
          console.log(error)
          return of(new LoginFailure())
        }))
      )
    )
  )
}
