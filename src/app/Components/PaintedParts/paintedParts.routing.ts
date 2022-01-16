import { Routes } from '@angular/router';
import { PaintedHomeComponent } from './painted-home/painted-home.component';
import { PaintedDetailComponent } from './painted-detail/painted-detail.component';
import { PMopedComponent } from './p-moped/p-moped.component';
import { PScooterComponent } from './p-scooter/p-scooter.component';
import { PScootyComponent } from './p-scooty/p-scooty.component';
import { PMotorComponent } from './p-motor/p-motor.component';

export const PaintedRoutes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: PMotorComponent
        }
        ,
        {
            path: "p_moped",
            component: PMopedComponent
        }
        ,
        {
            path: "p_scooter",
            component: PScooterComponent
        }
        ,
        {
            path: "p_scooty",
            component: PScootyComponent
        }
        ,
        {
            path: "p_motor",
            component: PMotorComponent
        }
        ,
        {
            path: "paintedDetail",
            component: PaintedDetailComponent
        }
    ]
}];