import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { ActionReducerMap, StoreModule } from '@ngrx/store'
import { MatModule } from './../shared/mat.module'
import { CurrentTrainingComponent } from './current-training/current-training.component'
import { NewTrainingComponent } from './new-training/new-training.component'
import { PastTrainingComponent } from './past-training/past-training.component'
import { TrainingEffects } from './store/training-effects'
import { reducer as TrainingReducer } from './store/training-reducer'
import { TrainingComponent } from './training.component'
import { TrainingRoutingModule } from './training.routing.module'
import { FormsModule } from '@angular/forms'

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
    HttpClientModule,
    FormsModule,
    StoreModule.forFeature('training', TrainingReducer),
    EffectsModule.forFeature([TrainingEffects]),
    MatModule,
    TrainingRoutingModule,
  ],
})
export class TrainingModule {}
