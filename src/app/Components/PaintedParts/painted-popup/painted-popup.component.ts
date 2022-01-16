/*tslint:disable*/
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { CommonService } from 'src/app/Services/common.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-painted-popup',
  templateUrl: './painted-popup.component.html',
  styleUrls: ['./painted-popup.component.scss']
})
export class PaintedPopupComponent implements OnInit {
  dataSource: any;
  responseData: any;
  paintedImg: any;
  tabData: any;
  innerTab: any;
  imageData: any;
  filterimageTab: any;
   setTab:any=0;
   selectedTab:any=0;
  filterInnerTab: any;

  constructor(
    public dialogRef: MatDialogRef<PaintedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private masterdata: MasterdataService, private toaster: ToastrManager) {
      this.dataSource = new MatTableDataSource();
    }

  ngOnInit(): void {
    
    this.getPainteSeg2Detail();
  }
  getPainteSeg2Detail(){
    this.masterdata.getReq('', 'api/Catalouge/getPainteSeg2Detail?Type=MOTORCYCLE&dealerId='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.responseData = resp.data;
            this.paintedImg = this.responseData.paintedImg;
            this.tabData = this.responseData.tabData;
            this.innerTab = this.responseData.innerDate;
            this.imageData = this.responseData.imageData;

            this.tabData = this.tabData.filter(tab => tab.name === this.data.mainTab);
            //this.innerTab = this.innerTab.filter(tab1 => tab1.s_levelName === this.data.innerTab);
            

            //this.setTab = this.commonservice.selectTab;
            //this.commonservice.selectTab = undefined;
            // this.isShowPageLoader = false;
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
  ImageChanges(ModelID){
    if(ModelID>0)
    {
      this.filterimageTab = this.imageData.filter(item => item.ModelID == ModelID); 
      this.paintedImg = this.filterimageTab[0].image2;
      console.log("test")     
    }
    else
    {
       this.filterimageTab = this.imageData.filter(item => item.ModelID == this.innerTab[0].ModelID);
    }
  }
  tabChanges($event){
    if(this.setTab > 0){
      this.filterInnerTab = this.innerTab.filter(tab1 => tab1.s_levelName === this.data.innerTab);
      //this.filterInnerTab = this.innerTab.filter(item => item.name == this.tabData[this.setTab].ModelID); 
      this.ImageChanges(this.filterInnerTab[0].ModelID);
      console.log("test")  
      //this.selectedTab = this.setTab;
    }
    else if(this.tabData[$event.index].ModelID>0)
    {
      this.filterInnerTab = this.innerTab.filter(tab1 => tab1.s_levelName === this.data.innerTab);
      //this.filterInnerTab = this.innerTab.filter(item => item.name == this.tabData[$event.index].ModelID); 
      this.ImageChanges(this.filterInnerTab[0].ModelID);
      console.log("test")     
    }
    else
    {
      this.filterInnerTab = this.innerTab;
    }
   }

}
