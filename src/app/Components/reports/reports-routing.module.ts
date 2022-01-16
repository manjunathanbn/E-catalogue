import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';

export const ReportsRoutingModule: Routes = [{
  path: "",
  children: [
      {
          path: "",
          component: PurchaseOrdersComponent
      },
      {
          path: "feedback",
          component: FeedbackDetailsComponent
      },
      {
        path: "po",
        component: PurchaseOrdersComponent
      }
  ]
}];
