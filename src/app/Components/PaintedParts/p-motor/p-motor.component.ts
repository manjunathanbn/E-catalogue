/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { CommonService } from 'src/app/Services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { PaintedPopupComponent } from '../painted-popup/painted-popup.component';

@Component({
  selector: 'app-p-motor',
  templateUrl: './p-motor.component.html',
  styleUrls: ['./p-motor.component.scss']
})
export class PMotorComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
  tabData:any=[];
  imageData:any=[];
  innerTab:any=[];
  filterInnerTab:any=[]
  filterimageTab:any=[]
  selectedTab:any=0;
  setTab:any=0;
  paintedImg: string;
  responseData:any={
    "paintedImg":"",
    "tabData":[],
    "innerTab":[],
    "imageData":[]
  };
  constructor(public dialog: MatDialog,private masterServices:MasterdataService,private router: Router,public toaster:ToastrManager,private commonservice:CommonService) { }
  ngOnInit(): void {
    this.getPaintMopedDetail();
  }
  tabChanges($event){
    if(this.commonservice.paramgrp){
      this.selectedTab = this.commonservice.paramgrp;
      this.commonservice.paramgrp = null
      this.filterInnerTab = this.innerTab.filter(item => item.name == this.tabData[this.setTab].ModelID); 
      this.ImageChanges(this.filterInnerTab[this.selectedTab].ModelID,this.selectedTab);
      return;
    }
    if(this.setTab > 0){
      this.filterInnerTab = this.innerTab.filter(item => item.name == this.tabData[this.setTab].ModelID); 
      this.ImageChanges(this.filterInnerTab[0].ModelID,0);
      console.log("test")  
      //this.selectedTab = this.setTab;
    }
    else if(this.tabData[$event.index].ModelID>0)
    {
      this.filterInnerTab = this.innerTab.filter(item => item.name == this.tabData[$event.index].ModelID); 
      this.ImageChanges(this.filterInnerTab[0].ModelID,0);
      console.log("test")     
    }
    else
    {
      this.filterInnerTab = this.innerTab;
    }
   }
  ImageChanges(ModelID,i){
    //this.selectedTab = i;
    if(ModelID>0)
    {
      this.filterimageTab = this.imageData.filter(item => item.ModelID == ModelID); 
      this.paintedImg = this.filterimageTab[0].image2;
      console.log("test")     
    }
    else
    {     
      this.openDialog(this.tabData[this.setTab].name,this.filterInnerTab[i].s_levelName);
      //if(this.filterInnerTab[0].is)
      //this.filterimageTab = this.imageData.filter(item => item.ModelID == this.innerTab[0].ModelID);
    }
  }
  gotoDetail(ModelID,ColorID){    
    this.commonservice.param1 = ModelID;
    this.commonservice.param2 = ColorID;
    this.commonservice.selectTab = this.setTab;
    this.commonservice.paramgrp = this.selectedTab;
    this.router.navigate(['painted/paintedDetail']);
  }
  getPaintMopedDetail() {
    // this.isShowPageLoader = true;
    this.masterServices.getReq('', 'api/Catalouge/GetPaintedModelDetails?Type=MOTORCYCLE&dealerId='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.responseData = resp.data;
            this.paintedImg = this.responseData.paintedImg;
            this.tabData = this.responseData.tabData;
            this.innerTab = this.responseData.innerDate;
            this.imageData = this.responseData.imageData;
            this.setTab = this.commonservice.selectTab;
            this.commonservice.selectTab = undefined;
            // this.isShowPageLoader = false;
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
  openDialog(maintb,innertb) {
    const dialogRef = this.dialog.open(PaintedPopupComponent,{
      data:{mainTab:maintb,innerTab:innertb},
      width:"950px"    
    });
  
    dialogRef.afterClosed().subscribe(result => {
      var temp:any[];
      if(result){        
        this.gotoDetail(result.ModelID,result.ColorID);
        //console.log("select",this.selectedTab)
        
      }
    });
  }

}
