/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
@Component({
  selector: 'app-kids-home',
  templateUrl: './kids-home.component.html',
  styleUrls: ['./kids-home.component.scss']
})
export class KidsHomeComponent implements OnInit {
  displayedColumns: string[] = ['kitNo', 'kitDes', 'partNo', 'partDes', 'qty'];
  responseData: any = {
    CCategory: [],
    CModel: [],
    CClusterDO: [],
    CParts: []
  };
  modelId: string;
  CatID: string;
  KitId: string;
  PartId: string;
  KitAppy:any
  dataSource = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  tempsublist: any;
  tempPartslist: any;
  kitview: any;
  kitname: any;
  dataSourceTemp: any[];
  constructor(private masterServices: MasterdataService, public toaster: ToastrManager) { }


  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    //this.getClusterDetail(); 
    this.getKitData();
  }
  getClusterDetail() {
    // this.isShowPageLoader = true;
    //this.customLoader.start();
    this.masterServices.getReq('', 'api/Catalouge/GetKitsMaster?').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.responseData = resp.data;
            console.log("test")                   
          }
          if (resp && resp.statusCode == 401) {
               }        
     }, error => {
          if (error.status == 401) {
          
          }
          // this.isShowPageLoader = false;
           this.toaster.errorToastr(error.statusMessage);
        }
      );
      
  }
  getModelwise(item) {

    if(this.CatID){
      //this.responseData.CModel = this.tempsublist.filter(key => key.SEG == this.CatID)
      let list = this.tempsublist.filter(key => key.SEG == this.CatID) 
      this.responseData.CModel = [...new Map(list.map(item =>
      [item["MODEL"], item])).values()];
    }else
    {
      this.toaster.warningToastr("Select the Catagory")
      return;
    }
    // this.isShowPageLoader = true;
    //this.customLoader.start();
    // this.masterServices.getReq('', 'api/Catalouge/GetKitModelWise?CatID='+item).subscribe(
    //   (resp: any) => 
    //  {
    //       if (resp && resp.statusCode == 200) {
    //         this.responseData.CModel = resp.data.CModel;
    //         console.log("test")            
    //       }
    //       if (resp && resp.statusCode == 401) {
    //         this.signout();
    //       }
    //      // this.customLoader.stop();
    //  }, error => {
    //       if (error.status == 401) {
    //       this.signout();
    //       }
    //       // this.isShowPageLoader = false;
    //        this.toaster.errorToastr(error.statusMessage);
    //     }
    //   );
      
  }
  getModelApply(item) {

    if(this.CatID && this.modelId){
      //this.responseData.CModel = this.tempsublist.filter(key => key.SEG == this.CatID)
      let list = this.tempsublist.filter(key => key.SEG == this.CatID) 
      this.responseData.CClusterDO = [...new Map(list.map(item =>
      [item["MODEL_APPL"], item])).values()];
    }
    else
    {
      this.toaster.warningToastr("Select the Specific Model")
      return;
    }
    // this.isShowPageLoader = true;
    //this.customLoader.start();
    // this.masterServices.getReq('', 'api/Catalouge/getModelApply?Series='+item).subscribe(
    //   (resp: any) => 
    //  {
    //       if (resp && resp.statusCode == 200) {
    //         this.responseData.CClusterDO = resp.data.CClusterDO;
    //         console.log("test")            
    //       }
    //       if (resp && resp.statusCode == 401) {
    //         this.signout();
    //       }
    //      // this.customLoader.stop();
    //  }, error => {
    //       if (error.status == 401) {
    //       this.signout();
    //       }
    //       // this.isShowPageLoader = false;
    //        this.toaster.errorToastr(error.statusMessage);
    //     }
    //   );
      
  }
  getKitDetail(CatID,modelId,KitId) {
    // this.isShowPageLoader = true;
    //this.customLoader.start();
    if(CatID == undefined && modelId == undefined && KitId == undefined ){
      this.toaster.warningToastr("PLease select Any one");
      return;
     }
     if(CatID == undefined){
      CatID = 0;
    }
    if(modelId == undefined){
      modelId = 0;
    }
    if(KitId == undefined || KitId == 0){
      this.toaster.warningToastr("PLease select Applicable Model");
      return;
    }
    if(KitId){
      this.dataSource = this.tempPartslist.filter(key => key.KIT_ID == this.KitId);
      this.kitview = this.responseData.CParts.filter(key => key.KIT_ID == this.KitId)[0].KIT_PART_NO;
      this.kitname = this.responseData.CParts.filter(key => key.KIT_ID == this.KitId)[0].KIT_DESCRIPTION;
      let irow=[];
      for(let i=0;i<=this.dataSource.length-1;i++){
           if(i==0){
            var obj:any={
              "kitPartNo": this.kitview,
              "kitPartName": this.kitname,
              "PartNo": this.dataSource[i].PART_NO,
              "PartName": this.dataSource[i].PART_DESCRIPTION,
              "Qty": this.dataSource[i].QTY
            }
           }else
           {
            var obj:any={
              "kitPartNo": "",
              "kitPartName": "",
              "PartNo": this.dataSource[i].PART_NO,
              "PartName": this.dataSource[i].PART_DESCRIPTION,
              "Qty": this.dataSource[i].QTY
            }
           }
           irow.push(obj);
      }
      this.dataSourceTemp = irow;
    }
          
  }
  signout() {
    localStorage.clear();
    //this.router.navigate(["/session/signin"]);
  }
  getKitData() {    
    this.masterServices.getReq('', 'api/CatalougeMaster/getPrKitMaster?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.responseData.CCategory = resp.data.SegMaster;
            this.responseData.CModel = resp.data.kitParts;
            this.tempsublist = resp.data.kitParts;
            this.dataSource = resp.data.kPartsDtls;
            this.tempPartslist = resp.data.kPartsDtls;                                       
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  getKitParts(e){
    if(this.CatID && this.modelId && this.KitAppy)
    {
      this.responseData.CParts = this.tempsublist.filter(key => key.MODEL_APPL == this.KitAppy)
    }
    else
    {
      this.toaster.warningToastr("Select the ModelApplicable")
      return;
    }
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
