import { Component, OnInit, ViewChild, OnChanges } from '@angular/core'

@Component({
  selector: 'app-training',
  template: `
  <nav mat-tab-nav-bar>
      <a mat-tab-link
     *ngFor="let link of navLinks"
     [routerLink]="link.path"
     routerLinkActive #rla="routerLinkActive"
     [active]="rla.isActive">
    {{link.label}}
  </a>
  </nav>
  <router-outlet></router-outlet>

  <app-current-training></app-current-training>

  `,
  styles: [],
})
export class TrainingComponent implements OnInit {
  ongoingTraing = false
  navLinks: any[]
  constructor() {}

  ngOnInit() {
    this.navLinks = [
      { path: '/training/new', label: 'New' },
      // { path: '/training/current', label: 'Current' },
      { path: '/training/past', label: 'Past' },
    ]
  }
}
