import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../auth/services/auth.guard'
import { CurrentTrainingComponent } from './current-training/current-training.component'
import { NewTrainingComponent } from './new-training/new-training.component'
import { PastTrainingComponent } from './past-training/past-training.component'
import { TrainingComponent } from './training.component'

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'new', pathMatch: 'full' },
      { path: 'past', component: PastTrainingComponent },
      { path: 'new', component: NewTrainingComponent },
      { path: 'current', component: CurrentTrainingComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
