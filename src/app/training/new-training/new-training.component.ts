import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { IExercise } from '../models/exercise'
import { Load, StartExercises } from '../store/training-actions'

@Component({
  selector: 'app-new-training',
  template: `
  <section fxLayout fxLayoutAlign="center cennter">
    <mat-card fxFlex.lt-sm="100%" fxFlex="60%" fxLayout="column" fxLayoutAlign="center center">
      <mat-card-title>Time to start a workout</mat-card-title>
      <mat-card-content>
        <mat-form-field>
          <mat-select placeholder="choose next exercise">
            <mat-option *ngFor="let exercise of (exercises$ | async)" [value]="exercise.name">{{exercise.name}}</mat-option>
          </mat-select>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-icon-button (click)="start()">
          <mat-icon>play_circle_filled</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  </section>
  `,
  styles: [``],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<IExercise[]>

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.exercises$ = this.store
      .select('training')
      .pipe(select(s => s.training.exercises))

    this.store.dispatch(new Load())
  }

  start() {
    this.store.dispatch(new StartExercises())
  }
}
