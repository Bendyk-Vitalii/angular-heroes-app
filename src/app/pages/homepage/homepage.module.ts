import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { HomepageComponent } from './homepage.component';
//import { AuthGuard } from 'src/app/shared/services/auth/auth.guard';
import { HeroSelectionPageComponent } from '../hero-selection-page/hero-selection-page.component';
import { CheckNullPipe } from '../../shared/pipes/check-null.pipe';
import { InfoPageComponent } from '../info-page/info-page.component';
import { InfoContentComponent } from '../info-page/info-component/info.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: 'heroselection',
        component: HeroSelectionPageComponent,
        // canActivateChild: [AuthGuard],
      },
      {
        path: 'info',
        component: InfoPageComponent,
        // canActivateChild: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    HeroSelectionPageComponent,
    HomepageComponent,
    InfoPageComponent,
    InfoContentComponent,
    CheckNullPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  // providers: [AuthGuard],
})
export class HomePageModule {}
