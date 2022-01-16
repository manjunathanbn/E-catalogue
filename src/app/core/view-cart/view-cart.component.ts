import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../Services/sidenave.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {
  cartList:any=[1,2,3];
  step = 0;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {

  }
  goBack(){
    this.sidenavService.togglingSidenav({});
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
