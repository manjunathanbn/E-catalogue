import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminPaintedHomeComponent } from './admin-painted-home/admin-painted-home.component';
import { PaintedDetailsComponent } from './painted-details/painted-details.component';
import { PaintedSubpartsComponent } from './painted-subparts/painted-subparts.component'

export const AdminPaintedRoutes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: AdminPaintedHomeComponent
        },
        {
            path: 'detail',
            component: PaintedDetailsComponent
        },
        {
            path: 'subparts',
            component: PaintedSubpartsComponent
        }
    ]
}];