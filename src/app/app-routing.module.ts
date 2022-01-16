import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './core/layout/content-layout/content-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/motor', pathMatch: 'full' },
  {
    path: 'moped',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Moped/moped.module').then(m => m.MopedModule)
  },
  {
    path: 'scooter',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Scooter/scooter.module').then(m => m.ScooterModule)
  },
  {
    path: 'scooty',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Scooty/scooty.module').then(m => m.ScootyModule)
  },
  {
    path: 'motor',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/MotorCycle/motorcycle.module').then(m => m.MotorModule)
  },
  {
    path: 'painted',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/PaintedParts/paintedParts.module').then(m => m.PaintedModule)
  },
  {
    path: 'accessory',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/AccessoryParts/accessoryParts.module').then(m => m.AccessoryModule)
  },
  {
    path: 'cluster',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/PhotoCluster/cluster.module').then(m => m.ClusterModule)
  },
  {
    path: 'kits',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/KidsParts/kids.module').then(m => m.KidsModule)
  },
  {
    path: 'tools',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Tools/tools.module').then(m => m.ToolsModule)
  },
  {
    path: 'profile',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'cart',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'menu',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Admin/Menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: 'adminCat',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Admin/Catalogue/catalogue.module').then(m => m.CatalogueModule)
  },  
  {
    path: 'others',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Admin/Others/others.module').then(m => m.OthersModule)
  },
  {
    path: 'admin',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'adminPainted',
    component: ContentLayoutComponent,
    loadChildren: () =>
      import('./Components/Admin/PaintedParts/painted.module').then(m => m.AdminPaintedModule)
  },
  {
   path: 'partSearch',
   component: ContentLayoutComponent,
   loadChildren:() =>
        import('./Components/part-search/part-search.module').then(m => m.PartSearchModule)
  },
  {
    path: 'consumables',
    component: ContentLayoutComponent,
    loadChildren:() =>
         import('./Components/tru4-consumables/tru4-consumables.module').then(m => m.Tru4ConsumablesModule)
   },
   {
    path: 'feedbackEntry',
    component: ContentLayoutComponent,
    loadChildren:() =>
         import('./Components/feedback-entry/feedback-entry.module').then(m => m.FeedbackEntryModule)
   },
   {
    path: 'reports',
    component: ContentLayoutComponent,
    loadChildren:() =>
         import('./Components/reports/reports.module').then(m => m.ReportsModule)
   },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/moter', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
