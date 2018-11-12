import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { selectUser } from './../store/auth-reducer'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(selectUser).pipe(
      map((user: any) => {
        if (user === null) {
          this.router.navigate(['/'])
        } else {
          return user !== null
        }
      })
    )
  }
}
