import { Routes } from '@angular/router';
import { OthersHomeComponent } from './others-home/others-home.component';
import { OthersDetailComponent } from './others-detail/others-detail.component';

export const OthersRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: OthersHomeComponent
        },
        {
            path: "detail",
            component: OthersDetailComponent
        }
    ]
}];