import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
export const MotorRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: HomeComponent
        },
        {
            path: "motorDetail",
            component: DetailComponent
        }
    ]
}];