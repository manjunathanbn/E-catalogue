import { Routes } from '@angular/router';
import { MenuHomeComponent } from './menu-home/menu-home.component';

export const MenuRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: MenuHomeComponent
        }
    ]
}];