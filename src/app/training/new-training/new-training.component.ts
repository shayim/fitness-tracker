import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Exercise } from '../models/exercise'
import { AddNewExercise, Load, StartExercises } from '../store/training-actions'
import { selectCurrentTraining, selectTrainingExercises } from '../store/training-reducer'

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
  newExercise: Exercise
  exercises$: Observable<Exercise[]>
  currentExes$: Observable<Exercise[]>
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
