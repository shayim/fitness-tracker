import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatModule } from './../shared/mat.module'
import { MyCommonModule } from '../../app/shared/my-common.module'

import { LoginComponent } from './login/login.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, MatModule, MyCommonModule],
})
export class AuthModule {}
