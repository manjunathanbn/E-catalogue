import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScooterRoutes } from './scooter.routing';
import { ScooterHomeComponent } from './scooter-home/scooter-home.component';
import { ScooterDetailComponent } from './scooter-detail/scooter-detail.component';
import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ScooterRoutes),
    SharedModule
  ],
  declarations: [ScooterHomeComponent, ScooterDetailComponent], 
  providers: []
})
export class ScooterModule { }