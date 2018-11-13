import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/services/auth.guard'
import { WelcomeComponent } from '../home/welcome/welcome.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: '../training/training.module#TrainingModule',
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
