import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MopedRoutes } from './moped.routing';
import { PartsSelectComponent } from './parts-select/parts-select.component';
import { MopedHomeComponent } from './moped-home/moped-home.component';
import { SharedModule } from '../../Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MopedRoutes),
    SharedModule
  ],
  declarations: [PartsSelectComponent, MopedHomeComponent], 
  providers: []
})
export class MopedModule { }