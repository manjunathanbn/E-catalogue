/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { CommonService } from 'src/app/Services/common.service'

@Component({
  selector: 'app-p-scooty',
  templateUrl: './p-scooty.component.html',
  styleUrls: ['./p-scooty.component.scss']
})
export class PScootyComponent implements OnInit {
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
  constructor(private masterServices:MasterdataService,private router: Router,public toaster:ToastrManager,private commonservice:CommonService) { }

  ngOnInit(): void {
    this.getPaintMopedDetail();
  }
  tabChanges($event){
    if(this.setTab > 0){
      this.filterInnerTab = this.innerTab.filter(item => item.name == this.tabData[this.setTab].ModelID); 
      this.ImageChanges(this.filterInnerTab[0].ModelID);
      console.log("test")  
      //this.selectedTab = this.setTab;
    }
    else if(this.tabData[$event.index].ModelID>0)
    {
      this.filterInnerTab = this.innerTab.filter(item => item.name == this.tabData[$event.index].ModelID); 
      this.ImageChanges(this.filterInnerTab[0].ModelID);
      console.log("test")     
    }
    else
    {
      this.filterInnerTab = this.innerTab;
    }
    
    // if(this.selectedTab==1){
    //   this.paintedImg="paintedBike";
    // this.imageData=[{"image":'1',name:"Red"},{"image":'2',name:"Red Mix"},{"image":'3',name:"Ash"}];
    // }
    // else{
    //   this.paintedImg="paintedModule";
    // this.imageData=[{"image":'1',name:"Red"},{"image":'2',name:"Red Mix"},{"image":'3',name:"Ash"},{"image":'4',name:"Yellow"},{"image":'5',name:"Blue"},{"image":'6',name:"Green"},]

    // }
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
  gotoDetail(ModelID,ColorID){    
    this.commonservice.param1 = ModelID;
    this.commonservice.param2 = ColorID;
    this.commonservice.selectTab = this.setTab;
    this.router.navigate(['painted/paintedDetail']);
  }
  getPaintMopedDetail() {
    // this.isShowPageLoader = true;
    this.masterServices.getReq('', 'api/Catalouge/GetPaintedModelDetails?Type=SCOOTY').subscribe(
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

}
