import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import { Login, Signup } from '../store/auth-actions'

@Component({
  templateUrl: `./login.component.html`,
  styleUrls: [`./login.component.sass`],
})
export class LoginComponent implements OnInit {
  isSignup = true
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

  constructor(
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url
      .pipe(map(urls => urls[0].path))
      .subscribe(path => (this.isSignup = path.indexOf('signup') !== -1))
  }

  login(inputs) {
    if (this.isSignup) {
      this.store.dispatch(
        new Signup(inputs.email, inputs.password, inputs.birthdate.toDate())
      )
    } else {
      this.store.dispatch(new Login(inputs.email, inputs.password))
    }
  }

  toggle() {
    if (this.isSignup) {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/signup'])
    }
  }
}
