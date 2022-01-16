import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../Shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectFilterModule } from 'mat-select-filter';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [PurchaseOrdersComponent, FeedbackDetailsComponent],
  providers: [],
  imports: [
    CommonModule,SharedModule,
    RouterModule.forChild(ReportsRoutingModule),    
    MatAutocompleteModule,MatSelectFilterModule,MatSelectModule,MatFormFieldModule,NgxMatSelectSearchModule,
    MatDatepickerModule,MatNativeDateModule
  ]
})
export class ReportsModule { }
