/*tslint:disable*/
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileHandle } from '../../../../Directives/dragDrop.directive';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from 'src/app/Services/common.service';
import { CataloguePopupComponent } from '../../Catalogue/catalogue-popup/catalogue-popup.component';
import { HttpHeaders,HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-painted-details',
  templateUrl: './painted-details.component.html',
  styleUrls: ['./painted-details.component.scss']
})
export class PaintedDetailsComponent implements OnInit {  
  files: FileHandle[] = [];
  files1: FileHandle[] = [];
  pointSize = 7;
  element: Element;
  root: Element;
  ctx;
  canvas; 
 Levels:any=[{id:1,level:"L"},{id:2,level:"L1"},{id:3,level:"L2"}]
 mainMenuList:any[]=[
  {id:1,name:"Moped"},{id:2,name:"Scooter"},{id:3,name:"Scooty"},{id:4,name:"Motorcycle"},{id:5,name:"Painted Parts"}
];
subMenuList:any[]=[
  {id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}
];
menuListArry:any[]=[
  // {id:1,name:"Moped",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
  // {id:2,name:"Scooter",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
  // {id:3,name:"Scooty",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
  // {id:4,name:"Motorcycle",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
  // {id:5,name:"Painted Parts",subMenu:[{id:1,name:"Moped",type:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},{id:2,name:"Scooter",type:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},{id:3,name:"Scooty",type:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},{id:4,name:"Motorcycle",type:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]}]},
  // {id:6,name:"Dynamic",subMenu:[{id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}]},
]
mainMenu:any={id:'1',name:'painted',subMenu:''};
subMenu:any={id:'',name:'',subMenu:''};
menuType:any={};
quardinatesArray:any[]=[];
  tempUrl: any;
  paintedarr:any={img:'',color:[]};
  userFile: any;
  imageSelected: any;
  pageSta:any=true;
  curQur: { x: any; y: any; };
  dataSourceTemp: any;
  partsData: any[] = [];
  MenuTypelst: any;
  SegmentLst:any;
  segtempLst:any;
  tempsublist: any;
  temptyplst: any;
  ColorList: any;
  checked:any=false;
  levelName:any;
  ModelID:any
  segType: any;
  AddModel: any = {
    sLevel:null,
    sLevelNam:null,
    sLevelNam2:null,
    model:null,
    isSubSeg:false,
    LevelTyp:null,
    mImg:null,
    sImg:null
  }
  AddColorData:any = {
    cModelId:null,
    colorID:null,
    colorNam:null,
    colorImg:null    
  }
  subMenu1: any = {};
  sLevel2: any;
  imgVar: any;
  addColor: any;
  Paintimage: any;
  fileToUpload: any;
  imageUrl: any;
  Pimage:any;
  myLevel: any;
  colbtndisable: any;
  cIcon: File;
  cIconImg: any;
  Segfile: File;
  
  constructor(public dialog: MatDialog,public router:Router,private masterdata: MasterdataService, private toaster: ToastrManager,private commonservice :CommonService,private http: HttpClient) { }
 

  ngOnInit(): void {
    // this.getMenuDetail();
    this.getMenuList();
    //this.tempUrl="/assets/Images/paintedBike.png";
  }
  filesDropped(file: FileList): void {
    if (file.item(0)) {
      // this.tempUrl = event.target.files[0];
      // const file = event.target.files[0];
      // const reader = new FileReader(); 
      // reader.onload = e => this.imgVar = reader.result; 
      // reader.readAsDataURL(file);  
      // this.imgVar = file.name    
      this.tempUrl = file.item(0);
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgVar = event.target.result;
      }
       reader.readAsDataURL(this.tempUrl);
    }
  }
  
  colVehUpload(file: FileList) {
    this.Pimage = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.Paintimage = event.target.result;
    }
    reader.readAsDataURL(this.Pimage);
  }

  colIconUpload(file: FileList){
    this.cIcon = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.cIconImg = event.target.result;
    }
    reader.readAsDataURL(this.cIcon);
  }

  handleFileInput(file: FileList) {
    this.Segfile = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.Segfile);
  }
  
  onFileChanged(event) {
    
    // this.fileToUpload = (event.srcElement || event.target).files; 
    // let formData: FormData = new FormData();
    // formData.append('file', this.fileToUpload[0]);

    // this.http.post<any>(`http://localhost:4200/src/assets/Images`, formData).subscribe((res) => {
    //   console.log(res);
    // }, error => {
    //   //error
    // });
    //this.createOrUpdateResource(formData);   
  }
  


  getPosition(event,data) {
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    let curleft = 0,
      curtop = 0;
    curleft += event.offsetX;
    curtop += event.offsetY;    
  }
 
 
changeStatus(eve){
  this.pageSta=true;
  if(eve=='1'){
  setTimeout(()=>{
    this.element = <Element>this.root;
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
  //this.drawCoordinates(Number(this.curQur.x),Number(this.curQur.y));
  },1000)
}
}
moreColor(){
  // var obj={code:"",name:"",url:""};
  // this.paintedarr.color.push(obj);
  this.addColor = 'Color';
  this.AddColorData.cModelId = this.ModelID;
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
            this.mainMenuList = resp.data.filter(key=> key.type == 'link');                  
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
  getMenuList() {
   
    this.masterdata.getReq('', 'api/CatalougeMaster/GetPaintedMenus?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.menuListArry = resp.data.PMenuLst;
            this.subMenuList = resp.data.pSubMenuLst;
           this.tempsublist = resp.data.pSubMenuLst
            this.MenuTypelst = resp.data.PTypeMenuLst;
            this.SegmentLst = resp.data.pSegment2Lst;
            this.segtempLst = resp.data.pSegment2Lst;
           this.temptyplst = resp.data.PTypeMenuLst;                        
          }         
          }, error => {
          if (error.status == 401) {   }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }  
  onMenuChange(id){
    //this.tempdata = this.dataSource;
    this.subMenuList = this.tempsublist.filter(key => key.TYPE == id.value.CATEGORY_NAME)
    //this.dataSource = this.tempdata.filter(key => key.CATEGORY_ID == id.value)
  }
  onSubChange(id){
    if(id.value.IS_SUB_SEGMENT == false){
      let sid = this.subMenu1
      //this.MenuTypelst = this.temptyplst.filter(key => key.SEGMENT_ID == id.value.SEGMENT_ID)
      this.getColorandModel(id.value.S_LEVEL,id.value.SEGMENT_ID)      
      this.checked = id.value.IS_SUB_SEGMENT
      this.levelName = id.value.SEGMENT_ID;
      this.ModelID = id.value.MODEL_ID;
      this.addColor = '';
      this.AddColorData.cModelId = '';
      this.imageUrl = id.value.IMAGE
      this.myLevel = "PAINTED_SEGMENT";   
    }else{
        this.MenuTypelst = this.temptyplst.filter(key => key.SEGMENT_ID == id.value.SEGMENT_ID)        
    }
  }
  onModelSelect(event){
    if(event.value == '-1'){
      this.addColor = 'Color';
      this.AddColorData.cModelId = this.ModelID;
      this.imageUrl = "";
      this.imgVar="";
    }else{      
    this.router.navigate(['/adminPainted/subparts', event.value],  {skipLocationChange: true });}   
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
        //this.drawCoordinates(X, Y);
        if(!result.series){result.series = data.SERIES;}        
       this.router.navigate(['/adminCat/sub',{x:X,y:Y,sId:result.series}]);
       this.curQur={x:X,y:Y};
       this.pageSta=false;
      }
    });
  }
  }
  onSubTypeChange(id){
    if(id.value == -1){      
      this.imgVar = ''
      this.ColorList = [];
      this.levelName = '';
      this.ModelID = '';
      this.checked = false;
      this.imageUrl = "";
      return;
    }
    if(id.value.IS_SUB_SEGMENT == true){
      this.SegmentLst = this.segtempLst.filter(key => key.S_LEVEL_NAME == id.value.S_LEVEL_NAME)
      this.checked = id.value.IS_SUB_SEGMENT
      this.levelName = id.value.S_LEVEL_NAME;
      this.ModelID = id.value.MODEL_ID;
      this.addColor = '';
      this.AddColorData.cModelId = '';
      this.imgVar = ''
      this.ColorList = []; 
    }else{
      this.getColorandModel(id.value.S_LEVEL,id.value.S_LEVEL_NAME)      
      this.checked = id.value.IS_SUB_SEGMENT
      this.levelName = id.value.S_LEVEL_NAME;
      this.ModelID = id.value.MODEL_ID;
      this.addColor = '';
      this.AddColorData.cModelId = ''; 
      this.imageUrl = id.value.IMAGE;
      let segMentName = this.mainMenu.STATE.charAt(0).toUpperCase() + this.mainMenu.STATE.substr(1).toLowerCase();  
      this.myLevel = "segment_lvl1|" + segMentName;     
    }  
   }
   getLevel2ModelColor(p1,p2){
     this.myLevel = "segment_lvl2|Motorcycle"
     this.sLevel2 = p2;
     this.levelName = this.menuType.S_LEVEL_NAME;
     this.ModelID = this.segType.MODEL_ID;
     this.getColorandModel(p1,p2)
   }
  getColorandModel(p1,p2) {   
    if(p1 == 'L1'){
      this.checked = false;
      this.levelName = this.menuType.S_LEVEL_NAME;
      this.ModelID = this.menuType.MODEL_ID; }
     
   this.masterdata.getReq('', 'api/Catalouge/GetPaintedModelandColors?S_LEVEL='+p1+'&S_LEVEL_NAME='+p2).subscribe(
     (resp: any) => 
    {
         if (resp && resp.statusCode == 200) {
           if(resp.data.IMAGE_LINK != null ){
           this.imgVar = resp.data.IMAGE_LINK;this.ColorList = resp.data.colors;this.paintedarr = resp.data.colors
            }else
           {
            this.imgVar = ''
            this.imageUrl = '';
            this.ColorList = [];
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
 AddModels(){
   if(this.menuType){    
     if(this.levelName == null || this.levelName == undefined){
       this.toaster.warningToastr("Enter the Level details")
       return;
     }
     if(this.ModelID == null || this.ModelID == undefined){
       this.toaster.warningToastr("Enter the Model Details");
       return;
     }  
     if(this.subMenu1 == null || this.subMenu1 == undefined){
      this.toaster.warningToastr("Select the Menu type");
      return;
    }     
     if(this.menuType.IS_SUB_SEGMENT == true) {
      this.AddModel.sLevelNam = this.menuType.S_LEVEL_NAME;
      this.AddModel.sLevelNam2 = this.levelName;
      this.AddModel.isSubSeg = false;
      this.AddModel.LevelTyp = "L2"
      this.AddModel.mImg = this.tempUrl.name;
      if(this.fileToUpload == undefined || this.fileToUpload == null){this.AddModel.sImg = null}else{
        this.AddModel.sImg = this.fileToUpload.name;
      }  
      this.AddModel.model = this.ModelID;
      this.AddModel.SegID = this.subMenu1.SEGMENT_ID
     }else
     {
      this.AddModel.sLevelNam = this.levelName;
      this.AddModel.sLevelNam2 = this.sLevel2;
      this.AddModel.isSubSeg = this.checked;
      this.AddModel.LevelTyp = "L1"
      this.AddModel.mImg = this.tempUrl.name;
      if(this.fileToUpload == undefined || this.fileToUpload == null){this.AddModel.sImg = null}else{
        this.AddModel.sImg = this.fileToUpload.name;
      }      
      this.AddModel.model = this.ModelID;
      this.AddModel.SegID = this.subMenu1.SEGMENT_ID
     }
     //let req = {"modelData":this.AddModel}
     this.masterdata.post(this.AddModel, 'api/CatalougeMaster/AddandUpdatePaintModel').subscribe(
      (resp: any) =>{
      {
        if(resp.statusCode == 200)
        {
          this.toaster.successToastr(resp.data);
          this.AddModel = null;           
        }
        else{
          this.toaster.errorToastr(resp.data);     
          }         
      }
          if (resp && resp.statusCode == 401) {       
          }
     }, error => {         
           this.toaster.errorToastr(error.statusMessage);
        }
      );
      
 }
}
AddColors(){
  if(this.AddColorData){    
    if(this.AddColorData.cModelId == null || this.AddColorData.cModelId == undefined){
      this.toaster.warningToastr("select Model from Level ")
      return;
    }
    if(this.AddColorData.colorID == null || this.AddColorData.colorID == undefined){
      this.toaster.warningToastr("Enter Color Details");
      return;
    }  
    if(this.AddColorData.colorNam == null || this.AddColorData.colorNam == undefined){
     this.toaster.warningToastr("Enter Color Details");
     return;
   }        
   if(this.imageUrl == null || this.imageUrl == undefined) 
   {
    this.toaster.warningToastr("Select Color Image");
    return;
   }
   if((this.cIcon == undefined || this.cIcon == null)&&(this.Pimage == undefined || this.Pimage == null) ){
    this.toaster.warningToastr("Select Color images");
    return;
   }
   this.AddColorData.colorImg = this.cIcon.name;
   this.AddColorData.Modelimg = null//this.Pimage.name;
    //let req = {"modelData":this.AddModel}
    this.masterdata.post(this.AddColorData, 'api/CatalougeMaster/AddandUpdateModelColor').subscribe(
     (resp: any) =>{
     {
       if(resp.statusCode == 200)
       {
        
         this.onBtnColImgClk();        
         this.imageUrl = null;
         this.AddColorData = null;
         this.colbtndisable = true;  
         this.cIconImg =null;
         this.Paintimage = null;
         //this.toaster.successToastr(resp.data);            
       }
       else{
         this.toaster.errorToastr(resp.message);     
         }         
     }
         if (resp && resp.statusCode == 401) {       
         }
    }, error => {         
          this.toaster.errorToastr(error.statusMessage);
       }
     );
      }
}
onBtnImgClick(){
  if(this.Segfile == undefined || this.Segfile == null)
  {
    this.toaster.infoToastr("Edit or select the segment Image");
    return;
  }
  if(this.tempUrl == undefined || this.tempUrl == null)
  {
    this.toaster.infoToastr("Edit or select the model Image");
    return;
  }
  if(this.ModelID == undefined || this.ModelID == null){
    this.toaster.infoToastr("Enter the Model Id");
    return;
  }else
  {
    let modimg =  "Painted|"+this.ModelID;
    this.uploadImage(this.Segfile,modimg);
    this.uploadImage(this.tempUrl,this.myLevel); 
    this.Segfile = null;
    this.tempUrl = null;
  }    
}
onBtnColImgClk(){
  if(this.cIcon == undefined || this.cIcon == null)
  {
    this.toaster.infoToastr("Select Color Icon");
    this.colbtndisable = false;
    return;
  }
  if(this.Pimage == undefined || this.Pimage == null)
  {
    this.toaster.infoToastr("Select Color Vehicle");
    this.colbtndisable = false;
    return;
  }else{
         let colimgfld = 'Painted|'+ this.AddColorData.cModelId +'|ColorSelection'; 
         let clrVehFdr = 'ModelColors|' + this.AddColorData.cModelId + '|colors' ;
         this.uploadImage(this.cIcon,colimgfld);
         this.uploadImage(this.Pimage,clrVehFdr);
         
  }        
}
uploadImage(f1,f2){
  const fd = new FormData();  
  fd.append('image', f1);
  fd.append("folder",f2);  
  this.masterdata.postimags(fd, 'api/CatalougeMaster/UploadImages').subscribe(
    (resp: any) =>{
    {
      if(resp.statusCode == 200)
      {
        this.toaster.successToastr(resp.message);               
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
