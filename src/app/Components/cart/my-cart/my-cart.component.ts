/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { SidenavService } from '../../../Services/sidenave.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { CommonService } from 'src/app/Services/common.service';
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
cartData:any=[];

totalCartPrice:any=0;
deliveryFee:any=50;
couponDis:any=0;

  constructor(public sidenaveService:SidenavService,private router:Router,private commonService: CommonService,public masterdata: MasterdataService, public toaster: ToastrManager) {
    
   }

  ngOnInit(): void {  
    this.sidenaveService.togglingMenu({});
    this.getcartDetail();    
 
  }
  calculateTotal(){
    this.totalCartPrice=0;
    this.cartData.filter(key=>{      
      this.totalCartPrice=this.totalCartPrice+(Number(key.NDP)*Number(key.ORDER_QTY));
    });
    
    localStorage.removeItem('badgeCount');
    localStorage.setItem('badgeCount',this.cartData.length);
  }
  decrement(i){
    if(this.cartData[i].ORDER_QTY>1)
    --this.cartData[i].ORDER_QTY;
    this.calculateTotal();
  }
  increment(i){
    ++this.cartData[i].ORDER_QTY;
    this.calculateTotal();
  }
  removeCart(i){
    this.RemoveFromCart(i);    
  }
  SaveLater(i)
  {
    this.cartData.splice(i,1);
    this.calculateTotal(); 
  }
  gotoDetail(i){
    //this.router.navigate(["/moped/mopedDetail"])
  }
  getcartDetail() {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/GetECartDetails?CUSTOMER_ID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            if(resp.data.length){
            this.cartData = resp.data;            
            this.calculateTotal(); 
            }else{
              localStorage.removeItem('badgeCount');
              localStorage.setItem('badgeCount',this.cartData.length); 
              //this.toaster.infoToastr("No Items in the Cart");
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
  RemoveFromCart(i) {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/DeleteECart?CUSTOMER_ID='+localStorage.getItem('dealercode')+'&CART_ID='+this.cartData[i].CART_ID).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {            
            this.cartData.splice(i,1);
            this.calculateTotal();
            this.toaster.successToastr(resp.message);   
            this.commonService.sentbadge(resp.data);         
          }
          if (resp && resp.statusCode == 401) {                     
          }
          }, error => {
          if (error.status == 401) {
          }
          this.toaster.errorToastr(error.statusMessage);     
        }
      );      
  }
  CreateOrder(){
    let reqData = {"cartDetails": this.cartData,"TotCartVal":this.totalCartPrice}
    this.masterdata.post(reqData, 'api/Catalouge/CreateECatOrder').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {           
            this.toaster.successToastr(resp.data);
                        //this.ngOnInit();
                        //window.location.reload();
                        this.refresh(); 
          }
          if (resp && resp.statusCode == 203) {           
            this.toaster.warningToastr(resp.data);                     
          }
          if (resp && resp.statusCode == 500) {
            this.toaster.errorToastr(resp.message);
            // this.loginService.logout();            
          }
          
          }, error => {
          if (error.status == 401) {
            // this.loginService.logout();
            this.toaster.errorToastr(error.statusMessage);
            this.refresh();
          }         
        }
        
      );
  }
  refresh(): void {
    //window.location.reload();
    this.router.navigate(['/motor']);
     
}
chkCoupon(): void{
  if(Number(this.couponDis) > 0){
    this.calculateTotal();
    let CoupDisVal = Number(this.totalCartPrice) * (Number(this.couponDis) /100)
    this.totalCartPrice = Number(this.totalCartPrice) - Number(CoupDisVal);
  }  
}
}
