import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../Shared/shared.module';

import { OthersRoutes } from './others.routing';
import { OthersHomeComponent } from './others-home/others-home.component';
import { OthersDetailComponent } from './others-detail/others-detail.component';
import { OtherPopupComponent } from './other-popup/other-popup.component';
import { OthersPopupEditComponent } from './others-popup-edit/others-popup-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OthersRoutes),
    SharedModule
  ],
  declarations: [OthersHomeComponent, OthersDetailComponent, OtherPopupComponent, OthersPopupEditComponent], 
  providers: []
})
export class OthersModule { }