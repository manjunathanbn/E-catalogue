/*tslint:disable*/
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { FileHandle } from '../../../../Directives/dragDrop.directive';
import {MatDialog} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from 'src/app/Services/common.service';
import * as XLSX from 'xlsx';
import { CataloguePopupComponent } from '../../Catalogue/catalogue-popup/catalogue-popup.component';
import { SidenavService } from 'src/app/Services/sidenave.service';
@Component({
  selector: 'app-painted-subparts',
  templateUrl: './painted-subparts.component.html',
  styleUrls: ['./painted-subparts.component.scss','../../Catalogue/catalogue-detail/catalogue-detail.component.scss','../../Catalogue/catalogue-home/catalogue-home.component.scss']
})
export class PaintedSubpartsComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  
  directiveScroll?: PerfectScrollbarDirective;
  @Output() statusEvent = new EventEmitter<string>();
  displayedColumns: string[]=["sNo","partNo","partName","QV","ndp","moq","Remarks","status","edit"];
  dataSource:any[]=[];
  files: any = "";
  arrayBuffer:any;
  file:File;
  pointSize = 10;
  element: Element;
  root: Element;
  ctx;
  canvas;
  smSize=5;
  mdSize=7;
  lgSize=10;
  supPartsArray:any[]=[
    {id:1,img:"",x:0,y:0,listData:[
      {id:1,partNo:"P1",partName:"Engine",xlSup:20,xlSupHd:5,ndp:4,moq:6,stock:56,status:"Active",x:76,y:98,hover:false}
    ]}
  ];
  currentInd: any;
  imgUrl: string;
  sub: any;
  FigNo: any;
  ColorID: any;
  ModlID:any
  disable:any = false
  saveData : any = {    
    dealerID:0,
    ColorID:0,
    ModelID:null,
    FigNo:null,
    CustumValue:0,        
    parts:[],
    status:0,        
    imgPath:null,
    coordinates:null        
  }    
  assName: any;
  isSub: any;
  storeData: any;
  worksheet: XLSX.WorkSheet;
  fileUploaded: any;
  filelist: any[];
  paramMid:any;paramCid:any;
  paramslst:any={};
  selected: boolean = false;
  found: boolean = false;
  partPricelst: any;
  partStkLst: any;
  
  constructor(public dialog: MatDialog,private router:Router,public sidenaveService:SidenavService,private route: ActivatedRoute,private masterdata: MasterdataService, private toaster: ToastrManager,private commonservice :CommonService) {
    //this.params = JSON.parse(this.route.snapshot.paramMap.get('queryParams'));    
    this.sub =   this.route.params.subscribe(params => {
      console.log("VVVVVVVVVVVV",params);
      this.paramslst = params                       
    })
   }


  ngOnInit(): void {
    this.sidenaveService.togglingMenu({});
    this.imgUrl="/assets/Images/engine.png"
    this.getPartAssembDetail()
    this.getPartPriceDetail();
  }
  filesDropped(fevent): void {
    //this.supPartsArray[0].img=this.imgUrl;
    this.files = <File> fevent.target.files[0];
    if(this.files){
      const filename = this.files.name;
      let filnam = filename.split('.').slice(0, -1).join('.')
      if(this.paramslst.MODEL_ID === filnam){
        let strcompath = 'ModelColors|'+this.paramslst.MODEL_ID+'|colors'
        this.uploadImage(this.files,strcompath);
      }else{
        this.toaster.infoToastr("Model and Selected image is not Same");
        return;
      }      
    }
    if (fevent.target.files && fevent.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {      
        this.supPartsArray[0].img = e.target.result;        
      };
      reader.readAsDataURL(fevent.target.files[0]);
    }
    console.log("i got",fevent.target.files[0]);
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
        if(this.paramslst.COLOR_ID == this.filelist[i].colorId && this.paramslst.FIG_NO == this.filelist[i].FigNo && this.paramslst.MODEL_ID == this.filelist[i].modelid){
          let oMrp = this.partPricelst.filter(prc => prc.PartNo == this.filelist[i].partid)
          let oNDP = this.partPricelst.filter(prc => prc.PartNo == this.filelist[i].partid)
          let stk = this.partStkLst.filter(prc => prc.PartNo == this.filelist[i].partid)
          let stkval; if(stk.length){stkval = stk[0].AvailableQty}else{stkval = 0}
          let Mrp;  if(oMrp.length){Mrp = oMrp[0].MRP}else{Mrp = 0}
          let Ndp;  if(oNDP.length){Ndp = oNDP[0].NDP}else{Ndp = 0}
        var obj:any ={
          "REF_NO":this.filelist[i].id,
          "PART_NO":this.filelist[i].partid,
          "ACTIVE": (this.filelist[i].Active == 1 ? 'true':'false'),
          "PART_DESC":this.filelist[i].partdesc,
          "COORDINATES":this.filelist[i].coordinates,
          "FIG_NO":this.filelist[i].FigNo,
          "MOQ": (this.filelist[i].MOQ == '' ? 0:this.filelist[i].MOQ),
          "MRP":Mrp,
          "NDP":Ndp,
          "ORD": stkval,
          "QV":this.filelist[i].qv,
          "REMARKS":this.filelist[i].Remarks,
          "IDPartFigSlNo":this.filelist[i].IDPartFigSlNo
        }
        iList.push(obj);}else {
          this.toaster.warningToastr("Check the Model or Color Details which is not Matched for Row ID : " + this.filelist[i].id )
          return;
        }        
      }
      this.supPartsArray[0].listData = iList;
      this.toaster.infoToastr("Add to the Parts Table" )
    }
  }

  getPosition(event,i) {
    console.log("eve",event)
    this.selected = false;
    this.found = false;
    this.currentInd=i;
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    let curleft = 0,
      curtop = 0;

    curleft += event.offsetX;
    curtop += event.offsetY;
    this.supPartsArray[0].listData.filter((key,index)=>{
      if(key.cordinates){
      key.cordinates.filter(coo=>{
        if(curleft==coo.x&&curtop==coo.y){
          key.select=!key.select;
          this.toaster.infoToastr("Selected Part is Already Exist");
          return(this.selected = true);                                      
        }
       
      })}
      if(this.selected == true)
      {
        this.found = true;
        return true;
        
      }
    })
    if(this.selected == false && this.found == false){this.openDialog(curleft, curtop,'N','');}
    //this.drawCoordinates(curleft, curtop);
   // this.openDialog(curleft, curtop,'N','');
  }


  drawCoordinates(x, y) {

    const grd = this.ctx.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "#9bcb84");
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
  let curPlist = this.supPartsArray[0].listData;
  const dialogRef = this.dialog.open(CataloguePopupComponent,{
    data:{x:X,y:Y,type:"sub",isEdt:isedit,editData:editData,PS:this.pointSize,curLst:curPlist},
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
      console.log("shoe cur data",result);
      this.drawCoordinates(X, Y);
     // this.router.navigate(['/adminCat/sub']);
    }
  });
}

addMoreParts(){
  // var obj=  {id:1,img:"",x:0,y:0,listData:[
  //   {id:1,head:"Moped",name:"TVS XL",parts:20,status:"Active",x:678,y:980,hover:false}
  // ]};
  // this.supPartsArray.push(obj);
}
remove(i){
  //this.supPartsArray.splice(1,i);
}
save(){
  localStorage.setItem("quardinates",JSON.stringify(this.supPartsArray));
  this.saveData.dealerID = localStorage.getItem('dealercode');
  this.saveData.ColorID = this.paramslst.COLOR_ID  
  this.saveData.ModelID = this.paramslst.MODEL_ID
  this.saveData.FigNo = this.paramslst.FIG_NO  
  this.saveData.status = "S";
  this.saveData.imgPath = this.supPartsArray[0].img
  this.saveData.coordinates =  null;
  let saveParts = this.supPartsArray[0].listData;   
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
             "MOQ":saveParts[i].MOQ,
             "MRP":saveParts[i].MRP,
             "NDP":saveParts[i].NDP,
             "Stock":saveParts[i].ORD,
             "QV":saveParts[i].QV,
             "REMARKS":saveParts[i].REMARKS,
             "IDPartFigSlNo":null,
             "IKEY":saveParts[i].IKEY
           }
           ipart.push(obj);   
     } 
}
this.saveData.parts = ipart;

let req = {"Parts":this.saveData}
console.log('tetst',req);
this.masterdata.post(this.saveData, 'api/CatalougeMaster/AddandUpdatePaintPart').subscribe(
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
  this.router.navigate(['/adminPainted/detail']);
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
   
  this.masterdata.getReq('', 'api/Catalouge/GetPaintedPartDetailsByModelID?MODEL_ID='+this.paramslst.MODEL_ID+'&COLOR_ID='+this.paramslst.COLOR_ID+'&FIG_NO='+this.paramslst.FIG_NO+'&DealerID='+localStorage.getItem('dealercode')).subscribe(
    (resp: any) => 
   {
        if (resp && resp.statusCode == 200) {
          this.supPartsArray[0].img = resp.data.IMAGE_LINK;
          console.log("sucesss",resp.data.partDetails.count)
           this.supPartsArray[0].listData = resp.data.partDetails
           this.supPartsArray[0].listData.filter(key=>{
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
  this.saveData.dealerID = localStorage.getItem('dealercode');
  this.saveData.colorID = this.paramslst.COLOR_ID;
  this.saveData.FigNo = this.paramslst.FIG_NO;
  this.saveData.ModelID = this.paramslst.MODEL_ID;    
  this.saveData.status = "A";
  this.saveData.imgPath = this.supPartsArray[0].img  
  this.saveData.coordinates =  this.supPartsArray[0].x +','+this.supPartsArray[0].y + ',' + this.pointSize  
  this.saveData.parts = [];
  let req = {"Parts":this.saveData}

this.masterdata.post(req, 'api/CatalougeMaster/AddandUpdatePaintedPart').subscribe(
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
getPartPriceDetail() {
   
  this.masterdata.getReq('', 'api/CatalougeMaster/GetPartPrice?dealerID='+localStorage.getItem('dealercode')).subscribe(
    (resp: any) => 
   {
        if (resp && resp.statusCode == 200) {
         this.partPricelst = resp.data.partPrices;
         this.partStkLst =  resp.data.partStocks;     
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
uploadImage(f1,f2){
  const fd = new FormData();  
  fd.append('image', f1);
  fd.append('folder',f2);
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
