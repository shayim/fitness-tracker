import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { Exercise } from '../models/exercise'
import { TrainingService } from '../services/training.service'
import {
  LoadSuccess,
  StartExercises,
  StopExercises,
  TrainingActionTypes,
  CompletedExercise,
  SaveFinished,
  SaveFinishedSuccess,
} from './training-actions'
import { selectNewTraining } from './training-reducer'

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
      this.ts.retrieveExercisesFromFirebase().pipe(
        map(exes => {
          return new LoadSuccess(exes)
        })
      )
    )
  )

  @Effect()
  completed: Observable<Action> = this.actions.pipe(
    ofType(TrainingActionTypes.Completed),
    map(() => {
      if (this.news.length > 0) {
        return new StartExercises()
      } else {
        return new SaveFinished()
      }
    })
  )

  @Effect({ dispatch: true })
  stopped: Observable<Action> = this.actions.pipe(
    ofType(TrainingActionTypes.Stop),
    map(() => new SaveFinished())
  )

  @Effect()
  saveFinished: Observable<Action> = this.actions.pipe(
    ofType(TrainingActionTypes.SaveFinished),
    map(() => this.ts.saveFinishedExercisesToFirebase()),
    map(ids => new SaveFinishedSuccess(ids))
  )
}
