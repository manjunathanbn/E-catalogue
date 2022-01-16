import { Routes } from '@angular/router';
import { KidsHomeComponent } from './kids-home/kids-home.component';

export const KidsRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: KidsHomeComponent
        }
    ]
}];