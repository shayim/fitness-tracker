import { NgModule } from '@angular/core'
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'

@NgModule({
  imports: [FlexLayoutModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [FlexLayoutModule, MatButtonModule, MatFormFieldModule, MatInputModule],
})
export class MatModule {}
