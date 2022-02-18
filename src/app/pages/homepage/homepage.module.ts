import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage.component';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroSelectionPageComponent } from '../hero-selection-page/hero-selection-page.component';

@NgModule({
  declarations: [
    HeroSelectionPageComponent,
    HomepageComponent
  ],
 imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule.forChild([
    {
    path: 'homepage',
    component: HomepageComponent,
    children: [
      {
        path: 'heroselection',
      component: HeroSelectionPageComponent,
      canActivate: [AuthGuard],
    }
    ]
  }
  ]),
  ],
  exports: [RouterModule, HttpClientModule],
  providers: [AuthGuard],
})
export class HomePageModule {}
