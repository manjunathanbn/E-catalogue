import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { MenuHomeComponent} from './Menu/menu-home/menu-home.component'

export const AdminRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: AdminComponent
        },
        {
            path: "admin",
            component: AdminComponent
        }
    ]
}];