import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule, ActionReducerMap } from '@ngrx/store'

import { MatModule } from './../shared/mat.module'
import { TrainingRoutingModule } from './training.routing.module'

import { TrainingComponent } from './training.component'
import { CurrentTrainingComponent } from './current-training/current-training.component'
import { PastTrainingComponent } from './past-training/past-training.component'
import { NewTrainingComponent } from './new-training/new-training.component'

import { reducer as TrainingReducer } from './store/training-reducer'

const reducers: ActionReducerMap<any> = {
  training: TrainingReducer,
}

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    NewTrainingComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('training', reducers),
    MatModule,
    TrainingRoutingModule,
  ],
})
export class TrainingModule {}
