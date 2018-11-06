import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { TrainingComponent } from './training.component'
import { PastTrainingComponent } from './past-training/past-training.component'
import { NewTrainingComponent } from './new-training/new-training.component'
import { CurrentTrainingComponent } from './current-training/current-training.component'

const routes: Routes = [
  {
    path: 'training',
    component: TrainingComponent,
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
