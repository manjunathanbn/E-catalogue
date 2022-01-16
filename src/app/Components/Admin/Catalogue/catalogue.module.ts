import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../Shared/shared.module';

import { CatalogueRoutes } from './catalogue.routs';
import { CatalogueHomeComponent } from './catalogue-home/catalogue-home.component';
import { CatalogueDetailComponent } from './catalogue-detail/catalogue-detail.component';
import { DragDirective } from '../../../Directives/dragDrop.directive';
import { CataloguePopupComponent } from './catalogue-popup/catalogue-popup.component';
import { CatSubpartsComponent } from './cat-subparts/cat-subparts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CatalogueRoutes),
    SharedModule
  ],
  declarations: [CatalogueHomeComponent, CatalogueDetailComponent,
    DragDirective,
    CataloguePopupComponent,
    CatSubpartsComponent
  ], 
  providers: []
})
export class CatalogueModule { }