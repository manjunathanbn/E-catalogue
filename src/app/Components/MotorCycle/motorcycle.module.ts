import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MotorRoutes } from './motorcycle.routing';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MotorRoutes),
    SharedModule
  ],
  declarations: [HomeComponent, DetailComponent], 
  providers: []
})
export class MotorModule { }