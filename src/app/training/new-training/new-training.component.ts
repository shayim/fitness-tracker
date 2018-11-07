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
        <button mat-icon-button (click)="add()">
          <mat-icon>add</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  </section>
  <section>
    <mat-card>
      <mat-card-title>Current Exercises List</mat-card-title>
      <mat-list role="list">
        <mat-list-item role="listitem">
          <button mat-icon-button (click)="start()" fxFlex fxFlexAlign="center">
            <mat-icon>play_circle_filled</mat-icon>
          </button>
        </mat-list-item>
        <mat-list-item role="listitem">Item 2</mat-list-item>
        <mat-list-item role="listitem">Item 3</mat-list-item>
        </mat-list>
    </mat-card>
  </section>
  `,
  styles: [
    `
      mat-card {
        margin-bottom: 2%;
      }
    `,
  ],
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

  add() {}

  start() {
    this.store.dispatch(new StartExercises())
  }
}
