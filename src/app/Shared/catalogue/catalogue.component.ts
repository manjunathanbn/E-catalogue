/*tslint:disable*/
import { Component, OnInit, Input, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { SidenavService } from 'src/app/Services/sidenave.service';
import { CommonService } from 'src/app/Services/common.service';
@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class CatalogueComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
@Input() tabData;
element: Element;
root: Element;
ctx;
canvas;
imgTool:any="";
imgVar:any;
assemlyData:any=[];
coordMatch:any[];
assemblePart:any[];
setTab:any=0;
  bckdata: any;

  constructor(public router:Router,public sidenaveService:SidenavService,public dialog: MatDialog,private commonservice:CommonService,private masterdata: MasterdataService, private toaster: ToastrManager) {
    
   }
   @HostListener('mousemove', ['$event'])
   onMouseMove(event : MouseEvent) {    
    console.log(`x: ${event.clientX}, y: ${event.clientY}`);
    let curleft = 0,
      curtop = 0;    
    curleft += event.offsetX;
    curtop += event.offsetY;
    //this.imgTool = "";
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    // var tooltipSpan = document.getElementById('canvas');
    // var rect = this.canvas.getBoundingClientRect();    
      let  x1: number =  event.offsetX //- rect.left;
      let  y1: number = event.offsetY //- rect.top;
      let data:any = []
      console.log("123",this.assemblePart);
      if(this.assemblePart.length > 0){
      data = getmatchData(x1,y1,this.assemblePart)
      console.log("data",data);
    }    
    if(data.length){     
      this.imgTool = data[0].ASSEMBLY_NAME
    }
      console.log(curleft,curtop);    
  }

  ngOnInit(): void {
    
    
  }
  ngAfterViewInit():void{  
    this.setTab = this.commonservice.selectTab;
    this.bckdata = this.commonservice.paramgrp;
    this.commonservice.selectTab = 0;
    this.commonservice.paramgrp = null;   
    console.log("tabdata",this.tabData) 
    if(this.setTab > 0){
      this.getMopedDetail(0,this.tabData.head[this.setTab].id)
    }
    else if(this.tabData.head.length > 0){
      this.getMopedDetail(0,this.tabData.head[0].id)
    }  
    if(this.bckdata){
      if(this.bckdata.IS_SUBASSEMBLY_ID == true){
        this.openPopup(this.bckdata);
        this.bckdata=null;
      }
    }    
    document.getElementById("myBtn").style.height = "50px";
    this.imgresize();
  }
  imgresize(){
        var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();

    img.onload = function () {

        // set size proportional to image
        canvas.height = canvas.width * (img.height / img.width);

        // step 1 - resize to 50%
        var oc = document.createElement('canvas'),
            octx = oc.getContext('2d');

        oc.width = img.width * 0.5;
        oc.height = img.height * 0.5;
        octx.drawImage(img, 0, 0, oc.width, oc.height);

        // step 2
        octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

        // step 3, resize to final size
        ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
        0, 0, canvas.width, canvas.height);
    }
    console.log("imgpath",this.tabData[0].image)
    img.src = this.tabData[0].image;

  }
  openPopup(data){
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {title:'part',data:data}
    });    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      // this.commonservice.param1 = result.SERIES;
      // this.commonservice.param2 = result.ASSEMBLY_ID;      
     if(result)this.router.navigate([this.tabData.url],{ queryParams: {param1: result.SERIES, param2:  result.ASSEMBLY_ID}})
    });
  }
  getPosition(event,id) {
    //this.getMopedDetail(id);
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    
    let curleft = 0,
      curtop = 0;

    curleft += event.offsetX;
    curtop += event.offsetY;
    console.log("FFFFFFf",curleft, curtop)
    
    this.getmatchData(curleft,curtop)
    if(this.coordMatch.length > 0)
    {
      //this.tabData.url!='scooter/scooterDetail'
      this.commonservice.selectTab = this.setTab;
      this.commonservice.paramgrp = this.coordMatch[0];
      if(!this.coordMatch[0].IS_SUBASSEMBLY_ID){      
      // this.commonservice.param1 = this.coordMatch[0].SERIES;
      // this.commonservice.param2 = this.coordMatch[0].ASSEMBLY_ID;
      this.router.navigate([this.tabData.url],{ queryParams: {param1: this.coordMatch[0].SERIES, param2:  this.coordMatch[0].ASSEMBLY_ID}})}
      else{
        this.openPopup(this.coordMatch[0])
      }
    }
    else{
      return;
    }
    // else{ this.toaster.infoToastr('No Data for Selected Assembly') }
    //this.drawCoordinates(curleft, curtop);
    
  }
  getmatchData(x,y1)
  {
    let cordinates=[];
            let xMax=x+5;
            let xMin=x-5;
            let yMax=y1+5;
            let yMin=y1-5;
            let arr=[];
            for(var i=xMin;i<xMax;i++){
              for(var y=yMin;y<yMax;y++){
                let obj={x:i,y:y};
                this.coordMatch = this.filterItemsOfType(i,y)
                arr.push(obj);
                cordinates=arr;    
                if(this.coordMatch.length > 0)
                {
                  return true;
                  break;
                }        
              }
              if(this.coordMatch.length > 0)
                {
                  return true;
                  break;
                }
            }
  }
  getMopedDetail(event,id) {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/GetVehCoordinatesbySeries?series='+id).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.assemlyData = resp.data; 
            this.assemblePart = resp.data.coordinates;
            console.log("321",this.assemblePart)
            if(event != 0){
              this.getPosition(event,id)
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
  filterItemsOfType(x1,y){
    
    const ele = [x1,y];
    let comb = ele.join();
    let filterdata:any= [];
    filterdata =  this.assemlyData.coordinates.filter(x => x.COORDINATES == [x1,y,x.COORDINATES.split(",")[2]].join());
    return filterdata;
  }
  tabChanges(event)
  {
    if(this.tabData.head.length > 0){
      this.getMopedDetail(event,this.tabData.head[event.index].id)
    }
  }
}
function getmatchData(x: number, y1: number,test:any): any {
  let cordinates=[];
  let filterdata:any= [];
            let xMax=x+5;
            let xMin=x-5;
            let yMax=y1+5;
            let yMin=y1-5;
            let arr=[];
            
            for(var i=xMin;i<xMax;i++){
              for(var y=yMin;y<yMax;y++){
                   
                 filterdata =  test.filter(x2 => x2.COORDINATES == [i,y,x2.COORDINATES.split(",")[2]].join());
                  
                if(filterdata.length > 0)
                {
                  return filterdata;                
                  break;
                }        
              }
              if(filterdata.length > 0)
                {
                  return filterdata;
                  break;
                }
            }

}

