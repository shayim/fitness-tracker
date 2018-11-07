import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { TrainingService } from '../services/training.service'
import { LoadSuccess, TrainingActionTypes } from './training-actions'

@Injectable()
export class TrainingEffects {
  constructor(private ts: TrainingService, private actions: Actions) {}

  @Effect()
  load$: Observable<Action> = this.actions.pipe(
    ofType(TrainingActionTypes.Load),
    switchMap(action =>
      this.ts.getAllExercises().pipe(
        map(exes => {
          return new LoadSuccess(exes)
        })
      )
    )
  )
}
