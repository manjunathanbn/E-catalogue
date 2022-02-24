/*tslint:disable*/
import { Component, OnInit, VERSION, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ExcelserviceService } from 'src/app/Services/excelservice.service'
import * as XLSX from 'xlsx';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';  
export interface DialogData {
  upldTyp:string
  }
@Component({
  selector: 'app-menuupload-popup',
  templateUrl: './menuupload-popup.component.html',
  styleUrls: ['./menuupload-popup.component.scss']
})
export class MenuuploadPopupComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';
  filename: any;
  base64File: any;
  serId: any;
  oTable: any;
  arrayBuffer: any;
  filelist: any[];
  file: any;
  excelDatasource: any=[];
  Series: any;
  disabled: boolean = true;
  AssemblyList: any = [];
  upldType: string;
  ImgData1: File;
  imagename: string;
  imgpath: string;
  templist: any;
 
  constructor(public router:Router,private masterdata: MasterdataService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private toaster: ToastrManager,private excelService:ExcelserviceService) { }
  tableList:any=[{id:1,name:"ECAT_VEHCLE_SERIES"},{id:2,name:"ECAT_MODEL_MASTER"},{id:3,name:"ECAT_ASSEMBLY_MASTER"},{id:4,name:"ECAT_ASSEMBLY_GROUP"},{id:5,name:"ECAT_CATALOGUE"},{id:6,name:"ECAT_CATALOGUE_QV"}];
  tableIMGList:any=[{id:1,name:"ECAT_VEHCLE_SERIES"},{id:3,name:"ECAT_VEHICLE_IMAGES"},{id:6,name:"ECAT_ASSEMBLY_IMAGES"}];

  ngOnInit(): void {
    this.getClustorData();
    if(this.data){
      console.log("dat",this.data)
      this.upldType = this.data.upldTyp;   
    }
  }
  fileChangeEvent(event) {
    if(!this.serId && !this.oTable)
    {
      this.toaster.warningToastr("Select the series and Table to Upload");
      this.myfilename = '';
      return;
    } 
    if (event.target.files && event.target.files[0]) {
      this.myfilename = '';      
      this.file= event.target.files[0];       
      if(this.file.size > 0){     
      const reader = new FileReader();      
      reader.readAsArrayBuffer(this.file);
      reader.onload = (e: any) => {
        this.arrayBuffer = reader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
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
      var worksheet = workbook.Sheets[this.oTable.name];
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{defval:""});     
            this.filelist = [];    
            this.filelist = arraylist;
            console.log(this.filelist);
            this.myfilename += this.file.name ;
            this.disabled = false;                           
      };
      reader.readAsDataURL(event.target.files[0]);
       }
      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Select File';
    }
  }
  getClustorData()
  {
    this.masterdata.getReq('', 'api/Catalouge/GetMenuList?dealerID='+localStorage.getItem('dealercode')+'&type=1').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {    
             this.Series = resp.data;
             this.templist = resp.data;
             this.Series = [...new Map(this.templist.map(item =>
              [item["SERIES"], item])).values()];                                     
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  BtnSaveClick(){
    if(this.filelist.length > 0)
    {
      if(!this.serId && !this.oTable)
      {
        this.toaster.warningToastr("Select the series and Table to Upload");
        this.myfilename = '';
        return;
      } 
      let seriesLst = this.filelist.filter(key => key.SERIES === this.serId.SERIES)
      if(seriesLst.length <= 0){
        console.log("series",seriesLst)
        this.toaster.infoToastr("Selected Series is not Matching in Excel Sheet")
        return;
      }
      if(this.filelist.length > 0){
        if(this.oTable.id == 1){
        var obj:any={
          type:this.serId.SERIES,
          mTable: this.oTable.name,
          mlist1: this.filelist   
        }
      }else if(this.oTable.id == 2){
        var obj:any={
          type:this.serId.SERIES,
          mTable: this.oTable.name,
          mlist2: this.filelist   
        }
      }else if(this.oTable.id == 3){
        var obj:any={
          type:this.serId.SERIES,
          mTable: this.oTable.name,
          mlist3: this.filelist   
        }
      }else if(this.oTable.id == 4){
        var obj:any={
          type:this.serId.SERIES,
          mTable: this.oTable.name,
          mlist4: this.filelist   
        }
      }else if(this.oTable.id == 5){
        var obj:any={
          type:this.serId.SERIES,
          mTable: this.oTable.name,
          mlist5: this.filelist   
        }
      }else if(this.oTable.id == 6){
        var obj:any={
          type:this.serId.SERIES,
          mTable: this.oTable.name,
          mlist6: this.filelist   
        }
      }else if(this.oTable.id == 7){
        var obj:any={
          type:this.serId.SERIES,
          mTable: this.oTable.name,
          mlist7: this.filelist   
        }
      }else if(this.oTable.id == 8){
        var obj:any={
          type:this.serId.SERIES,
          mTable: this.oTable.name,
          mlist8: this.filelist
        }
      }
      else{
        this.toaster.infoToastr("select Table to Upload the Datasheet")
      }
      }else
      {
        this.toaster.infoToastr("select Table to Upload the Datasheet")
      }
      
      this.masterdata.post(obj, 'api/CatalougeMaster/UploadExcelAssemblyData').subscribe(
        (resp: any) =>{
        {
          if(resp.statusCode == 200)
          {
            this.toaster.successToastr(resp.data);
            this.filelist = [];
            this.myfilename = "";
            this.disabled = true;                        
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
    
  }
  exportAsXLSX():void{
    if(this.serId){
      this.getAllAssemblyData();
    }else{
      this.toaster.infoToastr("Please select the Vehicle Model");
    }
  }
  
  getAllAssemblyData() {
    this.masterdata.getReq('', 'api/CatalougeMaster/GetAssemblySeriesData?dealerID='+localStorage.getItem('dealercode')+'&Series='+this.serId.SERIES).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {           
             this.AssemblyList = resp.data;
             this.excelService.exportAsExcelMulFile(this.AssemblyList, 'AssemblyVehicleSeries',this.tableList);                                    
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
      this.imgpath = "Series";
     console.log("i got 1 img",this.imagename);  }
     else if(this.oTable.id == 3){
      this.ImgData1 = <File> evnt.target.files[0];  
      this.imagename = this.ImgData1.name;
      this.imgpath = "Vehicle";
     }
     else if(this.oTable.id == 6 && this.serId.SERIES)
     {
      this.ImgData1 = <File> evnt.target.files;  
      this.imagename = this.ImgData1[0].name;
      this.imgpath = this.serId.SERIES;
     }
     else{
       this.toaster.infoToastr("No Images to Upload")
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
 

}
