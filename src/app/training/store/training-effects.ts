import { selectNewTraining } from './training-reducer'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { TrainingService } from '../services/training.service'
import {
  LoadSuccess,
  TrainingActionTypes,
  StopExercises,
  StartExercises,
} from './training-actions'
import { Exercise } from '../models/exercise'

@Injectable()
export class TrainingEffects {
  news: Exercise[]
  constructor(
    private ts: TrainingService,
    private actions: Actions,
    private store: Store<any>
  ) {
    this.store.select(selectNewTraining).subscribe(news => (this.news = news))
  }

  @Effect()
  load$: Observable<Action> = this.actions.pipe(
    ofType(TrainingActionTypes.Load),
    switchMap(() =>
      this.ts.getAllExercises().pipe(
        map(exes => {
          return new LoadSuccess(exes)
        })
      )
    )
  )

  @Effect()
  finished: Observable<Action> = this.actions.pipe(
    ofType(TrainingActionTypes.Completed),
    map(() => {
      if (this.news.length === 0) {
        return new StopExercises(100)
      }
      return new StartExercises()
    })
  )
}
