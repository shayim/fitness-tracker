import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { Exercise } from '../models/exercise'
import { TrainingService } from '../services/training.service'
import {
  LoadSelectionsSuccess,
  SaveFinished,
  SaveFinishedSuccess,
  StartExercises,
  TrainingActionTypes,
  LoadSelectionsFailure,
  SaveFinishedFailure,
  LoadPastSuccess,
  LoadPastFailure,
} from './training-actions'
import { selectNewTraining } from './training-reducer'
import { MatSnackBar } from '@angular/material'

@Injectable()
export class TrainingEffects {
  news: Exercise[]
  constructor(
    private ts: TrainingService,
    private actions: Actions,
    private store: Store<any>,
    private snackBar: MatSnackBar
  ) {
    this.store.select(selectNewTraining).subscribe(news => (this.news = news))
  }

  @Effect()
  load$: Observable<Action> = this.actions.pipe(
    ofType(TrainingActionTypes.LoadSelections),
    switchMap(() =>
      this.ts.retrieveExerciseSelectionFromFirebase().pipe(
        map(results => new LoadSelectionsSuccess(results)),
        catchError(error => of(new LoadSelectionsFailure(error)))
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
    switchMap(() => this.ts.saveFinishedExercisesToFirebase()),
    map(ids => new SaveFinishedSuccess(ids)),
    catchError(error => of(new SaveFinishedFailure(error)))
  )

  @Effect()
  loadPast$: Observable<Action> = this.actions.pipe(
    ofType(TrainingActionTypes.LoadPast),
    switchMap(() => this.ts.retrievePastExercisesFromFirebase()),
    map(exes => new LoadPastSuccess(exes)),
    catchError(error => of(new LoadPastFailure(error)))
  )

  @Effect({ dispatch: false })
  failure$ = this.actions.pipe(
    ofType(
      TrainingActionTypes.LoadSelectionsFailure,
      TrainingActionTypes.SaveFinishedFailure,
      TrainingActionTypes.LoadPastFailure
    ),
    tap((action: any) => {
      this.snackBar.open(action.error.message, null, { duration: 5000 })
    })
  )
}
