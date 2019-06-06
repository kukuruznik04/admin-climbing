import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { StaticPageComponent } from './static-page/static-page.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: '',
    component: LandingPageComponent,
  }, {
      path: 'static-page/:id',
      component: StaticPageComponent,
  }, { path: 'sportsman-rating', loadChildren: './sportsman-rating-page/sportsman-rating-page.module#SportsmanRatingPageModule' }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
