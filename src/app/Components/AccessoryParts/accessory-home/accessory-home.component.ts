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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  selector: 'app-accessory-home',
  templateUrl: './accessory-home.component.html',
  styleUrls: ['./accessory-home.component.scss','../../../core/header/header.component.scss']
})
export class AccessoryHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
  public isShowLoader = false;
  currIndex:any=0;
  dataSource:any = [];
  addCart : any = [{
    custID:0,
    dealerID:0,
    cartid:0,
    parts:[],
    status:0,
    series:""
  }    
  ]
  // dataSource :any=[
  //   {
  //     selected:true,
  //     partNo:"TR600400",
  //     partDesc:"TVS TRU4 RACE PRO SYNTHETIC  ENGINE OIL 15W50",
  //     capacity:"1700ML",
  //     ndp:"1,083.05",
  //     mrp:1750,
  //     img:"TR600400.PNG",
  //     proImage:"TRU4 Synthetic-1.jpg"
  //   },
  //   {
  //     selected:false,
  //     partNo:"TR600200",
  //     partDesc:"TVS TRU4 SYNTHETIC ENGINE OIL 10W30",
  //     capacity:"1200ML",
  //     ndp:"445.51",
  //     mrp:685,
  //     img:"TR600200.PNG",
  //     proImage:"TRU4 Chain Spray-1.jpg"
  //   },
  //   {
  //     selected:false,
  //     partNo:"TR600030",
  //     partDesc:"TVS TRU4 SYNTHETIC ENGINE OIL 10W30",
  //     capacity:"1000ML",
  //     ndp:"382.29",
  //     mrp:570,
  //     img:"TR600030.PNG",
  //     proImage:"TRU4 Synthetic-1.jpg"
  //   },
  // ];
chkClr:any="green";
  //paintedData:any=[{id:1,name:"TRU4 Synthetic"},{id:2,name:"TRU4 Skuuta"},{id:3,name:"TRU4 Kraaft"}];
  paintedData:any=[{id:1,name:"MOPED"},{id:2,name:"SCOOTER"},{id:3,name:"MOTORCYCLE"},{id:4,name:"SCOOTY"}]
  private _document: any;
  constructor(private masterServices:MasterdataService,private commonService: CommonService,private router: Router,public toaster:ToastrManager) {
    this.getAccessoryParts();
   }

  ngOnInit(): void {    
    this.dataSource.filter(key=>{
      key.ord=key.moq;
    })
  }
  //displayedColumns: string[] = ['selected', 'partNo', 'partName', 'qv', 'ndp','moq','ord','val','rks'];

  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.refNo + 1}`;
  }

  itemSelected(i){
    this.dataSource[i].selected=!this.dataSource[i].selected;
  }
  getAccessoryParts() {
    // this.isShowPageLoader = true;
    this.masterServices.getReq('', 'api/Catalouge/GetAccessoryParts?').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.dataSource = resp.data;
           }
          if (resp && resp.statusCode == 401) {
            this.signout();
          }
     }, error => {
          if (error.status == 401) {
          this.signout();
          }
          // this.isShowPageLoader = false;
           this.toaster.errorToastr(error.statusMessage);
        }
      );
  }
  signout() {
    localStorage.clear();
    this.router.navigate(["/session/signin"]);
  }
  filterItemsOfType(type){
    let filterdata:any= [];
    filterdata =  this.dataSource.filter(x => x.type == type);
    return filterdata;
}
onTabChanged(e)
{
  if(e.index > 0){
  this.toaster.infoToastr("No Accessories for this Module");}
}
addToCart(){
  this.addCart.custID = localStorage.getItem('dealercode');
  this.addCart.dealerID = localStorage.getItem('dealercode');
  this.addCart.series = "0";
  let ipart=[];
  for(let i=0;i<this.dataSource.length;i++){
      if(this.dataSource[i].IsSelect){
        if(this.dataSource[i].qty > 0){
        var obj:any={
          "PART_NO":this.dataSource[i].partNo,
          "ORDER_QTY":this.dataSource[i].qty          
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
          //this.ngOnInit();        
           //this.isShowLoader = false;
           
        }
        if (resp && resp.statusCode == 401) {
          this.refreshPage();
          this.commonService.sentbadge(resp.data);
        }
   }, error => {
        if (error.status == 401) {
        this.signout();
        }
         this.isShowLoader = false;
         this.toaster.errorToastr(error.statusMessage);
      }
    );
}
refreshPage() {
 this.getAccessoryParts();
  //this.dataSource = [];
  //this.paintedData = [];
  //window.location.reload();
  //this._document.defaultView.location.reload();
}
checked(i,e,part){
  if(!e.checked){
    this.dataSource[i].qty = 0;
  }
  //if(e.checked && this.dataSource.filter(x => x.type == 1)){
    //this.dataSource.foreach(x => x.partNo == part && x.type == 1{x.IsSelect = true})
 //this.dataSource[i].IsSelect = true;   
  //}else{this.dataSource.IsSelect = false;}
}

}
