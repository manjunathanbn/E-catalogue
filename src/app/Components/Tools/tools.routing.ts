import { Routes } from '@angular/router';
import { ToolsHomeComponent } from './tools-home/tools-home.component';
import { ToolsDetailComponent } from './tools-detail/tools-detail.component';
export const ToolsRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: ToolsHomeComponent
        },
        {
            path: "toolsDetail",
            component: ToolsDetailComponent
        }
    ]
}];