import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartSearchComponent } from './part-search/part-search.component'

export const routes: Routes = [{
  path: "",
  children: [
      {
          path: "",
          component: PartSearchComponent
      }
  ]
}];


