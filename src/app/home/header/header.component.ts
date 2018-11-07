import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-header',
  template: `
     <mat-toolbar color="primary">
      <button fxHide.gt-xs mat-icon-button (click)="toggle()">
        <mat-icon>dashboard</mat-icon>
      </button>

      <div fxFlex fxLayoutAlign.xs="end"><a routerLink="/">LOGO</a></div>
      <ul fxHide.lt-sm fxFlex fxLayout fxLayoutAlign="end" fxLayoutGap="10%">
        <li *ngIf="!user">
          <a routerLink="/signup" routerLinkActive="active">Sign up</a>
        </li>
        <li *ngIf="!user">
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </li>
        <li *ngIf="user">
          <a routerLink="/training" routerLinkActive="active">Training</a>
        </li>
        <li *ngIf="user">
          <button mat-button (click)="logout()">Logout</button>
        </li>
      </ul>

    </mat-toolbar>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: white;
      }

      a:hover {
        color: rgba(255, 255, 255, 0.7);
      }

      .active {
        padding: 7% 20% 10%;
        border: 2px dashed white;
        border-radius: 10px;
      }
    `,
  ],
})
export class HeaderComponent {
  @Input()
  user: any

  @Output()
  toggleSidenav = new EventEmitter()

  @Output()
  loggedout = new EventEmitter()

  toggle() {
    this.toggleSidenav.emit()
  }

  logout() {
    this.loggedout.emit()
  }
}
