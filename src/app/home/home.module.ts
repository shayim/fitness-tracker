import { MatModule } from './../shared/mat.module'
import { SidenavComponent } from '../home/sidenav/sidenav.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WelcomeComponent } from './welcome/welcome.component'
import { HeaderComponent } from './header/header.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [WelcomeComponent, SidenavComponent, HeaderComponent],
  imports: [CommonModule, MatModule, RouterModule],
  exports: [SidenavComponent, HeaderComponent],
})
export class HomeModule {}
