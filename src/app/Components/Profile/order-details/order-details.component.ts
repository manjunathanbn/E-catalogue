/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { CommonService } from 'src/app/Services/common.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss','../my-orders/my-orders.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;    orderDetail:any={};
  // orderDetail={
  //   // partNo:67567,name:"RUBBER KICK STARTER LEVER",orderNo:"ORD45456",mrp:345,orderDate:"5th Sep 2020",
  //   // deliveryDate:"20th Sep 2020",seller:"TVS",img:"assets/Images/mirror.jpg",
  //   // address:{
  //   //   name:"Test Name",
  //   //   street:"North Street",
  //   //   flatNo:"45",
  //   //   city:"Kallakurichi",
  //   //   district:"Kallakurichi",
  //   //   state:"Tamil Nadu",
  //   //   pin:605702,
  //   //   contact:8987678876
  //   // }
  // };
 address:any;
  // ordersList:any=[
  //   {partNo:67568,name:"WAVE SPRING WASHER M8 ZNB",orderNo:45456,mrp:345,orderDate:"5th Sep 2020",deliveryDate:"20th Sep 2020",seller:"TVS",img:"assets/Images/mirror.jpg",  address:{
  //     name:"Test Name",
  //     street:"North Street",
  //     flatNo:"45",
  //     city:"Kallakurichi",
  //     district:"Kallakurichi",
  //     state:"Tamil Nadu",
  //     pin:605702,
  //     contact:8987678876
  //   }},
  //   {partNo:67570,name:"HEX NUT M8",orderNo:45456,mrp:345,orderDate:"5th Sep 2020",deliveryDate:"20th Sep 2020",seller:"TVS",img:"assets/Images/mirror.jpg",  address:{
  //     name:"Test Name",
  //     street:"North Street",
  //     flatNo:"45",
  //     city:"Kallakurichi",
  //     district:"Kallakurichi",
  //     state:"Tamil Nadu",
  //     pin:605702,
  //     contact:8987678876
  //   }}
  // ];
  constructor(private router:Router,public masterdata: MasterdataService, private commonservice :CommonService, public toaster: ToastrManager) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  goBack(){
    this.router.navigate(['/profile']);
  }
  gotoDetail(ord){
    this.orderDetail=ord;
  }
  getOrderDetail() {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/GetECatOrderDetail?CUSTOMER_ID='+localStorage.getItem('dealercode')+'&POID='+ this.commonservice.param1).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            if(resp.data){
            this.orderDetail = resp.data;
            this.address = this.orderDetail.CustAddress           
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
