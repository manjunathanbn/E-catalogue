import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { AccessoryRoutes } from './accessoryParts.routing';
import { AccessoryHomeComponent } from './accessory-home/accessory-home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccessoryRoutes),
    SharedModule
  ],
  declarations: [AccessoryHomeComponent], 
  providers: []
})
export class AccessoryModule { }