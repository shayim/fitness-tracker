import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-sidenav',
  template: `
     <mat-nav-list (click)="toggle()">
      <a  *ngIf="!user" mat-list-item routerLink="/signup" routerLinkActive="active">
        <mat-icon>face</mat-icon>
        <span>Sign up</span>
      </a>
      <a *ngIf="!user" mat-list-item routerLink="/login" routerLinkActive="active">
        <mat-icon>cast_connected</mat-icon>
        <span>Login</span>
      </a>
      <a *ngIf="user" mat-list-item routerLink="/training" routerLinkActive="active">
        <mat-icon>accessibility_new</mat-icon>
        <span>Training</span>
      </a>
      <mat-list-item *ngIf="user">
        <button mat-icon-button (click)="logout()">
          <mat-icon>eject</mat-icon>
          <span>Logout</span>
        </button>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [
    `
      :host {
        padding-top: 10%;
        width: 60%;
      }

      span {
        margin-left: 30px;
      }

      .active background-color: rgba(0, 0, 0, 0.1);
    `,
  ],
})
export class SidenavComponent {
  @Input()
  user: any

  @Output()
  loggedout = new EventEmitter()

  @Output()
  toggleSidenav = new EventEmitter()

  toggle() {
    this.toggleSidenav.emit()
  }

  logout() {
    this.loggedout.emit()
  }
}
