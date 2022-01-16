import { Routes } from '@angular/router';
import { ClusterHomeComponent } from './cluster-home/cluster-home.component';

export const ClusterRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: ClusterHomeComponent
        }
    ]
}];