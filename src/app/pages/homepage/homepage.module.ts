import { CONSTANTS } from './../../shared/constants';
import { InfoPageComponent } from '../info-page/info-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroSelectionPageComponent } from '../hero-selection-page/hero-selection-page.component';
import { CheckNullPipe } from '../../shared/pipes/check-null.pipe';
import { ImgNotFoundLink } from 'src/app/shared/constants';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: 'heroselection',
        component: HeroSelectionPageComponent,
        canActivateChild: [AuthGuard],
      },
      {
        path: 'info',
        component: InfoPageComponent,
        canActivateChild: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [HeroSelectionPageComponent, HomepageComponent, CheckNullPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    {
      provide: CONSTANTS,
      useValue: { ImgNotFoundLink },
    },
  ],
})
export class HomePageModule {}
