import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-painted-detail',
  templateUrl: './painted-detail.component.html',
  styleUrls: ['./painted-detail.component.scss']
})

export class PaintedDetailComponent implements OnInit {
  param1: any;
  param2: any;

  constructor() {
   }

  ngOnInit(): void {
    }

}
