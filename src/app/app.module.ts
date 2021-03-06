import { AlertService } from './shared/services/alert.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { ForbiddenValidatorDirective } from './shared/custom-validators.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    AlertComponent,
    ForbiddenValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard, AlertService],
  bootstrap: [AppComponent],
})
export class AppModule {}
