import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { ClusterRoutes } from './cluster.routing';
import { ClusterHomeComponent } from './cluster-home/cluster-home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClusterRoutes),
    SharedModule
  ],
  declarations: [ClusterHomeComponent], 
  providers: []
})
export class ClusterModule { }