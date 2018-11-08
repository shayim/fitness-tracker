import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Exercise } from '../models/exercise'
import { selectPastTraining } from '../store/training-reducer'
import { MatSort } from '@angular/material'

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
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'duration', 'calories', 'status', 'date']
  pastExercises$: Observable<Exercise[]>

  @ViewChild(MatSort)
  sort: MatSort

  constructor(private store: Store<any>) {
    this.pastExercises$ = this.store.select(selectPastTraining)
  }

  ngOnInit() {}

  ngAfterViewInit() {}
}
