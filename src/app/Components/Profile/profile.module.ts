import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { ProfileRoutes } from './profile.routing';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfileRoutes),
    SharedModule
  ],
  declarations: [MyOrdersComponent, OrderDetailsComponent], 
  providers: []
})
export class ProfileModule { }