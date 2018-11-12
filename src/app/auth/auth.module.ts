import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { MyCommonModule } from '../../app/shared/my-common.module'
import { MatModule } from '../shared/mat.module'
import { LoginComponent } from './login/login.component'
import { AuthInterceptor } from './services/auth.interceptor'
import { AuthEffects } from './store/auth-effects'
import { reducer as authReducer } from './store/auth-reducer'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule,
    AngularFireAuthModule,
    MatModule,
    MyCommonModule,
  ],
  providers: [
    // AuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthModule {}
