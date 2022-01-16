import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { Tru4ConsumablesRoute } from './tru4-consumables-routing.module'
import { ConsumablesHomeComponent} from './consumables-home/consumables-home.component'
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Tru4ConsumablesRoute),
    SharedModule,
    PinchZoomModule
  ],
  declarations: [ConsumablesHomeComponent],
  providers: []
})
export class Tru4ConsumablesModule { }

