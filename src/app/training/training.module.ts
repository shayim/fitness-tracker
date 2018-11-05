import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatModule } from './../shared/mat.module'
import { TrainingRoutingModule } from './training.routing.module'

import { TrainingComponent } from './training.component'
import { CurrentTrainingComponent } from './current-training/current-training.component'
import { PastTrainingComponent } from './past-training/past-training.component'
import { NewTrainingComponent } from './new-training/new-training.component'

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    NewTrainingComponent,
  ],
  imports: [CommonModule, MatModule, TrainingRoutingModule],
})
export class TrainingModule {}
