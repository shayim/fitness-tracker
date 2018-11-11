import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from '../models/user.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private localStorageUserKey = '_user'

  private mockUser = {
    email: 'a@a',
    userId: Math.round(Math.random() * 10000000).toString(),
    token: 'eyabcdefgh',
    expiredAt: new Date().setMinutes(new Date().getMinutes() + 30),
  }

  // private _user: User

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    if (this.user) {
      return of(this.user)
    }

    return this.http.post('api/users/login', { email, password }).pipe(
      map(user => {
        // TODO: hook up backend

        this.validateAndSave(this.mockUser)

        return this.mockUser
      })
    )
  }
  signup(email: string, password: string, birthdate: Date) {
    return this.http.post('api/users/signup', { email, password, birthdate }).pipe(
      map(user => {
        // TODO: hook up backend

        this.validateAndSave(this.mockUser)

        return this.mockUser
      })
    )
  }

  logout() {
    localStorage.removeItem(this.localStorageUserKey)
  }

  checkUniqueEmail(email: string): Observable<boolean> {
    /// TODO setup backend
    const rand = Math.floor(Math.random() * 5)
    if (rand < 1) {
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
