import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { environment } from './../environments/environment'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { HomeModule } from './home/home.module'
import { AppRoutingModule } from './shared/app-routing.module'
import { MatModule } from './shared/mat.module'
import { TrainingModule } from './training/training.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    TrainingModule,
    AuthModule,
    MatModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
