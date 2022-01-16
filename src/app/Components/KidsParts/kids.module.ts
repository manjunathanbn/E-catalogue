import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { KidsRoutes } from './kids.routing';
import { KidsHomeComponent } from './kids-home/kids-home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(KidsRoutes),
    SharedModule
  ],
  declarations: [KidsHomeComponent], 
  providers: []
})
export class KidsModule { }