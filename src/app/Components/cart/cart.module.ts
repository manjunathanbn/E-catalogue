import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { CartRoutes } from './cart.routing';
import { MyCartComponent } from './my-cart/my-cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CartRoutes),
    SharedModule
  ],
  declarations: [MyCartComponent], 
  providers: []
})
export class CartModule { }