import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { GetAuth, Logout } from './auth/store/auth-actions'
import { selectUser } from './auth/store/auth-reducer'
import { selectLoadingStatus } from './loading-status.reducer'

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  user$: Observable<any>
  loadingStatus: boolean
  constructor(private store: Store<any>) {
    this.user$ = this.store.select(selectUser)

    this.store
      .select(selectLoadingStatus)
      .subscribe(status => setTimeout(() => (this.loadingStatus = status)))
  }

  ngOnInit() {
    this.store.dispatch(new GetAuth())
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
