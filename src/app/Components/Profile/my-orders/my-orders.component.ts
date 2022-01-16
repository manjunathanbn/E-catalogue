/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidenavService } from '../../../Services/sidenave.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
ordersList:any=[];
  
  constructor(private commonService: CommonService,private router:Router,public sidenaveService:SidenavService,public masterdata: MasterdataService, private commonservice :CommonService, public toaster: ToastrManager) { }

  ngOnInit(): void {
    this.sidenaveService.togglingMenu({});
    // this.route.queryParamMap.subscribe((params) => this.words = {...params.keys, ...params});
    
    //this.commonService.paramgrp = null;
//this.getOrderDetail();
  }
  ngDoCheck():void{
    this.ordersList = this.commonService.orderlist;
  }
  goBack(){   
    this.router.navigate(['/motor'])
  }
  gotoDetail(poid){
    this.commonservice.param1 = poid;
    this.router.navigate(['/profile/orderDetail']);
  }
  mouseActive(){
    alert("gggss")
  }
  getOrderDetail() {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/GetECatOrders?CUSTOMER_ID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            if(resp.data.length){
            this.ordersList = resp.data;            
            //this.calculateTotal(); 
            }else{
              this.toaster.infoToastr("No Orders");
            }           
            // this.isShowPageLoader = false;
          }
          if (resp && resp.statusCode == 401) {
            // this.loginService.logout();            
          }
          }, error => {
          if (error.status == 401) {
            // this.loginService.logout();
          }
          this.toaster.errorToastr(error.statusMessage);       
          
          // this.isShowPageLoader = false;
          // this.toastr.error(error.statusMessage);
        }
      );      
  }
}
