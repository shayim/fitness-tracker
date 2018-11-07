import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Exercise } from '../models/exercise'
import { selectPastTraining } from '../store/training-reducer'

@Component({
  selector: 'app-past-training',
  templateUrl: `past-training.component.html`,
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class PastTrainingComponent implements OnInit {
  displayedColumns: string[] = ['name', 'duration', 'calories', 'status', 'date']
  pastExercises$: Observable<Exercise[]>
  constructor(private store: Store<any>) {
    this.pastExercises$ = this.store.select(selectPastTraining)
  }

  ngOnInit() {}
}
