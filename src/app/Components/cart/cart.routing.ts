import { Routes } from '@angular/router';
import { MyCartComponent } from './my-cart/my-cart.component';

export const CartRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: MyCartComponent
        }
    ]
}];