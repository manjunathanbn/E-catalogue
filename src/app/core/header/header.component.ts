/*tslint:disable*/
// import { CommonService } from "./../../services/common.service";
import { Component, EventEmitter, Output,OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
// import { AuthenticationService } from "../../services/authentication.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonService } from "../../Services/common.service";
import { SidenavService } from "../../Services/sidenave.service";
// import { ChangeUserPasswordComponent } from "../change-user-password/change-user-password.component";
// import { ToastrManager } from "ng6-toastr-notifications";
import {ThemePalette} from '@angular/material/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { FeedbackEntryHomeComponent } from "src/app/Components/feedback-entry/feedback-entry-home/feedback-entry-home.component";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleviewCart = new EventEmitter<void>();

  @Output() toggleadminSidenav = new EventEmitter<void>();
  public currentTittle: any;
  message: any;
  subscription: Subscription;
  currentUrl: any;
  menuToggle:boolean=false;
  cartCount:any=0;
  DealerCode:any;
  dcode:any;
  dname:any;
  Name:any;
  delrData: any;
  color: ThemePalette = 'accent';
  isChecked:any=false;
  cartData:any=[];
  ordersList: any;
  isAdmin: string = 'n';
  constructor(
    private router: Router,
     private commonService: CommonService,
    // private auth: AuthenticationService,
    public dialog: MatDialog,
    public sidenaveService:SidenavService,
    private route:ActivatedRoute,
    public masterdata: MasterdataService,
    public toaster: ToastrManager
    // public toast:ToastrManager
  ) {
    if(localStorage.getItem('role')=='true')
    //this.isChecked=true;
    this.commonService.headcontainer.subscribe(title => {
      this.currentTittle = title;
    });
    
    this.sidenaveService.lisentingRole().subscribe(res => {
      this.isChecked=res;
    });
    this.commonService.badgeNumber.subscribe(cnt => {
      if(cnt){
      this.cartCount = cnt;}
      else{this.cartData = '0';}
    })
    //this.cartCount = localStorage.getItem('badgeCount');
    this.setHeader();    
    this.route.queryParamMap.subscribe(params => {this.dcode = this.route.snapshot.queryParamMap.get('dealerId');
    this.dname = this.route.snapshot.queryParamMap.get('Name');
    this.isAdmin = this.route.snapshot.queryParamMap.get('ad')});
    if(this.dcode != null){
    this.DealerCode = this.dcode;
    localStorage.setItem('dealercode',this.DealerCode);
    localStorage.setItem('admin',this.isAdmin)}else{
      this.DealerCode = localStorage.getItem('dealercode');
      this.isAdmin = localStorage.getItem('admin');
    }
    if(this.dname != null || this.dname != null){
      this.Name = this.dname;localStorage.setItem('Name',this.dname);}else{
        this.Name = localStorage.getItem('Name');
      }     
     console.log('isadmin',this.isAdmin)
     console.log('ischecked',this.isChecked)
     //this.roleChanged();
  //   this.route.queryParams.subscribe(params => {
  //     this.DealerCode = this.route.snapshot.queryParamMap.get('dealerId');  
  //     if(sessionStorage.getItem('dealercode') == '0' || sessionStorage.getItem('dealercode') == null) {
  //     sessionStorage.setItem('dealercode',this.DealerCode)  }else{
  //       //localStorage.setItem('dealercode',"0")
  //       //this.DealerCode = sessionStorage.getItem('dealercode');
  //     }      
  // });
  }
  ngOnInit(){
    this.sidenaveService.listenMenu().subscribe(res => {
      this.toggleSidenav.emit();
    });
    // this.sidenaveService.lisentingRole().subscribe(res => {
    //  this.isChecked.emit();
    // });
    // this.sidenaveService.changingRole(this.isChecked); 
    // if(this.isAdmin == 'n' || this.isAdmin == null){
    //   this.
    // }
    //this.getcartDetail();
    //this.cartCount = localStorage.getItem('badgeCount');
   
  //  this.commonService.getCount().subscribe(count => {
  //   this.cartCount = count
  //    console.log(count)
  //   }
  //   );

  }

  fullScreenToggle(): void {}

  setHeader() {
    this.currentUrl = this.router.url;    
    this.currentUrl = this.currentUrl.split("/")[1];
    this.currentUrl = this.currentUrl.split("?")[0];
    if (this.currentTittle=='null') {
      this.currentTittle = this.currentUrl;
      this.currentTittle=this.currentTittle.replace(/_/g,' ');
    }   
  }
  signout() {
    localStorage.clear();
    this.router.navigate(["/session/signin"]);
  }

  clickedFun(){
    this.menuToggle=!this.menuToggle;
  }  
  openCart(){
    this.sidenaveService.togglingSidenav({ type: 'Notification', mode: 'ADD' })
  }
  myOrders(){
    this.sidenaveService.togglingSidenav({});
    this.toggleviewCart.emit()
    this.getOrderDetail()    
    this.toggleSidenav.emit();
  }
  myFeedbck(){ 
    const dialogRef = this.dialog.open(FeedbackEntryHomeComponent, {
      data: {title:this.isChecked},
      width:"750px",
      height:"500px"      
    });    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);     
    });   
  }
  getOrderDetail() {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/GetECatOrders?CUSTOMER_ID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            if(resp.data.length){
            this.ordersList = resp.data;
            this.commonService.orderlist = this.ordersList;            
            this.router.navigate(['/profile/orders']);            
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
  goToCart(){
    //this.getcartDetail();
    if( this.cartCount > 0){
    this.router.navigate(['/cart']);}else
    {
      this.toaster.infoToastr("No Items in the Cart");
    }
  }
  roleChanged(){
    localStorage.setItem('role',this.isChecked)
    this.sidenaveService.changingRole(this.isChecked);     
  }
  getcartDetail() {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/GetECartDetails?CUSTOMER_ID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            if(resp.data.length){
            this.cartData = resp.data; 
            // localStorage.removeItem('badgeCount');
            // localStorage.setItem('badgeCount',this.cartData.length);     
            //this.commonService.sentbadge(this.cartData.length);    
            //this.calculateTotal(); 
            }else{
              // localStorage.removeItem('badgeCount');
              // localStorage.setItem('badgeCount','0');
              this.commonService.sentbadge('0');   
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

        }
      );      
  }
  getDealerData(){
    this.masterdata.getReq('','api/Catalouge/getDealerData?DealerID='+this.dcode).subscribe(
    (resp:any)=>
    {
      if(resp && resp.statusCode == 200){
        if(resp.data.length){
          this.delrData = resp.data;
          if(!this.delrData.IsActive){
            alert("Dealer " + this.dcode + " is InActive");
            this.router.navigate(['/error']); 
            return;
          }
          this.Name = this.delrData.DealerName
          localStorage.setItem('Name',this.Name);
        }else{
          alert("Dealer " + this.dcode + " is InValid");
          this.router.navigate(['/error']);
          return;
        }
      }
      // if(resp && resp.statusCode == 500){
      //   alert("Invalid Dealer");
      //   this.router.navigate(['/error']);
      //   return;
      // }
    }, error => {
      if (error.status == 401) {
        // this.loginService.logout();
      }
      this.toaster.errorToastr(error.statusMessage);      
    }
    )
    }
}
