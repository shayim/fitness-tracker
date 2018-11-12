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

  // private mockUser = {
  //   email: 'a@a',
  //   userId: Math.round(Math.random() * 10000000).toString(),
  //   token: 'eyabcdefgh',
  //   expiredAt: new Date().setMinutes(new Date().getMinutes() + 30),
  // }

  constructor(
    private http: HttpClient,
    private afa: AngularFireAuth,
    private snackBar: MatSnackBar,
    private store: Store<any>
  ) {}

  // login(email: string, password: string): Observable<any> {
  //   if (this.user) {
  //     return of(this.user)
  //   }

  //   return this.http.post('api/users/login', { email, password }).pipe(
  //     map(user => {
  //       // TODO: hook up backend

  //       this.validateAndSave(this.mockUser)

  //       return this.mockUser
  //     })
  //   )
  // }

  // signup(email: string, password: string, birthdate: Date) {
  //   return this.http.post('api/users/signup', { email, password, birthdate }).pipe(
  //     map(user => {
  //       // TODO: hook up backend

  //       this.validateAndSave(this.mockUser)

  //       return this.mockUser
  //     })
  //   )
  // }

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
        // TODO error handling
        console.log(error)
        this.snackBar.open(error.message, null, {
          duration: 5000,
        })
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
        // TODO error handling
        console.log(error)
        this.snackBar.open(error.message, null, { duration: 5000 })
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
