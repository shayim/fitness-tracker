import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { LoginComponent } from './login/login.component'

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
