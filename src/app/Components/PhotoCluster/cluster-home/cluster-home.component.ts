/*tslint:disable*/
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from "rxjs";
import { partition } from 'rxjs';
import { CommonService } from 'src/app/Services/common.service';
@Component({
  selector: 'app-cluster-home',
  templateUrl: './cluster-home.component.html',
  styleUrls: ['./cluster-home.component.scss']
})
export class ClusterHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;  
  myThumbnail="assets/Images/Icon/ccp_parts_old.gif";
  myFullresImage="assets/Images/Icon/ccp_parts_old.gif";
  mydefaultImage="assets/Images/Icon/ccp_parts_old.gif";
  panelOpenState = false;
  dataSource:any=[];
  responseData:any={
    "CCategory":[],
    "CModel":[],
    "CClusterDO":[],
    "CParts":[]
  };
  modelId:string;
  CatID:string;
  ClustId:string;
  PartId:string;
  addCart : any = [{
    custID:0,
    dealerID:0,
    cartid:0,
    parts:[],
    status:0,
    series:""
  }    
  ]
  private _document: any;
  constructor(private masterServices:MasterdataService, private commonService: CommonService, private customLoader: NgxUiLoaderService, private router: Router,public toaster:ToastrManager) { }
  ngOnInit() {   
    this.getClusterDetail();    
  }

  imageZoom(imgID, resultID) {
    alert(imgID + resultID)
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lens:*/
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /*prevent the lens from being positioned outside the image:*/
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }
  getClusterDetail() {
    // this.isShowPageLoader = true;
    this.customLoader.start();
    this.masterServices.getReq('', 'api/Catalouge/GetClusterMaster?').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.responseData = resp.data;
            console.log("test")                   
          }
          if (resp && resp.statusCode == 401) {
            this.signout();
          }
          this.customLoader.stop();
     }, error => {
          if (error.status == 401) {
          this.signout();
          }
          // this.isShowPageLoader = false;
           this.toaster.errorToastr(error.statusMessage);
        }
      );
      
  }
  getModelwise(item) {
    // this.isShowPageLoader = true;
    this.customLoader.start();
    this.masterServices.getReq('', 'api/Catalouge/GetModelWise?SegID='+this.CatID).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.responseData.CModel = resp.data.CModel;
            console.log("test")            
          }
          if (resp && resp.statusCode == 401) {
            this.signout();
          }
          this.customLoader.stop();
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
  searchNew(CatID,modelId,ClustId,PartId){
    if(CatID == undefined || modelId == undefined || modelId == 0){
     this.toaster.warningToastr("PLease select Any one");
     return;
    }
    console.log("tetete",modelId,ClustId,PartId)

    if(CatID == undefined){
      CatID = 0;
    }
    if(modelId == undefined){
      modelId = 0;
    }
    if(ClustId == undefined){
      ClustId = 0;
    }
    if(PartId == undefined){
      PartId = 0;
    }
    this.masterServices.getReq('', 'api/Catalouge/GetCatlogDetails?modelId='+modelId+'&CatID='+CatID+'&ClustId='+ClustId+'&PartId='+PartId).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            if(resp.data.length > 0){
            this.dataSource = resp.data; 
            }else
            {
              this.toaster.infoToastr("No Data to Display");
            }          
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
        }else{
          this.toaster.warningToastr("Pease Enter the Qty")
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
      this.customLoader.start();
    this.masterServices.post(req, 'api/Catalouge/AddUpdateToCart').subscribe(
      (resp: any) => 
     {
      {
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
          }
     }, error => {
          if (error.status == 401) {
          this.signout();
          }
          this.customLoader.stop();
           this.toaster.errorToastr(error.statusMessage);
        }
      );
  }
  getValue(e){
   //this.CatID = this.responseData.CCategory[i];
  }
  refreshPage() {    
    window.location.reload();
  }
  checked(i,e){
    if(e.checked){
   this.dataSource[i].IsSelect = true;   
    }
    else
    {this.dataSource[i].IsSelect = false; this.dataSource[i].qty = null}
  }
  openGroup(e,i){
    this.panelOpenState = true;
    this.myFullresImage = this.dataSource[i].clusterImg
    this.myThumbnail = this.dataSource[i].clusterImg

  }
}



