import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { HomeModule } from './home/home.module'
import { AppRoutingModule } from './shared/app-routing.module'
import { MatModule } from './shared/mat.module'
import { TrainingModule } from './training/training.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,

    HomeModule,
    TrainingModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
