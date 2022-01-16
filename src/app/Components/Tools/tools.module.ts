import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { ToolsRoutes } from './tools.routing';
import { ToolsHomeComponent } from './tools-home/tools-home.component';
import { ToolsDetailComponent } from './tools-detail/tools-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ToolsRoutes),
    SharedModule
  ],
  declarations: [ToolsHomeComponent, ToolsDetailComponent], 
  providers: []
})
export class ToolsModule { }