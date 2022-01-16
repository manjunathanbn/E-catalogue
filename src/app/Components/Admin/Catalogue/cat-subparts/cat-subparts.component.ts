/*tslint:disable*/
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { FileHandle } from '../../../../Directives/dragDrop.directive';
import {MatDialog} from '@angular/material/dialog';
import { CataloguePopupComponent } from '../catalogue-popup/catalogue-popup.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from 'src/app/Services/common.service';
import * as XLSX from 'xlsx';
//import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-cat-subparts',
  templateUrl: './cat-subparts.component.html',
  styleUrls: ['./cat-subparts.component.scss','../catalogue-detail/catalogue-detail.component.scss','../catalogue-home/catalogue-home.component.scss']
})
export class CatSubpartsComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  
  directiveScroll?: PerfectScrollbarDirective;
  @Output() statusEvent = new EventEmitter<string>();
  displayedColumns: string[]=["sNo","partNo","partName","QV","ndp","moq","stock","status","edit"];
  dataSource:any[]=[];
  files: any = "";
  arrayBuffer:any;
  file:File;
  pointSize = 7;
  element: Element;
  root: Element;
  ctx;
  canvas;
  smSize=5;
  mdSize=7;
  lgSize=10;
  supPartsArray:any[]=[
    {id:1,img:"",x:0,y:0,listData:[
      //{id:1,partNo:"P1",partName:"Engine",xlSup:20,xlSupHd:5,ndp:4,moq:6,stock:56,status:"Active",x:76,y:98,hover:false}
    ]}
  ];
  currentInd: any;
  imgUrl: string;
  sub: any;
  series: any;
  AssemblyID: any;
  ModlID:any
  disable:any = false
  saveData : any = {    
    dealerID:0,
    AssembleID:0,
    ModelID:null,
    FigNo:null,
    CustumValue:0,        
    parts:[],
    status:0,
    series:null,
    AssName:null,
    IsSub:false,
    imgPath:null,
    coordinates:null,
    subID:null,
    subName:null,
    AssemblyGrp:null

  }    
  assName: any;
  isSub: any;
  storeData: any;
  worksheet: XLSX.WorkSheet;
  fileUploaded: any;
  filelist: any[];
  assGrpId: any;
  figNo: any;
  
  constructor(public dialog: MatDialog,private router:Router,private route: ActivatedRoute,private masterdata: MasterdataService, private toaster: ToastrManager,private commonservice :CommonService) {
    this.sub = this.route.params.subscribe(params => {
      console.log("VVVVVVVVVVVV",params);
      this.supPartsArray[0].x=params.x;
      this.supPartsArray[0].y=params.y;
      this.series = params.sId;
      this.isSub = this.commonservice.param4; 
      if(this.isSub){
        this.AssemblyID = this.commonservice.param7}
        else{this.AssemblyID = this.commonservice.param5}      
      this.ModlID = this.commonservice.param6;
      this.assName = this.commonservice.param3;
      this.assGrpId = this.commonservice.param9;
      this.figNo = this.commonservice.param10;
                 
      //this.supPartsArray[0].listData = params.partsData 
    })
   }

  ngOnInit(): void {
    //this.imgUrl="/assets/Images/engine.png"
    this.getPartAssembDetail()
  }
  filesDropped(fevent,i): void {
    this.supPartsArray[i].img=this.imgUrl;
    this.files = <File> fevent.target.files[0];
    if (fevent.target.files && fevent.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {      
        this.supPartsArray[0].img = e.target.result;        
      };
      reader.readAsDataURL(fevent.target.files[0]);
    }
      
      console.log("i got" , this.supPartsArray[0].img);
    //console.log("i got",this.files[0].url);
  }
  uploadedFile(event) {
    this.file= event.target.files[0];     
    if(this.file.size > 0){
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];    
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{defval:""});     
            this.filelist = [];    
            this.filelist = arraylist;
            console.log(this.filelist)
            this.readToDataSource();    
  }    
  }else{this.toaster.warningToastr("No Data to Import !....."); return; }

  }
  readToDataSource(){
    if(this.filelist.length > 0){
      let iList = [];
      for(let i=0;i<=this.filelist.length - 1;i++)
      {
        if(this.AssemblyID == this.filelist[i].AssemblyId && this.series == this.filelist[i].Series){
        var obj:any ={
          "REF_NO":this.filelist[i].id,
          "PART_NO":this.filelist[i].partid,
          "ACTIVE": (this.filelist[i].Active == 1 ? 'true':'false'),
          "PART_DESC":this.filelist[i].partdesc,
          "COORDINATES":this.filelist[i].coordinates,
          "FIG_NO":this.filelist[i].FigNo,
          "MOQ":this.filelist[i].MOQ,
          "MRP":this.filelist[i].Mrp,
          "NDP":this.filelist[i].NDP,
          "ORD":this.filelist[i].Stock,
          "QV":this.filelist[i].qv,
          "REMARKS":this.filelist[i].Remarks
        }
        iList.push(obj);}else {
          this.toaster.warningToastr("Check the Assembly or Series Details which is not Matched for Row ID : " + this.filelist[i].id )
          return;
        }        
      }
      this.supPartsArray[0].listData = iList;
    }
  }

  getPosition(event,i) {
    this.currentInd=i;
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    let curleft = 0,
      curtop = 0;

    curleft += event.offsetX;
    curtop += event.offsetY;
    //this.drawCoordinates(curleft, curtop);
    this.openDialog(curleft, curtop,'N','');
  }


  drawCoordinates(x, y) {

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
openDialog(X,Y,isedit,editData) {
  const dialogRef = this.dialog.open(CataloguePopupComponent,{
    data:{x:X,y:Y,type:"sub",isEdt:isedit,editData:editData,PS:this.pointSize},
    width:"900px"    
  });

  dialogRef.afterClosed().subscribe(result => {
    var temp:any[];
    if(result && isedit == 'N'){
      temp=this.supPartsArray[this.currentInd].listData;
      this.supPartsArray[this.currentInd].listData=[];
      temp.push(result);
      setTimeout(()=>{
        this.supPartsArray[this.currentInd].listData=temp;
      },1000)
      
      //this.supPartsArray[this.currentInd].listData.push(result);
      console.log("shoe cur data",this.supPartsArray[this.currentInd].listData);
      this.drawCoordinates(X, Y);
     // this.router.navigate(['/adminCat/sub']);
    }
  });
}

addMoreParts(){
  var obj=  {id:1,img:"",x:0,y:0,listData:[
    {id:1,head:"Moped",name:"TVS XL",parts:20,status:"Active",x:678,y:980,hover:false}
  ]};
  this.supPartsArray.push(obj);
}
remove(i){
  this.supPartsArray.splice(1,i);
}
save(){
  localStorage.setItem("quardinates",JSON.stringify(this.supPartsArray));
  //this.supPartsArray = localStorage.getItem('dealercode');
  //this.router.navigate(['/adminCat/detail']);
  this.saveData.dealerID = localStorage.getItem('dealercode');
  
  this.saveData.AssembleID = this.commonservice.param5 //(this.isSub == true ? this.commonservice.param5:this.commonservice.param7)
  this.saveData.series = this.series;
  this.saveData.ModelID = this.ModlID;
  this.saveData.FigNo = this.commonservice.param10;
  this.saveData.isSub = this.isSub;
  this.saveData.status = "S";
  this.saveData.imgPath = this.supPartsArray[0].img;
  this.saveData.AssName = this.assName;
  this.saveData.AssemblyGrp = this.assGrpId;
  this.saveData.coordinates =  this.supPartsArray[0].x +','+this.supPartsArray[0].y + ',' + '10'
  this.saveData.subID = this.commonservice.param7;
  this.saveData.subName = this.commonservice.param8;
  let saveParts = this.supPartsArray[0].listData   
  let ipart=[];
  for(let i=0;i<saveParts.length;i++){
    if(saveParts[i].PART_NO){
           var obj:any ={
             "REF_NO":saveParts[i].REF_NO,
             "PART_NO":saveParts[i].PART_NO,
             "ACTIVE": saveParts[i].ACTIVE,
             "PART_DESC":saveParts[i].PART_DESC,
             "COORDINATES":saveParts[i].COORDINATES,
             "FIG_NO":saveParts[i].FIG_NO,
             "Slno":saveParts[i].SL_NO,
             "MOQ": (saveParts[i].MOQ == undefined || saveParts[i].MOQ == null ? 0:saveParts[i].MOQ),
             "MRP": (saveParts[i].MRP == undefined || saveParts[i].MRP == null ? 0:saveParts[i].MRP),
             "NDP": (saveParts[i].NDP == undefined || saveParts[i].NDP == null ? 0:saveParts[i].NDP),
             "Stock":(saveParts[i].ORD == undefined || saveParts[i].ORD == null ? 0:saveParts[i].ORD),
             "QV":saveParts[i].QV,
             "REMARKS":saveParts[i].REMARKS,
             "IKEY":saveParts[i].IKEY
           }
           ipart.push(obj);    
     } 
}
this.saveData.parts = ipart;

let req = {"Parts":this.saveData}

this.masterdata.post(req.Parts, 'api/CatalougeMaster/AddandUpdateMPart').subscribe(
  (resp: any) =>{
  {
    if(resp.statusCode == 200)
    {
      this.toaster.successToastr(resp.data); 
           
    }
    else{
      this.toaster.errorToastr(resp.data);     
      }         
  }
      if (resp && resp.statusCode == 401) {       
      }
 }, error => {
      if (error.status == 401) {
     
      }      
       this.toaster.errorToastr(error.statusMessage);
    }
  );
  var data:any={x:this.supPartsArray[0].x,y:this.supPartsArray[0].y};
  this.statusEvent.next("1");
}
goBack(){
  this.router.navigate(['/adminCat/detail']);
  this.statusEvent.next("0");
}
fileChanged(i){
  alert("GG")
}
enterFun(eve,i){
  console.log("FF")
}
changeSize(type){
  switch(type){
    case 'sm':{this.pointSize=this.smSize; break;}
    case 'md':{this.pointSize=this.mdSize;break;}
    case 'lg':{this.pointSize=this.lgSize}
  }
}
getPartAssembDetail() {
   
  this.masterdata.getReq('', 'api/Catalouge/GetPartDetailsByAssemblyID?SERIES='+this.series+'&ASSEMBLY_ID='+this.AssemblyID).subscribe(
    (resp: any) => 
   {
        if (resp && resp.statusCode == 200) {
          
          console.log("sucesss",resp.data.partDetails.count)
          if(resp.data.partDetails.length > 0){
            this.supPartsArray[0].listData = resp.data.partDetails
            this.supPartsArray[0].img = resp.data.IMAGE_LINK;
          }          
           this.disable = true               
        }
        if (resp && resp.statusCode == 401) {
          //this.signout();
          
        }
   }, error => {
        if (error.status == 401) {
        //this.signout();
        }
        
        this.toaster.errorToastr(error.statusMessage);
      }
    );    
}
editData(data)
{
  this.openDialog(data.x,data.y,'Y',data);
}
Add(){
  if(this.supPartsArray[0].img == null || this.supPartsArray[0].img == undefined)
  {
    this.toaster.infoToastr("No Image Selected")
    return;
  }
  this.saveData.dealerID = localStorage.getItem('dealercode');
  this.saveData.AssembleID = this.commonservice.param5;
  this.saveData.series = this.series;
  this.saveData.ModelID = this.ModlID;
  this.saveData.FigNo = this.commonservice.param5;
  this.saveData.IsSub = this.isSub;
  this.saveData.status = "A";
  this.saveData.imgPath = this.supPartsArray[0].img
  this.saveData.AssName = this.assName;
  this.saveData.coordinates =  this.supPartsArray[0].x +','+this.supPartsArray[0].y + ',' + '10'
  this.saveData.subID = this.commonservice.param7;
  this.saveData.subName = this.commonservice.param8;
  this.saveData.parts = [];
  let req = {"Parts":this.saveData}

this.masterdata.post(req, 'api/CatalougeMaster/AddandUpdateMPart').subscribe(
  (resp: any) =>{
  {
    if(resp.statusCode == 200)
    {
      this.toaster.successToastr(resp.data); 
           
    }
    else{
      this.toaster.errorToastr(resp.data);     
      }         
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
uploadImage(){
  const fd = new FormData();
  fd.append('image', this.files);
  fd.append('folder',this.series);
  this.masterdata.postimags(fd, 'api/CatalougeMaster/UploadImages').subscribe(
    (resp: any) =>{
    {
      if(resp.statusCode == 200)
      {
        this.toaster.successToastr(resp.message); 
        this.disable = true;        
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
