import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './Components/homeModule/home/home.component';
import { ContentLayoutComponent } from './core/layout/content-layout/content-layout.component';
// import { SharedModule } from './Components/Shared/shared.module';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { MenuComponent } from './core/menu/menu.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewCartComponent } from './core/view-cart/view-cart.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { ToastrModule } from 'ng6-toastr-notifications';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AccordionAnchorDirective } from './core/menu-accordion/accordionanchor.directive';
import { AccordionLinkDirective } from './core/menu-accordion/accordionlink.directive';
import { AccordionDirective } from './core/menu-accordion/accordion.directive';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MasterdataService} from 'src/app/Services/masterdata.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  SPINNER,
  POSITION,
  PB_DIRECTION } from 'ngx-ui-loader';
import { LoderComponent } from './loder/loder.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatRadioModule } from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FullpageDirective } from './Directives/fullpage.directive';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DatePipe } from '@angular/common'
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: 'red',
  fgsPosition: POSITION.bottomCenter,
  fgsSize: 40,
  text: 'Loading',
  fgsType: SPINNER.ballSpinClockwise,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 2,
  masterLoaderId: 'master'
};
@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    ContentLayoutComponent,
    SidebarComponent,
    MenuComponent,
    HeaderComponent,
    ViewCartComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    LoderComponent,
    FullpageDirective,        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   // SharedModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatBadgeModule,
    ToastrModule.forRoot(),
    PerfectScrollbarModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSelectFilterModule,
    MatRadioModule,
    MatAutocompleteModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    PinchZoomModule,
    AngularEditorModule
  ],
  providers: [
    MasterdataService,DatePipe,
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
