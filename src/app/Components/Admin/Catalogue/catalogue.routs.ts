import { Routes } from '@angular/router';
import { CatalogueHomeComponent } from './catalogue-home/catalogue-home.component';
import { CatalogueDetailComponent } from './catalogue-detail/catalogue-detail.component';
import { CatSubpartsComponent } from './cat-subparts/cat-subparts.component';

export const CatalogueRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: CatalogueHomeComponent
        },
        {
            path: "detail",
            component: CatalogueDetailComponent
        },
        {
            path: "sub",
            component: CatSubpartsComponent
        }
    ]
}];