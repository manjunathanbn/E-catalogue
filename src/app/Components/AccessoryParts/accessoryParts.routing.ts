import { Routes } from '@angular/router';
import { AccessoryHomeComponent } from './accessory-home/accessory-home.component';

export const AccessoryRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: AccessoryHomeComponent
        }
    ]
}];