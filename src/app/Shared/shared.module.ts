/**
 * Created BY HMSPL
 * Shared
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import {
//   MatNativeDateModule
// } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { OnlyNumber } from '../directive/onlyNumber.directive';
// import { Debounce } from '../directive/searchDebounce';
// import { CookieService } from 'ngx-cookie-service';
// import { SearchComponent } from './search/search.component';
// import { FilterComponent } from './filter/filter.component';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { CatalogueComponent } from './catalogue/catalogue.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CatalogueDetailComponent } from './catalogue-detail/catalogue-detail.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { PopupComponent } from './popup/popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  imports: [
    CommonModule,
    // NgxDatatableModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    // PerfectScrollbarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatExpansionModule,
    NgxImageZoomModule,
    MatDialogModule,
    PerfectScrollbarModule,
    MatFormFieldModule,
    ReactiveFormsModule ,
    PinchZoomModule    
  ],
  //declarations: [OnlyNumber, Debounce, SearchComponent, FilterComponent],
  //providers:[CookieService],
  exports: [
    //NgxDatatableModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    // OnlyNumber,
    // Debounce,
    // SearchComponent,
    // FilterComponent,
    //  MatSidenavModule,
    // PerfectScrollbarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    CatalogueComponent,
    CatalogueDetailComponent,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    NgxImageZoomModule,
    // MatNativeDateModule,
    MatDialogModule,
    PerfectScrollbarModule,
    MatFormFieldModule,
    ReactiveFormsModule    
  ],
  declarations: [CatalogueComponent, CatalogueDetailComponent, PopupComponent],
  //entryComponents:[SearchComponent,FilterComponent]
})
export class SharedModule { }
