import { Routes } from '@angular/router';
import { MopedHomeComponent } from './moped-home/moped-home.component';
import { PartsSelectComponent } from './parts-select/parts-select.component';

export const MopedRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: MopedHomeComponent
        },
        {
            path: "mopedDetail",
            component: PartsSelectComponent
        }
    ]
}];