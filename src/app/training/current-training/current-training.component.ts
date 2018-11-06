import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-current-training',
  template: `
   <section fxLayout="column" fxLayoutAlign="center center">
      <mat-progress-spinner mode="determinate" [value]="progress"></mat-progress-spinner>
      <h1>{{progress}}%</h1>
      <p>Keep on going, You can do it!</p>
      <button mat-raised-button (click)="stop()">Stop</button>
   </section>
   <ng-template #templ>
    <h1 mat-dialog-title>Are You sure?</h1>
    <p>You have already progressed {{progress}}</p>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" color="warn">Yes</button>
      <button mat-button [mat-dialog-close]="false" color="primary">No</button>
    </div>
   </ng-template>
  `,
  styles: [],
})
export class CurrentTrainingComponent implements OnInit {
  timer: any
  progress = 0

  @Output()
  stopped = new EventEmitter<boolean>()

  @ViewChild('templ')
  templ: TemplateRef<any>

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startTimer()
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.progress += 5
      if (this.progress >= 100) {
        clearInterval(this.timer)
        this.stopped.emit(true)
      }
    }, 500)
  }

  stop() {
    clearInterval(this.timer)
    this.dialog
      .open(this.templ)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.stopped.emit(true)
        } else {
          this.startTimer()
        }
      })
  }
}
