import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap, tap, filter } from 'rxjs/operators'
import { User } from '../models/user.model'
import { AuthService } from '../services/auth.service'
import { AuthActionTypes, Login, LoginFailure, LoginSuccess } from './auth-actions'

@Injectable()
export class AuthEffects {
  constructor(
    private auth: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  @Effect()
  GetAuth$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.GetAuth),
    map(() => this.auth.user),
    filter(user => user !== null),
    map((user: User) => {
      this.router.navigate(['/training'])
      return new LoginSuccess(user.email, user.userId, user.token, user.expiredAt)
    })
  )

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    switchMap((action: Login) =>
      this.auth.login(action.email, action.password).pipe(
        map((user: User) => {
          this.router.navigate(['/training'])
          return new LoginSuccess(user.email, user.userId, user.token, user.expiredAt)
        }),
        catchError(error => {
          // TODO error handling
          console.log(error)
          return of(new LoginFailure())
        })
      )
    )
  )

  @Effect({ dispatch: false })
  $logout = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => {
      this.auth.logout()
      this.router.navigate(['/'])
    })
  )
}
