import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SportsmanRatingPageRoutingModule } from './sportsman-rating-page-routing.module';
import { SportsmanRatingPageComponent } from './sportsman-rating-page.component';
import { UsersService } from '../../shared/services/user.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [SportsmanRatingPageComponent],
  imports: [
    CommonModule,
    SportsmanRatingPageRoutingModule,
  ],
  providers: [
      UsersService,
  ]
})
export class SportsmanRatingPageModule { }