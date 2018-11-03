import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { of, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(http: HttpClient) {}

  login(email: string, password: string) {}
  signup(email: string, password: string) {}

  checkUniqueEmail(email: string): Observable<boolean> {
    /// TODO setup backend
    const rand = Math.floor(Math.random() * 5)
    if (rand <= 2) {
      return of(false)
    }
    return of(true)
  }
}
