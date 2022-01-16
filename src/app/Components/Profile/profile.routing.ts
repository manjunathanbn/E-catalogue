import { Routes } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const ProfileRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: MyOrdersComponent
        },
        {
            path: "orders",
            component: MyOrdersComponent
        },
        {
            path: "orderDetail",
            component: OrderDetailsComponent
        }
    ]
}];