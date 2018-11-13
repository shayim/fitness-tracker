import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Exercise } from './models/exercise'
import { CompletedExercise, StopExercises } from './store/training-actions'
import { selectCurrentTraining, selectTrainingStatus } from './store/training-reducer'

@Component({
  selector: 'app-training',
  template: `
    <nav mat-tab-nav-bar>
      <a
        mat-tab-link
        [disabled]="trainingStatus$ | async"
        *ngFor="let link of navLinks"
        [routerLink]="link.path"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
      >
        {{ link.label }}
      </a>
    </nav>
    <router-outlet *ngIf="!(trainingStatus$ | async)"></router-outlet>

    <app-current-training
      [currentExes]="currentExes$ | async"
      *ngIf="(trainingStatus$ | async)"
      (stopped)="onStopped($event)"
      (completed)="onCompleted($event)"
    >
    </app-current-training>
  `,
  styles: [
    `
      [mat-tab-nav-bar] {
        margin-bottom: 5%;
      }
    `,
  ],
})
export class TrainingComponent implements OnInit {
  currentExes$: Observable<Exercise>
  trainingStatus$: Observable<boolean>
  navLinks: any[]

  constructor(private store: Store<any>) {
    this.trainingStatus$ = this.store.select(selectTrainingStatus)
    this.currentExes$ = this.store.select(selectCurrentTraining)
  }

  ngOnInit() {
    this.navLinks = [
      { path: '/training/new', label: 'New' },
      { path: '/training/past', label: 'Past' },
    ]
  }

  onStopped(progress: number) {
    this.store.dispatch(new StopExercises(progress))
  }

  onCompleted(exercise: Exercise) {
    const completedExercise: Exercise = {
      ...exercise,
      state: 'completed',
      date: new Date(),
    }
    this.store.dispatch(new CompletedExercise(completedExercise))
  }
}
