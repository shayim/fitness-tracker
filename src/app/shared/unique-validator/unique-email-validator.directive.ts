import { Directive } from '@angular/core'
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthService } from '../../auth/services/auth.service'

@Directive({
  selector: '[appUniqueEmailValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueEmailValidatorDirective,
      multi: true,
    },
  ],
})
export class UniqueEmailValidatorDirective implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.auth.checkUniqueEmail(control.value).pipe(
      map((notExist: boolean) => {
        if (notExist) {
          return null
        }
        return { unique: true }
      })
    )
  }
}
