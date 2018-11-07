import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Logout, GetAuth } from './auth/store/auth-actions'
import { selectUser } from './auth/store/auth-reducer'

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  user$: Observable<any>
  constructor(private store: Store<any>) {
    this.user$ = this.store.select(selectUser)
  }

  ngOnInit() {
    this.store.dispatch(new GetAuth())
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
