import { StoreModule, ActionReducerMap } from '@ngrx/store'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { EffectsModule } from '@ngrx/effects'

import { MatModule } from '../shared/mat.module'
import { MyCommonModule } from '../../app/shared/my-common.module'

import { LoginComponent } from './login/login.component'

import { reducer as authReducer } from './store/auth-reducer'
import { AuthEffects } from './store/auth-effects'

import { AuthInterceptor } from './services/auth.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

const reducers: ActionReducerMap<any> = {
  auth: authReducer,
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    MatModule,
    MyCommonModule,
  ],
  providers: [
    AuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useExisting: AuthInterceptor, multi: true },
  ],
})
export class AuthModule {}
