/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../../../../Directives/dragDrop.directive';
import {MatDialog} from '@angular/material/dialog';
import { CataloguePopupComponent } from '../catalogue-popup/catalogue-popup.component';
import { Router } from '@angular/router';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from 'src/app/Services/common.service';
@Component({
  selector: 'app-catalogue-detail',
  templateUrl: './catalogue-detail.component.html',
  styleUrls: ['./catalogue-detail.component.scss']
})
export class CatalogueDetailComponent implements OnInit {
  files: File = null;
  pointSize = 7;
  element: Element;
  root: Element;
  ctx;
  canvas;
 imgVar;
 mainMenuList:any[]=[
  {id:1,name:"Moped"},{id:2,name:"Scooter"},{id:3,name:"Scooty"},{id:4,name:"Motorcycle"},{id:5,name:"Painted Parts"}
];
subMenuList:any[]=[
  {id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}
];
menuListArry:any[]=[
  {id:1,name:"Moped",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
  {id:2,name:"Scooter",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
  {id:3,name:"Scooty",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
  {id:4,name:"Motorcycle",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
  {id:5,name:"Painted Parts",subMenu:[{id:1,name:"Moped",type:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},{id:2,name:"Scooter",type:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},{id:3,name:"Scooty",type:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},{id:4,name:"Motorcycle",type:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]}]},
  {id:6,name:"Dynamic",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
]
mainMenu:any={id:'1',name:'',subMenu:''};
subMenu:any={id:'',name:'',subMenu:''};
menuType;
quardinatesArray:any[]=[];
  tempUrl: string;
  paintedarr:any={img:'',color:[]};
  userFile: any;
  imageSelected: any;
  pageSta:any=true;
  curQur: { x: any; y: any; };
  dataSourceTemp: any;
  partsData: any[] = [];
  nullimg: any;
  disabled: boolean;
  constructor(public dialog: MatDialog,public router:Router,private masterdata: MasterdataService, private toaster: ToastrManager,private commonservice :CommonService) { }

  ngOnInit(): void {
    this.getMenuDetail();
    this.getMenuList(1);
    this.tempUrl="/assets/Images/paintedBike.png";    
  }

  filesDropped(evnt): void {
    //this.files = files;
    this.nullimg = true;   
    this.files = <File> evnt.target.files[0];    
   if (evnt.target.files && evnt.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {      
    this.subMenu.IMAGE_LINK = e.target.result;
    this.disabled = false    
    };
    reader.readAsDataURL(evnt.target.files[0]);
  }
    
    console.log("i got",this.subMenu.IMAGE_LINK);
    
   // this.imgVar=this.files[0].url;
  }

  upload(): void {
    //get image upload file obj;
  }

  getPosition(event,data) {
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    let curleft = 0,
      curtop = 0;

    curleft += event.offsetX;
    curtop += event.offsetY;
    //this.drawCoordinates(curleft, curtop);
    this.openDialog(curleft, curtop,data);
  }
  drawCoordinates(x, y) {
console.log("show the qr",x,y)
    const grd = this.ctx.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "red");
    this.ctx.fillStyle = grd; // Red color

    this.ctx.beginPath();
    this.ctx.arc(Number(x), Number(y), this.pointSize, 0, Math.PI * 2, true);
    this.ctx.fill();

    const coord = "x=" + x + ", y=" + y;
    const p = this.ctx.getImageData(x, y, 1, 1).data;
    const hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6);
    console.log(hex);
  }

  rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
      throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}
openDialog(X,Y,data) {
  if(data == "AddModel"){
    const dialogRef = this.dialog.open(CataloguePopupComponent,{
      data:{x:X,y:Y,type:"AddModel",series:this.subMenu.SERIES,isEdt:'N',modelId:data.MODEL_ID}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
    });
  }else{
  const dialogRef = this.dialog.open(CataloguePopupComponent,{
    data:{x:X,y:Y,type:"main",series:data.SERIES,isEdt:'N',modelId:data.MODEL_ID}
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.drawCoordinates(X, Y);
      if(!result.series){result.series = data.SERIES;}
      // if(!result.modelId){}
      this.commonservice.param3 = result.assemblyName;
      this.commonservice.param4 = result.IsSubAssembly;
      this.commonservice.param5 = result.assemblyid;
      this.commonservice.param6 = result.modelId;
      this.commonservice.param7 = result.subAssemblyId;
      this.commonservice.param8 = result.subAssemDesc;
      this.commonservice.param9 = result.subassemblygrp;
      this.commonservice.param10 = result.figNo;  
     this.router.navigate(['/adminCat/sub',{x:X,y:Y,sId:result.series}]);
     this.curQur={x:X,y:Y};
     this.pageSta=false;
    }
  });
}
}

changeStatus(eve){
  this.pageSta=true;
  if(eve=='1'){
  setTimeout(()=>{
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
  this.drawCoordinates(Number(this.curQur.x),Number(this.curQur.y));
  },1000)
}
}
moreColor(){
  var obj={code:"",name:"",url:""};
  this.paintedarr.color.push(obj);
}
onFileChange(event: any,i) {
  this.userFile = event.target.files[0];
  this.imageSelected = this.userFile.name;
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log("the color",this.paintedarr.color,i)
      this.paintedarr.color[i].url = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }}
  addPart(){
    this.router.navigate(['/adminCat/sub']);
  }
  getMenuDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/Catalouge/GetMenuCategory?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.mainMenuList = resp.data.filter(key=> key.is_vehicle == true);             
          }
          if (resp && resp.statusCode == 401) {              
          }
          }, error => {
          if (error.status == 401) {           
          }
          this.toaster.errorToastr(error.statusMessage);                
        }
      );      
  }
  getMenuList(val) {    
    this.masterdata.getReq('', 'api/Catalouge/GetMenuList?dealerID='+localStorage.getItem('dealercode')+'&type='+ Number(val)).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.menuListArry = resp.data;
            this.dataSourceTemp = this.menuListArry;
          }
          if (resp && resp.statusCode == 401) {
              
          }
          }, error => {
          if (error.status == 401) {
           
          }
          this.toaster.errorToastr(error.statusMessage);      
         
        }
      );      
  }  
  onChange(cat){
    if(cat.CATEGORY_ID > 0){
    this.menuListArry = this.dataSourceTemp.filter(key => key.CATEGORY_ID == cat.CATEGORY_ID);
    }else{this.menuListArry = this.dataSourceTemp} //(selectionChange)="onChange($event)
  }
  getPartAssembDetail(resultSet:any) {
   
   this.masterdata.getReq('', 'api/Catalouge/GetPartDetailsByAssemblyID?SERIES='+resultSet.series.toUpperCase()+'&ASSEMBLY_ID='+resultSet.assemblyid.toUpperCase()).subscribe(
     (resp: any) => 
    {
         if (resp && resp.statusCode == 200) {
           this.imgVar = resp.data.IMAGE_LINK;
           console.log("sucesss",resp.data.partDetails.count)
           this.partsData = resp.data.partDetails               
         }
         if (resp && resp.statusCode == 401) {
           
         }
    }, error => {
         if (error.status == 401) {
         //this.signout();
         }
         
         this.toaster.errorToastr(error.statusMessage);
       }
     );    
 }
 AddModels(){
   if(this.subMenu.SERIES){
  this.openDialog(0,0,"AddModel");
   }else
   {
    this.toaster.errorToastr("Select SubMenu");
   }
 }
 checkImage(e){
        const image = new Image();
        
        image.onload = () => {
          //document.body.appendChild(image);
        }
        image.onerror = () => {  
          this.nullimg = false;
          this.disabled = false;         
        }
        this.nullimg = true;
        this.disabled = true;        
        image.src = this.subMenu.IMAGE_LINK;
 }

 uploadImage(){
  const fd = new FormData();
  fd.append('image', this.files);
  fd.append('folder','Vehicle');
  this.masterdata.postimags(fd, 'api/CatalougeMaster/UploadImages').subscribe(
    (resp: any) =>{
    {
      if(resp.statusCode == 200)
      {
        this.toaster.successToastr(resp.message); 
        this.subMenu.IMAGE_LINK  = "";
        this.nullimg = false;   
      }
      else{
        this.toaster.errorToastr(resp.message);     
        }         
    }
   }, error => {
        if (error.status == 401) {       
          this.toaster.errorToastr(error.statusMessage);
        }            
      }    
    );
} 

}


