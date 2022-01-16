import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../Shared/shared.module';
import { MenuRoutes } from './menu.routing';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { MenuuploadPopupComponent } from './menuupload-popup/menuupload-popup.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MenuRoutes),
    SharedModule,
    MatRadioModule,
    // MatInputModule,
    // MatFormFieldModule,
    // FormsModule,
    // ReactiveFormsModule
  ],
  declarations: [MenuHomeComponent, MenuuploadPopupComponent],
  providers: []
})
export class MenuModule { }