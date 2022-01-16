/*tslint:disable*/
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
// import {  MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SidenavService } from '../../Services/sidenave.service';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { DOCUMENT, Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from 'src/app/Services/common.service';
import { filter } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
export interface PeriodicElement {
  refNo: any;
  partNo: number;
  partName: any;
  //xlSup: any;
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
  selector: 'app-catalogue-detail',
  templateUrl: './catalogue-detail.component.html',
  styleUrls: ['./catalogue-detail.component.scss','../../core/header/header.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CatalogueDetailComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;  
  @Input() backPath;  
  pointSize = 10;
  removepointSize:any=0;
  element: Element;
  root: Element;
  expandedElement: any;
  ChkNDP:any;
  ctx;
  canvas;
  imgVar:any;
  dataSource:any;
  bogusDataSource = new MatTableDataSource<Element>(null);
  cartData:any=[];
  qvHeader:any;
  qvParts:any;
param1:string;
param2:string;
returnUrl:string
  addCart : any = [{
    custID:0,
    dealerID:0,
    cartid:0,
    parts:[],
    status:0,
    series:""
  }    
  ]
  previousUrl: any;
  dynamicHead: any[];
  
  constructor(private router:Router,private _location:Location, private commonService: CommonService, private customLoader: NgxUiLoaderService,private route:ActivatedRoute, @Inject(DOCUMENT) private _document: Document,public dialog: MatDialog,public toaster:ToastrManager,public sidenaveService:SidenavService,
  private masterServices:MasterdataService) { 
    this.dataSource = new MatTableDataSource();
    
  this.router.routeReuseStrategy.shouldReuseRoute = function(){
    return false;
 }
 router.events
 .pipe(filter(event => event instanceof NavigationEnd))
 .subscribe((event: NavigationStart) => {
   console.log('prev:', event.url);
   this.previousUrl = event.url;
 });
  }

  ngOnInit(): void {
    this.sidenaveService.togglingMenu({});
    if(this.backPath != 'painted'){
      this.route.queryParams
      .subscribe(params => {        
        this.param1 = params.param1;
        this.param2 = params.param2;        
      }
    );
    }else{
      this.param1 = this.commonService.param1;
      this.param2 = this.commonService.param2;
    }
    
    // t
  }
  ngAfterContentInit(){
    if(this.backPath=='painted')
    {
      this.getPaintAssembDetail();
    }
    else
    {
      this.getPartAssembDetail();
    }
  }
  imgsrc(v)
  {
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
img.src = this.imgVar
  }

  //'Stock',
  displayedColumns: string[] = ['select','RefNo', 'PartNo', 'PartName', 'QV','Qty','NDP','MRP','MOQ','Remarks']; 
  dynamiCol:string[] = []; 
  
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

  goBack(){   
    //window.opener.location.reload();
     this._location.back();
  }

  getPosition(event,sta) {
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToDisplaySize(this.canvas);
    //ctx.fillStyle = "#DDE";
    // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // this.ctx.save();
    var rect = this.canvas.getBoundingClientRect();
    let curleft = 0,
      curtop = 0;      
    curleft += event.offsetX;
     curtop += event.offsetY;
    this.dataSource.filter((key,index)=>{
      key.cordinates.filter(coo=>{
        if(curleft==coo.x&&curtop==coo.y){
          key.select=!key.select;
          var chars = key.COORDINATES.split(',');
          this.pointSize = chars[2];
          if(sta==1){
              if(!key.select)
              this.removeCoordinates(key.x,key.y);
              else 
              this.drawCoordinates(key.x,key.y);
              }
          else{
            this.openPopup(key,index);
          }
        }
      })
    })
  }
  drawCoordinates(x, y) {
    const grd = this.ctx.createLinearGradient(0, 0, 170, 0);
    
     var opacity = 0.5;     
    grd.addColorStop(1,'rgba(63, 191, 63,'+opacity+')');
    this.ctx.fillStyle = grd; // Red color

    this.ctx.beginPath();
    this.ctx.arc(Number(x), Number(y), this.pointSize, 0, Math.PI * 2, true);
    //this.ctx.clip();
    this.ctx.fill();

    const coord = "x=" + x + ", y=" + y;
    const p = this.ctx.getImageData(x, y, 1, 1).data;
    const hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(6);
  }
  removeCoordinates(x, y) {
  
    const grd = this.ctx.createLinearGradient(0, 0, 70, 0);
    var opacity = 0.0; //55% visible
    // grd.addColorStop(0, "#c6efc6");
    // grd.addColorStop(1, "#c6efc6");    
    this.ctx.fillStyle = grd;; // Red color
    this.ctx.beginPath();
    this.ctx.arc(Number(x), Number(y), this.pointSize, 0, Math.PI * 2, true); 
    this.ctx.clearRect(x - this.pointSize - 2, y - this.pointSize, this.pointSize * 2 + 2, this.pointSize * 2 + 2);
    //this.ctx.clearRect(Number(x-11), Number(y-11), 30, 30)
    this.ctx.closePath()   
  }
  rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}
checked(data){
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    resizeCanvasToDisplaySize(this.canvas);
    if(data.COORDINATES){
    var chars = data.COORDINATES.split(',');
          this.pointSize = chars[2];}
    console.log("the checked data is",data);
    //if(this.backPath=='painted'){
      if(data.select){
        this.removeCoordinates(data.x,data.y);
        this.dataSource.filter(key=>{
          if(key.refNo==data.refNo){
            key.ord= null;
          }
        })
      }
      else{
        this.drawCoordinates(data.x,data.y);
       
      }
    //}    
}
openPopup(data,i){
  const dialogRef = this.dialog.open(PopupComponent, {
    width: '350px',
    data: {data:data,i:i,title:'mob'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    if(result.data.select){
      this.drawCoordinates(result.data.x, result.data.y);
      this.toaster.successToastr(result.data.partNo+" Successfully Added to the cart")
      }
      else{
        this.removeCoordinates(result.data.x,result.data.y);
        this.toaster.warningToastr(result.data.partNo+" Removed from the cart")
      }
    this.dataSource[result.i]=result.data;
  });
}
openQVPopUp(){
  const dialogRef = this.dialog.open(PopupComponent, {
    width: '550px',
    data: {data:this.dynamiCol,i:this.dynamicHead,title:'QV'}
  });

  dialogRef.afterClosed().subscribe(res => {
    console.log('The dialog was closed',res);    
  });
}
rowSelected(row){
// this.dataSource.filter(key=>{
//   if(key.refNo==row.refNo){
//     key.select=!key.select;
//   }
// })
}
getPartAssembDetail() {
   this.customLoader.start();
  this.masterServices.getReq('', 'api/Catalouge/GetPartDetailsByAssemblyID?SERIES='+this.param1.toUpperCase()+'&ASSEMBLY_ID='+this.param2.toUpperCase()+'&DealerID='+localStorage.getItem('dealercode')).subscribe(
    (resp: any) => 
   {
        if (resp && resp.statusCode == 200) {
          this.imgVar = resp.data.IMAGE_LINK;
          this.dataSource = resp.data.partDetails
          this.qvHeader = resp.data.dsQvdata.Table;
          this.qvParts = resp.data.dsQvdata.Table1; 
          this.dataSource.filter(key=>{
            key.ord=key.moq;
            // let x = key.COORDINATES.split(",")[0];
            // let y1 = key.COORDINATES.split(",")[1];
            let xMax=key.x+5;
            let xMin=key.x-5;
            let yMax=key.y+5;
            let yMin=key.y-5;
            let arr=[];
            for(var i=xMin;i<xMax;i++){
              for(var y=yMin;y<yMax;y++){
                let obj={x:i,y:y};
                arr.push(obj);
                key.cordinates=arr;
              }
            }
          });       

          console.log("myimg",this.imgVar)
          
          this.customLoader.stop();
        }
        if (resp && resp.statusCode == 401) {
          this.signout();
          this.customLoader.stop();
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
getPaintAssembDetail() {
  this.customLoader.start();
  this.masterServices.getReq('', 'api/Catalouge/GetPaintedPartDetailsByModelID?MODEL_ID='+this.param1+'&COLOR_ID='+this.param2+'&FIG_NO='+this.param2+'&DealerID='+localStorage.getItem('dealercode')).subscribe(
    (resp: any) => 
   {
        if (resp && resp.statusCode == 200) {
          this.imgVar = resp.data.IMAGE_LINK;
          this.dataSource = resp.data.partDetails   
          this.dataSource.filter(key=>{
            key.ord=key.moq;            
            let xMax=key.x+5;
            let xMin=key.x-5;
            let yMax=key.y+5;
            let yMin=key.y-5;
            let arr=[];
            for(var i=xMin;i<xMax;i++){
              for(var y=yMin;y<yMax;y++){
                let obj={x:i,y:y};
                arr.push(obj);
                key.cordinates=arr;
              }
            }
          });       
          this.customLoader.stop();
        }
        if (resp && resp.statusCode == 401) {
          this.signout();
          this.customLoader.stop();
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
signout() {
  localStorage.clear();
  (["/session/signin"]);
}
addToCart(){
  this.addCart.custID = localStorage.getItem('dealercode');
  this.addCart.dealerID = localStorage.getItem('dealercode');
  this.addCart.series = this.param1;
  let ipart=[];
  for(let i=0;i<this.dataSource.length;i++){
      if(this.dataSource[i].select){
        if(this.dataSource[i].ord > 0 ){
        var obj:any={
          "PART_NO":this.dataSource[i].PART_NO,
          "ORDER_QTY":this.dataSource[i].ord   
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
refreshPage() {  
  if(this.backPath=='painted')
    {
      this.getPaintAssembDetail();
    }
    else
    {
      this.getPartAssembDetail();
    }
  // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   //this.router.navigate([this.router.url]);
  //   this.router.navigate(['painted/paintedDetail'],{ queryParams: {mid: '000020000200000003', cid: '000020000200000003AP1C'}});
  //this._document.defaultView.location.reload();
  //this.sidenaveService.togglingMenu({});
  //this.getcartDetail();
  //window.location.reload(); 
  // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  // this.router.onSameUrlNavigation = 'reload';
  // this.router.navigate(['./'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
}
getcartDetail() {
  this.customLoader.start();
  this.masterServices.getReq('', 'api/Catalouge/GetECartDetails?CUSTOMER_ID='+localStorage.getItem('dealercode')).subscribe(
    (resp: any) => 
   {
        if (resp && resp.statusCode == 200) {
          if(resp.data.length){
          this.cartData = resp.data; 
          localStorage.setItem('badgeCount',this.cartData.length);           
          //this.calculateTotal(); 
          }else{
            localStorage.setItem('badgeCount','0'); 
          //  this.toaster.infoToastr("No Items in the Cart");
          }           
          this.customLoader.stop();
        }
        if (resp && resp.statusCode == 401) {
          // this.loginService.logout();    
          this.customLoader.stop();        
        }
        }, error => {
        if (error.status == 401) {
          // this.loginService.logout();
        }
        this.toaster.errorToastr(error.statusMessage);     
        this.customLoader.stop();
      }
    );      
}
getdata(e){
  let filterdata = this.dataSource.filter(key => key.PART_NO == e.PART_NO)
  if(this.ChkNDP){
    
  } 
  if(filterdata.length > 0){
    this.dynamiCol = [];
    var splitted = filterdata[0].QV_DETAILS.split(',');
    let arr=[];
    let arr1=[];   
    for(let i=0;i<this.qvHeader.length;i++){
      //let obj={"value" : this.qvHeader[i].DESCRIPTION + '-' + splitted[i] };
       let obj = {"header" : this.qvHeader[i].DESCRIPTION, "data" : splitted[i]}
       arr.push(obj);
       var obj1 = {};
       obj1[this.qvHeader[i].DESCRIPTION] = splitted[i]
       arr1.push(obj1)  
      //pushToAry(this.qvHeader[i].DESCRIPTION, splitted[i]);
    }    
    this.dynamiCol = arr;   
    this.dynamicHead = arr1;
    ary = []; arr= [];
    this.openQVPopUp();  
  }  
}
Validate(ele)
{
  if(ele){
    if(ele.ord < ele.MOQ)
    {
      this.toaster.warningToastr("Enter Qty is Less then MOQ...Please Enter AS per MOQ")
      ele.ord = 0;
      return;      
    }
    }
}
}
var ary = [];
function pushToAry(name, val) {
  var obj = {};
  obj[name] = val;
  ary.push(obj);
}
function resizeCanvasToDisplaySize(canvas) {
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  console.log("wid",width);
  console.log("hg",height);
  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

