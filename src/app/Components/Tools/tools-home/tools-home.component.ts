/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { MatDialog } from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SidenavService } from '../../../Services/sidenave.service';
import { PopupComponent } from '../../../Shared/popup/popup.component';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';
export interface PeriodicElement {
  refNo: any;
  partNo: number;
  partName: any;
  xlSup: any;
  xlSupHd: any;
  tvsSport: any;
  //xlSupUpg: any;
  //xlSupUpgHd: any;
  ord:any;
  ndp:any;
  moq:any;
  stock:any;
  //remarks:any;
}


@Component({
  selector: 'app-tools-home',
  templateUrl: './tools-home.component.html',
  styleUrls: ['./tools-home.component.scss','../../../core/header/header.component.scss']
})
export class ToolsHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
  pointSize = 10;
  removepointSize:any=0;
  element: Element;
  root: Element;
  ctx;
  canvas;
  imgVar='assets/Images/engine.png'; 
  dataSource:any=[];
toolsData:any={head:[{id:1,name:"Dynamic 1"},{id:2,name:"Dynamic 2"}],url:"tools/toolsDetail"};
  toolsHeader: any;
  toolsParts: any;
  dataSource1: any;
  addCart : any = [{
    custID:0,
    dealerID:0,
    cartid:0,
    parts:[],
    status:0,
    series:""
  }]    
  constructor(public dialog: MatDialog,public toaster:ToastrManager,public sidenaveService:SidenavService,private masterServices:MasterdataService,private commonService: CommonService,private router: Router ) { }

  ngOnInit(): void {
    this.GetformLoadData();
    
    //this.sidenaveService.togglingMenu({});
  }
  GetformLoadData(){
    this.masterServices.getReq('', 'api/Catalouge/GeTSpecialToolDetails?').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.dataSource1 = resp.data;
            this.toolsHeader = this.dataSource1.Headers;
            this.toolsParts = this.dataSource1.Parts;
            // this.toolsParts.filter(key=>{
            //   key.qty=1;
            // })
            //console.log("parts",this.dataSource1)           
           }
          if (resp && resp.statusCode == 401) {    
            this.toaster.errorToastr(resp.message);        
          }
     }, error => {
          if (error.status == 401) {          
            this.toaster.errorToastr(error.statusMessage);
           }         
           this.toaster.errorToastr(error.statusMessage);
        }
      );
  }



filterItemsofTseries(tser){
  let filterdata:any= [];
  filterdata =  this.toolsParts.filter(x => x.TruSeries === tser);
  return filterdata;
}
onTabChanged(e)
{
  // if(e.index > 0){
  // this.toaster.infoToastr("No Consumables for this Segment");}
}
addToCart(){
  this.addCart.custID = localStorage.getItem('dealercode');
  this.addCart.dealerID = localStorage.getItem('dealercode');
  this.addCart.series = "0";
  let ipart=[];
  for(let i=0;i<this.toolsParts.length;i++){
      if(this.toolsParts[i].IsSelect){
        if(this.toolsParts[i].qty > 0){
        var obj:any={
          "PART_NO":this.toolsParts[i].PartNO,
          "ORDER_QTY":this.toolsParts[i].qty          
        }
      }else
        {
          this.toaster.warningToastr("Please enter the Quantity");
          return;
        }
        ipart.push(obj);
      }        
  }
  this.addCart.parts = ipart;
  this.addCart.status = 1;
  let req = {"custID":this.addCart.custID,"dealerID":this.addCart.dealerID,"status":this.addCart.status,
     "parts":this.addCart.parts,"series":this.addCart.series
    }
    //this.isShowLoader = true;
  this.masterServices.post(req, 'api/Catalouge/AddUpdateToCart').subscribe(
    (resp: any) => 
   {
        if (resp && resp.statusCode == 200) {
          if(resp.message == "Part Added Successfully")
          {
            this.toaster.successToastr("Part Added Successfully");
            //window.location.reload();
            this.commonService.sentbadge(resp.data);
          }
          else if(resp.message == "Part Updated Successfully"){
          this.toaster.successToastr("Part Updated Successfully");}
          else{
            this.toaster.warningToastr(resp.statusMessage);
            this.commonService.sentbadge(resp.data);
          }  
          this.refreshPage();            
           
        }
        if (resp && resp.statusCode == 401) {
          //this.refreshPage();
          //this.commonService.sentbadge(resp.data);
        }
   }, error => {
        if (error.status == 401) {
        //this.signout();
        }
         //this.isShowLoader = false;
         this.toaster.errorToastr(error.statusMessage);
      }
    );
}
refreshPage() {
  this.GetformLoadData();
}
checked(i,e,part){
  if(!e.checked){
    this.toolsParts[i].qty = 0;
  }   
}

}
