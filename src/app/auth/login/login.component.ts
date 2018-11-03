import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrls: [`./login.component.sass`],
})
export class LoginComponent implements OnInit {
  isSignup = false

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url
      .pipe(map(urls => urls[0].path))
      .subscribe(path => (this.isSignup = path.indexOf('signup') !== -1))
  }

  login(inputs) {
    console.log(inputs)

    if (inputs.email === null || inputs.password === null) {
      return
    }

    if (this.isSignup) {
      this.auth.signup(inputs.email, inputs.password)
    }

    this.auth.login(inputs.email, inputs.password)
  }

  toggle() {
    if (this.isSignup) {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/signup'])
    }
  }
}