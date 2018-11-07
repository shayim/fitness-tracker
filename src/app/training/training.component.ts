import { Component, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { selectTrainingStatus } from './store/training-reducer'
import { StopExercises } from './store/training-actions'

@Component({
  selector: 'app-training',
  template: `
  <nav mat-tab-nav-bar>
      <a mat-tab-link [disabled]="trainingStatus$|async"
     *ngFor="let link of navLinks"
     [routerLink]="link.path"
     routerLinkActive #rla="routerLinkActive"
     [active]="rla.isActive">
    {{link.label}}
  </a>
  </nav>
  <router-outlet *ngIf="!(trainingStatus$|async)"></router-outlet>

  <app-current-training *ngIf="trainingStatus$|async" (stopped)="onStopped()"></app-current-training>

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
  trainingStatus$
  navLinks: any[]
  constructor(private store: Store<any>) {
    this.trainingStatus$ = this.store.select(selectTrainingStatus)
  }

  ngOnInit() {
    this.navLinks = [
      { path: '/training/new', label: 'New' },
      // { path: '/training/current', label: 'Current' },
      { path: '/training/past', label: 'Past' },
    ]
  }

  onStopped() {
    this.store.dispatch(new StopExercises())
  }
}
