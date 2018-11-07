import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { IExercise } from '../models/exercise'
import { Load, StartExercises, AddNewExercise } from '../store/training-actions'
import { selectTrainingExercises, selectCurrentTraining } from '../store/training-reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: `new-training.component.html`,
  styles: [
    `
      mat-card {
        margin-bottom: 2%;
      }
    `,
  ],
})
export class NewTrainingComponent implements OnInit {
  newExercise: IExercise
  exercises$: Observable<IExercise[]>
  currentExes$: Observable<IExercise[]>
  constructor(private store: Store<any>) {
    this.exercises$ = this.store.select(selectTrainingExercises)
    this.currentExes$ = this.store.select(selectCurrentTraining)
  }

  ngOnInit() {
    this.store.dispatch(new Load())
  }

  add() {
    this.store.dispatch(new AddNewExercise(this.newExercise))
  }

  start() {
    this.store.dispatch(new StartExercises())
  }
}
