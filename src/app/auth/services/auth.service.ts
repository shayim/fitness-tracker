import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from '../models/user.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: User
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('api/users/login', { email, password }).pipe(
      map(user => {
        // TODO: hook up backend

        this._user = {
          email: email,
          userId: Math.round(Math.random() * 10000000).toString(),
        }
        return this._user
      })
    )
  }
  signup(email: string, password: string, birthdate: Date) {
    return this.http.post('api/users/signup', { email, password, birthdate }).pipe(
      map(user => {
        // TODO: hook up backend

        this._user = {
          email: email,
          userId: Math.round(Math.random() * 10000000).toString(),
        }

        return this._user
      })
    )
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
}
