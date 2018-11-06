import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { of, Observable } from 'rxjs'
import { User } from '../models/user.model'
import { map, catchError } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: User
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    console.log(email, password)
    return this.http.post('api/users/login', { email, password }).pipe(
      map(user => {
        console.log(user)
        // TODO: hook up backend

        this._user = {
          email: email,
          userId: Math.round(Math.random() * 10000000).toString(),
        }
        return this._user
      }),
      catchError(() => {
        console.log('I got here')
        return of(null)
      })
    )
  }
  signup(email: string, password: string, birthdate: Date) {
    this._user = {
      email: email,
      userId: Math.round(Math.random() * 10000000).toString(),
    }
  }

  logout() {
    this._user = null
  }

  checkUniqueEmail(email: string): Observable<boolean> {
    /// TODO setup backend
    const rand = Math.floor(Math.random() * 5)
    if (rand < 1) {
      return of(false)
    }
    return of(true)
  }

  get user() {
    return this.user
  }

  get isAuth() {
    return this._user !== null
  }
}
