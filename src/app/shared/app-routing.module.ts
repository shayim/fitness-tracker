import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { WelcomeComponent } from '../home/welcome/welcome.component'

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: '../training/training.module#TrainingModule' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
