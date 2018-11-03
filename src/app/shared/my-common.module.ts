import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { ConfirmPasswordDirective } from './confirm-password/confirm-password.directive'
import { UniqueEmailValidatorDirective } from './unique-validator/unique-email-validator.directive'

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [ConfirmPasswordDirective, UniqueEmailValidatorDirective],
  exports: [ConfirmPasswordDirective, UniqueEmailValidatorDirective],
})
export class MyCommonModule {}
