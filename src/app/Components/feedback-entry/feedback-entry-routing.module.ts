import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackEntryHomeComponent } from './feedback-entry-home/feedback-entry-home.component';

export const FeedbackEntryRoute: Routes = [{
  path: "",
  children: [
      {
          path: "",
          component: FeedbackEntryHomeComponent
      }
  ]
}];


