import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  OnChanges,
} from '@angular/core'

import { MatDialog } from '@angular/material'
import { Exercise } from '../models/exercise'

@Component({
  selector: 'app-current-training',
  template: `
    <section fxLayout="column" fxLayoutAlign="center center">
      <mat-progress-spinner mode="determinate" [value]="progress"></mat-progress-spinner>
      {{ progress }}%
      <h1>{{ currentExes?.name }}</h1>
      <p>Keep on going, You can do it!</p>
      <button mat-raised-button (click)="stop()">Stop</button>
    </section>
    <ng-template #templ>
      <h1 mat-dialog-title>Are You sure?</h1>
      <p>You have already progressed {{ progress }}</p>
      <div mat-dialog-actions>
        <button mat-button [mat-dialog-close]="true" color="warn">Yes</button>
        <button mat-button [mat-dialog-close]="false" color="primary">No</button>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class CurrentTrainingComponent implements OnInit, OnChanges {
  timer: any
  progress = 0

  @Input()
  currentExes: Exercise

  @Output()
  completed = new EventEmitter<Exercise>()

  @Output()
  stopped = new EventEmitter<number>()

  @ViewChild('templ')
  templ: TemplateRef<any>

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  ngOnChanges() {
    this.startTimer()
  }

  private startTimer() {
    const step = this.currentExes.duration /* * 10 */
    this.timer = setInterval(() => {
      this.progress += 1
      if (this.progress >= 100) {
        clearInterval(this.timer)
        this.progress = 0

        this.completed.emit({
          ...this.currentExes,
          date: new Date(),
          state: 'completed',
        })
      }
    }, step)
  }

  stop() {
    clearInterval(this.timer)
    this.dialog
      .open(this.templ)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.stopped.emit(this.progress)
        } else {
          this.startTimer()
        }
      })
  }
}
