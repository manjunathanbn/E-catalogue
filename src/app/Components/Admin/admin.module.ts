import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutes } from './admin.routing';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectFilterModule } from 'mat-select-filter';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
@NgModule({
  declarations: [AdminComponent], 
  providers: [],
   imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    SharedModule,MatAutocompleteModule,MatSelectFilterModule,MatSelectModule,MatFormFieldModule,NgxMatSelectSearchModule,
    MatDatepickerModule,MatNativeDateModule
  ]
 
})
export class AdminModule { }