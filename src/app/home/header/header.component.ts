import { Component, Output, EventEmitter } from '@angular/core'
import { _MatButtonToggleMixinBase } from '@angular/material'

@Component({
  selector: 'app-header',
  template: `
     <mat-toolbar color="primary">
      <button fxHide.gt-xs mat-icon-button (click)="toggle()">
        <mat-icon>dashboard</mat-icon>
      </button>

      <span class="brand"><a routerLink="/">LOGO</a></span>
      <ul fxHide.lt-sm fxFlex fxLayout fxLayoutAlign="end" fxLayoutGap="3%">
        <li>
          <a routerLink="/signup" routerLinkActive="active">Sign up</a>
        </li>
        <li>
          <a routerLink="/login" routerLinkActive="active">Login</a>
        </li>
        <li>
          <a routerLink="/training" routerLinkActive="active">Training</a>
        </li>
        <li>
          <button mat-button>Logout</button>
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
        color: red;
      }
    `,
  ],
})
export class HeaderComponent {
  @Output()
  toggleSidenav = new EventEmitter()

  toggle() {
    this.toggleSidenav.emit()
  }
}
