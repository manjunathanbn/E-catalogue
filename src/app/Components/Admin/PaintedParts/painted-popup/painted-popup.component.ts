/*tslint:disable*/
import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit, VERSION, ViewChild, ElementRef, Inject, NgZone  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from 'src/app/Services/common.service';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import * as XLSX from 'xlsx';
import { ExcelserviceService } from 'src/app/Services/excelservice.service'
export interface DialogData {
  upldOpt:string
  }
@Component({
  selector: 'app-painted-popup',
  templateUrl: './painted-popup.component.html',
  styleUrls: ['./painted-popup.component.scss']
})
export class PaintedPopupComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';
  base64File: any;
  oType: any;
  oTable: any;
  arrayBuffer: any;
  filelist: any[];
  file: any;
  excelDatasource: any=[];
  disabled: boolean = true;
  PaintedList: any=[];
  ImgData1: File;
  imgpath: string;
  imagename: any;
  model: boolean;
  upldType: string;
  modelEnbl: boolean;

  constructor(private ngZone: NgZone,public dialogRef: MatDialogRef<PaintedPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,public router:Router,private masterdata: MasterdataService, private toaster: ToastrManager,private excelService:ExcelserviceService) { }
  typeList:any=[{id:1,name:"Painted Data"}];
  tableList:any=[{id:1,name:"ECAT_PAINTED_HOME_SGMT_MASTER"},{id:2,name:"ECAT_PAINTED_HOME_SGMT_LEVEL1"},{id:3,name:"ECAT_PAINTED_HOME_SGMT_LEVEL2"},{id:4,name:"ECAT_PAINTED_HOME_MODEL_MASTER"},{id:5,name:"ECAT_PAINTED_HOME_COLOR_MASTER"},{id:6,name:"ECAT_PAINTED_MASTER"},{id:7,name:"ECAT_PAINTED_NUMBER"},{id:8,name:"ECAT_PAINTED_VEH_IMAGES"}];
  ngOnInit(): void {
    if(this.data){
      this.upldType = this.data.upldOpt;
    }
    console.log("typ1",this.data.upldOpt)
  }
  fileChangeEvent(event) {
    if(!this.oType && this.oTable == undefined)
    {
      this.toaster.warningToastr("Select the Type and Table to Upload");
      this.myfilename = '';
      return;
    } 
    if (event.target.files && event.target.files[0]) {
      this.myfilename = '';      
      this.file= event.target.files[0];       
      if(this.file.size > 0){     
      const reader = new FileReader();      
      reader.readAsArrayBuffer(this.file); 
      reader.onload = (e: any) =>{
        this.arrayBuffer = reader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      console.log("dat1",data);
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});         
      var sheet_name = workbook.SheetNames   
      // console.log("otable",this.oTable); 
      if(sheet_name.length > 0){
        sheet_name = sheet_name.filter(sh => sh == this.oTable.name);
      }
      if(this.oTable.name != sheet_name){
        this.toaster.warningToastr("selected table is not in Excel File");
        return; } 
      console.log("tette",sheet_name);
      var worksheet = workbook.Sheets[this.oTable.name];
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{defval:""});     
            this.filelist = [];    
            this.filelist = arraylist;
            
            this.myfilename += this.file.name ; 
            console.log("filename",this.myfilename);
            this.disabled = false;                         
      };
      reader.readAsArrayBuffer(event.target.files[0]);    }
      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Select File';
    }
  }

  fileChangeEvent123(e) {
  
    try{
    
    const fileName = e.target.files[0].name;
    
    import('xlsx').then(xlsx => {
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      // const file = ev.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = xlsx.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          console.log("sheet",sheet);
          initial[name] = xlsx.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.filelist = jsonData[Object.keys(jsonData)[0]];
        console.log("fillist",this.filelist);
        this.disabled = false;             
      };
      this.myfilename = fileName ; 
      reader.readAsBinaryString(e.target.files[0]);
      

    });
  
  }catch(e){
     console.log('error', e);
  }
  
  }

  readToDataSource(){
    if(this.filelist.length > 0){      
      if(this.oTable.id == 1){
        var obj:any={
          type:this.oType,
          mTable: this.oTable.name,
          mlist1: this.filelist                  
        }
      }else if(this.oTable.id == 2){
        var obj:any={
          type:this.oType,
          mTable: this.oTable.name,
          mlist2: this.filelist                  
        }
      }else if(this.oTable.id == 3){
        var obj:any={
          type:this.oType,
          mTable: this.oTable.name,
          mlist3: this.filelist                  
        }
      }else if(this.oTable.id == 4){
        var obj:any={
          type:this.oType,
          mTable: this.oTable.name,
          mlist4: this.filelist                  
        }
      }else if(this.oTable.id == 5){
        var obj:any={
          type:this.oType,
          mTable: this.oTable.name,
          mlist5: this.filelist                  
        }
      }else if(this.oTable.id == 6){
        var obj:any={
          type:this.oType,
          mTable: this.oTable.name,
          mlist6: this.filelist                  
        }
      }else if(this.oTable.id == 7){
        var obj:any={
          type:this.oType,
          mTable: this.oTable.name,
          mlist7: this.filelist                  
        }
      }else if(this.oTable.id == 8){
        var obj:any={
          type:this.oType,
          mTable: this.oTable.name,
          mlist8: this.filelist                  
        }
      }
      else{
        this.toaster.infoToastr("Select the Table to uplaod" );
        return; 
      }          
      this.masterdata.post(obj, 'api/CatalougeMaster/UploadExcelPaintedData').subscribe(
        (resp: any) =>{
        {
          if(resp.statusCode == 200)
          {
            this.toaster.successToastr(resp.data);
            this.myfilename = null; 
            //this.toaster.infoToastr("Add to the Parts Table" )                 
          }
          else{
            this.toaster.errorToastr("Duplicate Import");     
            }         
        }
            if (resp && resp.statusCode == 401) {       
              this.toaster.errorToastr("Error on Upload");
            }
            this.disabled = true; 
            this.myfilename = null; 
       }, error => {
            if (error.status == 401) {
              this.toaster.errorToastr(error.statusMessage);
            }      
            this.toaster.errorToastr(error.statusMessage);
            this.disabled = true;
            this.myfilename = null;  
          }
         
        );      
      
    }
  }
  BtnSaveUpload(){
    if(this.oType == 1){
      this.readToDataSource();
    }  
  }
  exportAsXLSX():void {  
    if(this.oType == 1)
    {
      this.getPaintedData();
      
    } 
    else{this.toaster.infoToastr("Select Type to Download")}
  }
  getPaintedData()
  {
    this.masterdata.getReq('', 'api/CatalougeMaster/GetPaintedImport?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {           
             this.PaintedList = resp.data;
             this.excelService.exportAsExcelMulFile(this.PaintedList, 'PaintedParts',this.tableList);                                    
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  filesDropped(evnt,num): void {
    if(num == 1){
      if(this.oTable.id == 1){
      this.ImgData1 = <File> evnt.target.files[0];  
      this.imagename = this.ImgData1.name;
      this.imgpath = "PAINTED_SEGMENT";
       }
     else if(this.oTable.id == 2){
      this.ImgData1 = <File> evnt.target.files[0];  
      this.imagename = this.ImgData1.name;
      this.imgpath = "segment_lvl1|Scooter";
     }
     else if(this.oTable.id == 3 )
     {
      this.ImgData1 = <File> evnt.target.files;  
      this.imagename = this.ImgData1[0].name;
      this.imgpath = "segment_lvl2|Motorcycle";
     }
     else if(this.oTable.id == 4 && this.model)
     {
      this.ImgData1 = <File> evnt.target.files[0];  
      this.imagename = this.ImgData1.name;
      this.imgpath = "Painted|"+this.model;
     }
     else if(this.oTable.id == 5 && this.model)
     {
      this.ImgData1 = <File> evnt.target.files;  
      this.imagename = this.ImgData1[0].name;
      this.imgpath = "Painted|"+this.model+"|ColorSelection";
     }
     else if(this.oTable.id == 8 && this.model)
     {
      this.ImgData1 = <File> evnt.target.files;  
      this.imagename = this.ImgData1[0].name;
      this.imgpath = "ModelColors|"+ this.model +"|colors";
     }
     else{
       this.toaster.infoToastr("No Images to Upload")
       this.ImgData1=null;
       this.imagename=null;
       this.imgpath=null;
     }    
    }    
    else
    {
      console.log("no image selected !!!!!!!");
    }  
    
  }
  uploadImage(){
    const fd = new FormData();
    let files:any = [] 
    files = this.ImgData1;
    if(files.length >1){ 
    for (var i = 0; i < files.length; i++) {  
      fd.append("fileUpload", files[i]);      
    }
    fd.append('folder',this.imgpath);   
    this.masterdata.postMultiImags(fd, 'api/CatalougeMaster/UploadMultileImgs').subscribe(  
      (resp: any) =>{ 
        {
          if(resp.statusCode == 200)
          {
            this.toaster.successToastr(resp.message);
            this.ImgData1 = null;
            this.imgpath = null; 
            this.imagename = null;
            //this.myiconimg  = null;          
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
    }else{
      if(!this.ImgData1){
        alert("No Images to Upload")
        return;
      }
      fd.append('image', this.ImgData1);
      fd.append('folder',this.imgpath);   
      this.masterdata.postimags(fd, 'api/CatalougeMaster/UploadImages').subscribe(
        (resp: any) =>{
        {
          if(resp.statusCode == 200)
          {
            this.toaster.successToastr(resp.message);
            this.ImgData1 = null;
            this.imgpath = null;
            this.imagename = null; 
            //this.myiconimg  = null;          
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
    //for(let i=0;i<=files.length;i++)   
    // 
  }
  onTablChange(evt){
    if(evt){
     if( this.oTable.id == 4 || this.oTable.id == 5 || this.oTable.id == 8){
       this.modelEnbl = true;
     }
     else
     {
       this.modelEnbl = false;
     }
    }
  }

}
