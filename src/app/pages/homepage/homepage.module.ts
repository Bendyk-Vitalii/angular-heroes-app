import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroSelectionPageComponent } from '../hero-selection-page/hero-selection-page.component';
import { CheckNullPipe } from '../../shared/services/check-null.pipe';

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
  providers: [AuthGuard],
})
export class HomePageModule {}
