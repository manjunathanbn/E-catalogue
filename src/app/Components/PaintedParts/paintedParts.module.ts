import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaintedRoutes } from './paintedParts.routing';
import { PaintedHomeComponent } from './painted-home/painted-home.component';
import { PaintedDetailComponent } from './painted-detail/painted-detail.component';
import { SharedModule } from '../../Shared/shared.module';
import { PMopedComponent } from './p-moped/p-moped.component';
import { PScooterComponent } from './p-scooter/p-scooter.component';
import { PScootyComponent } from './p-scooty/p-scooty.component';
import { PMotorComponent } from './p-motor/p-motor.component';
import { PaintedPopupComponent } from './painted-popup/painted-popup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PaintedRoutes),
    SharedModule
  ],
  declarations: [PaintedHomeComponent, PaintedDetailComponent, PMopedComponent, PScooterComponent, PScootyComponent, PMotorComponent, PaintedPopupComponent], 
  providers: []
})
export class PaintedModule { }