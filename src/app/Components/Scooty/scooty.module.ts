import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScootyRoutes } from './scooty.routing';
import { ScootyHomeComponent } from './scooty-home/scooty-home.component';
import { SharedModule } from '../../Shared/shared.module';
import { ScootyDetailComponent } from './scooty-detail/scooty-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ScootyRoutes),
    SharedModule
  ],
  declarations: [ScootyHomeComponent,ScootyDetailComponent], 
  providers: []
})
export class ScootyModule { }