import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../Shared/shared.module';

import { AdminPaintedRoutes } from './painted.routing';
import { AdminPaintedHomeComponent } from './admin-painted-home/admin-painted-home.component';
import { PaintedDetailsComponent } from './painted-details/painted-details.component';
import { PaintedSubpartsComponent } from './painted-subparts/painted-subparts.component';
import { PaintedPopupComponent } from './painted-popup/painted-popup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminPaintedRoutes),
    SharedModule
  ],
  declarations: [AdminPaintedHomeComponent, PaintedDetailsComponent, PaintedSubpartsComponent, PaintedPopupComponent],
  providers: []
})
export class AdminPaintedModule { }