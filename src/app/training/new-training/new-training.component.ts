import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-new-training',
  template: `
  <section fxLayout fxLayoutAlign="center cennter">
    <mat-card fxFlex.lt-sm="90%" fxFlex="60%" fxLayout="column" fxLayoutAlign="center center">
      <mat-card-title>Time to start a workout</mat-card-title>
      <mat-card-content>
        <mat-form-field>
          <mat-select placeholder="choose next exercise">
            <mat-option *ngFor="let exercise of exercises" [value]="exercise.value">{{exercise.name}}</mat-option>
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
  @Output()
  trainingStarted = new EventEmitter()

  @Output()
  trainingPaused = new EventEmitter()

  exercises: any[]

  constructor() {}

  ngOnInit() {
    this.exercises = [
      { name: 'Crunches', value: 'crunches' },
      { name: 'Touch Toes', value: 'touch-toes' },
      { name: 'Side Lunges', value: 'side-lunges' },
      { name: 'Burpees', value: 'burpees' },
    ]
  }

  start() {
    this.trainingStarted.emit()
  }
}
