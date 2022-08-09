import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertService } from './shared/services/alert.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthService } from './shared/services/auth/auth.service';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AlertComponent } from './components/alert/alert.component';
import { ForbiddenValidatorDirective } from './shared/custom-validators.directive';
import { SpinnerOverlayComponent } from './shared/components/spinner-overlay/spinner-overlay.component';
import { SpinnerInterceptor } from './shared/components/spinner-overlay.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    AlertComponent,
    ForbiddenValidatorDirective,
    SpinnerOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OverlayModule,
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
