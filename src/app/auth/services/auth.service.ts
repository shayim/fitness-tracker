import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { Store } from '@ngrx/store'
import { AngularFireAuth } from 'angularfire2/auth'
import { from, Observable, of } from 'rxjs'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'
import { Loaded, Loading } from 'src/app/loading-status.reducer'
import { User } from '../models/user.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private localStorageUserKey = '_user'

  constructor(
    private http: HttpClient,
    private afa: AngularFireAuth,
    private store: Store<any>
  ) {}

  loginByAngularFireAuth(email: string, password: string) {
    if (this.user) {
      return of(this.user)
    }
    let userId = ''
    this.store.dispatch(new Loading())
    return from(this.afa.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => this.store.dispatch(new Loaded())),
      map(loginResult => {
        userId = loginResult.user.uid
        return from(loginResult.user.getIdTokenResult(true))
      }),
      mergeMap(result => result),
      map(result => {
        const expiredAt = new Date(result.expirationTime).setMilliseconds(0)
        const user: User = {
          email: email,
          userId: userId,
          token: result.token,
          expiredAt: expiredAt,
        }
        this.validateAndSave(user)
        return user
      }),

      catchError(error => {
        this.store.dispatch(new Loaded())
        // TODO error handling
        console.log(error)
        throw error
      })
    )
  }

  signupByAngularFireAuth(email: string, password: string, birthdate: Date) {
    let userId = ''
    this.store.dispatch(new Loading())
    return from(this.afa.auth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(() => this.store.dispatch(new Loaded())),
      map(signupResult => {
        userId = signupResult.user.uid
        return from(signupResult.user.getIdTokenResult(true))
      }),
      mergeMap(result => result),
      map(result => {
        const expiredAt = new Date(result.expirationTime).setMilliseconds(0)
        const user: User = {
          email: email,
          userId: userId,
          token: result.token,
          expiredAt: expiredAt,
        }
        this.validateAndSave(user)
        return user
      }),

      catchError(error => {
        this.store.dispatch(new Loaded())
        // TODO error handling
        console.log(error)
        throw error
      })
    )
  }

  logout() {
    this.afa.auth.signOut()
    localStorage.removeItem(this.localStorageUserKey)
  }

  checkUniqueEmail(email: string): Observable<boolean> {
    /// TODO setup backend
    const rand = Math.floor(Math.random() * 5)
    if (rand < 0) {
      return of(false)
    }
    return of(true)
  }

  private validateAndSave(user: User) {
    if (user.userId && user.email && user.token && user.expiredAt) {
      localStorage.setItem(this.localStorageUserKey, JSON.stringify(user))
    } else {
      throw new Error('invalidate user')
    }
  }

  get user() {
    const userJson = localStorage.getItem(this.localStorageUserKey)

    if (userJson !== null) {
      try {
        const user: any = JSON.parse(userJson)
        if (+user.expiredAt > Date.now()) {
          return { ...user, expiredAt: +user.expiredAt }
        } else {
          localStorage.removeItem(this.localStorageUserKey)
        }
      } catch (error) {
        // TODO
        console.log(error)
        localStorage.removeItem(this.localStorageUserKey)
        return null
      }
    }

    return null
  }
}
