import { Routes } from '@angular/router';
import { ScooterHomeComponent } from './scooter-home/scooter-home.component';
import { ScooterDetailComponent } from './scooter-detail/scooter-detail.component';
export const ScooterRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: ScooterHomeComponent
        },
        {
            path: "scooterDetail",
            component: ScooterDetailComponent
        }
    ]
}];