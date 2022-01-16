import { Routes } from '@angular/router';
import { ScootyHomeComponent } from './scooty-home/scooty-home.component';
import { ScootyDetailComponent } from './scooty-detail/scooty-detail.component';
export const ScootyRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: ScootyHomeComponent
        }
        ,
        {
            path: "scootyDetail",
            component: ScootyDetailComponent
        }
    ]
}];