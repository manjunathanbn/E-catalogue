/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from 'src/app/Services/common.service';

export interface PeriodicElement {
  
  refNo: any;
  partNo: number;
  partName: any;
  xlSup: any;
  xlSupHd: any;
  tvsSport: any;
  ord:any;
  ndp:any;
  moq:any;
  stock:any;
}

@Component({
  selector: 'app-consumables-home',
  templateUrl: './consumables-home.component.html',
  styleUrls: ['./consumables-home.component.scss', '../../../core/header/header.component.scss']
})
export class ConsumablesHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
  public isShowLoader = false;
  currIndex:any=0;
  dataSource:any = {};
  addCart : any = [{
    custID:0,
    dealerID:0,
    cartid:0,
    parts:[],
    status:0,
    series:""
  }]    
  consumableHeader:any = [];
  consumableParts:any = [];
  myFullresImage: any;
  myThumbnail: any;
  constructor(private masterServices:MasterdataService,private commonService: CommonService,private router: Router,public toaster:ToastrManager) { }

  ngOnInit(): void {
    this.GetformLoadData();    
  }
  ngAfterViewInit() {
    // this.consumableParts.filter(key=>{
    //   key.qty=1;
    // }) 
    }
  GetformLoadData(){
    this.masterServices.getReq('', 'api/Catalouge/GetConsumablesDetails?').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.dataSource = resp.data;
            this.consumableHeader = this.dataSource.Headers;
            this.consumableParts = this.dataSource.Parts;            
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
  filterItemsofTseries(tser,j){
    let filterdata:any= [];
    filterdata =  this.consumableParts.filter(x => x.TruSeries === tser);    
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
    for(let i=0;i<this.consumableParts.length;i++){
        if(this.consumableParts[i].IsSelect){
          if(this.consumableParts[i].qty > 0){
          var obj:any={
            "PART_NO":this.consumableParts[i].PartNO,
            "ORDER_QTY":this.consumableParts[i].qty          
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
           this.isShowLoader = false;
           this.toaster.errorToastr(error.statusMessage);
        }
      );
  }
  refreshPage() {
    this.GetformLoadData();
  }
  checked(i,e,part){
    if(!e.checked){
      this.consumableParts[i].qty = 0;
    }else{
      this.consumableParts[i].qty = 1;
    }   
  }
}
