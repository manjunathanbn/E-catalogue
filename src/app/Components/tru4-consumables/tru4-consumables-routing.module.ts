import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumablesHomeComponent} from './consumables-home/consumables-home.component'


export const Tru4ConsumablesRoute: Routes = [{
  path: "",
  children: [
      {
          path: "",
          component: ConsumablesHomeComponent
      }
  ]
}];

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class Tru4ConsumablesRoutingModule { }
