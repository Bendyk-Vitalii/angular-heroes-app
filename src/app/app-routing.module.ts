import { RegistrationComponent } from './pages/registration/registration.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import { PageNotFoundComponent } from './pages/pagenotfound/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', pathMatch: 'full',
        component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
