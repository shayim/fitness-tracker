import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { MatModule } from './../shared/mat.module'
import { TrainingRoutingModule } from './training.routing.module'

import { CurrentTrainingComponent } from './current-training/current-training.component'
import { NewTrainingComponent } from './new-training/new-training.component'
import { PastTrainingComponent } from './past-training/past-training.component'
import { TrainingComponent } from './training.component'

import { TrainingEffects } from './store/training-effects'
import { reducer as TrainingReducer } from './store/training-reducer'

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
