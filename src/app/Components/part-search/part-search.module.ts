import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../Shared/shared.module';
import { routes } from './part-search-routing.module';
import { PartSearchComponent } from './part-search/part-search.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectFilterModule } from 'mat-select-filter';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [PartSearchComponent],
  providers:[],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatAutocompleteModule,
    MatSelectFilterModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
    ]
})
export class PartSearchModule { }
