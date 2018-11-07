import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Logout } from './auth/store/auth-actions'

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  user$: Observable<any>
  constructor(private store: Store<any>) {
    this.user$ = this.store.select('auth').pipe(select(state => state.auth.user))
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
