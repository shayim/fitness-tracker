import { Directive, Input } from '@angular/core'
import {
  Validator,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms'

@Directive({
  selector: '[appConfirmPassword]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true },
  ],
})
export class ConfirmPasswordDirective implements Validator {
  private _onChange: () => void
  private password: string
  @Input()
  set appConfirmPassword(value: string) {
    this.password = value || ''
    if (this._onChange) {
      setTimeout(() => {
        this._onChange()
      }, 0)
    }
  }

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value === this.password) {
      return null
    }

    return { confirmPassword: true }
  }

  registerOnValidatorChange(fn: () => void) {
    this._onChange = fn
  }
}
