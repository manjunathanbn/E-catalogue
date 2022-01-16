/*tslint:disable*/
import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit, VERSION, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from 'src/app/Services/common.service';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import * as XLSX from 'xlsx';
import { ExcelserviceService } from 'src/app/Services/excelservice.service'
import { NgxUiLoaderService } from 'ngx-ui-loader';
//import { DialogData } from '../../Catalogue/catalogue-popup/catalogue-popup.component';
export interface DialogData {
  upldOpt:string
  }
@Component({
  selector: 'app-other-popup',
  templateUrl: './other-popup.component.html',
  styleUrls: ['./other-popup.component.scss']
})
export class OtherPopupComponent implements OnInit {
   
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';
  myiconimg = "Select Icon Img"
  mylblimg = "select Label Img"
  mypartimg = "select part img"
  filename: any;
  base64File: any;
  oType: any;
  oTable: any;
  arrayBuffer: any;
  filelist: any[];
  file: any;
  excelDatasource: any=[];
  ClustorData:any=[];
  KitData: any=[];
  SPTools: any=[];
  Tru4Data: any=[];
  upldTyp: string;
  ImgData: File = null;
  ImgData2: File;
  disabled: boolean = false;
  constructor(private customLoader: NgxUiLoaderService,public dialogRef: MatDialogRef<OtherPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,public router:Router,private masterdata: MasterdataService, private toaster: ToastrManager,private excelService:ExcelserviceService) { }
  typeList:any=[{id:1,name:"TRU4"},{id:2,name:"Photo Cluster"},{id:3,name:"Kits Parts"},{id:4,name:"Special Tool"}];
  tableList:any=[{id:1,name:"ECAT_PR_SEGMENT_MODEL_MASTER"},{id:2,name:"ECAT_CLUSTER_MASTER"},{id:3,name:"ECAT_PR_PART_MASTER"},{id:4,name:"ECAT_CLUSTER_MAIN_CAT"}];
  tabKitList:any=[{id:1,name:"ECAT_KIT_PARTS"},{id:2,name:"ECAT_KIT_PARTS_DET"}]
  tabTru4List:any=[{id:1,name:"ECAT_TRU4_CONSUMEABLE_HEADERS"},{id:2,name:"ECAT_TRU4_CONSUMABLE_PARTS"}]
  tabSPTList:any=[{id:1,name:"ECAT_SPECIAL_TOOLS_HEADERS"},{id:2,name:"ECAT_SPECIAL_TOOLS_PARTS"}]    
  
  ngOnInit(): void {    
  if(this.data){
    console.log("dat",this.data)
    this.upldTyp = this.data.upldOpt;   
  }
  }
  fileChangeEvent123(event) {
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
      reader.onload = (e: any) => {
        this.customLoader.start();
        console.log("loader",this.customLoader);
        this.arrayBuffer = reader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      console.log("dat1",data);
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});         
      var sheet_name = workbook.SheetNames[this.oTable.id -1];    
      var worksheet = workbook.Sheets[sheet_name]; 

      this.customLoader.stop();
      if(this.oTable.name != sheet_name){
        this.toaster.warningToastr("selected table is not in Excel File");
        return; } 
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            this.filelist = [];    
            this.filelist = arraylist;
            console.log(this.filelist);
            this.myfilename += this.file.name ;                          
      };
      reader.readAsDataURL(event.target.files[0]);
      this.disabled = false;
    }
      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Select File';
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
      }
      else{
        this.toaster.infoToastr("Select the Table to uplaod" );
        return; 
      }          
      this.masterdata.post(obj, 'api/CatalougeMaster/UploadExcelOtherData').subscribe(
        (resp: any) =>{
        {
          if(resp.statusCode == 200)
          {
            this.toaster.successToastr(resp.data); 
            //this.toaster.infoToastr("Add to the Parts Table" )                 
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
  UploadKitsMasters(){
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
      }else{
        this.toaster.infoToastr("Select the Table to uplaod" );
        return; 
      }          
      this.masterdata.post(obj, 'api/CatalougeMaster/UploadkitsExcelData').subscribe(
        (resp: any) =>{
        {
          if(resp.statusCode == 200)
          {
            this.toaster.successToastr(resp.data); 
            //this.toaster.infoToastr("Add to the Parts Table" )                 
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
  UploadTru4Masters(){
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
      }else{
        this.toaster.infoToastr("Select the Table to uplaod" );
        return; 
      }          
      this.masterdata.post(obj, 'api/CatalougeMaster/UploadTru4ExcelData').subscribe(
        (resp: any) =>{
        {
          if(resp.statusCode == 200)
          {
            this.toaster.successToastr(resp.data); 
            //this.toaster.infoToastr("Add to the Parts Table" )                 
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
  UploadSPTMasters(){
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
      }else{
        this.toaster.infoToastr("Select the Table to uplaod" );
        return; 
      }          
      this.masterdata.post(obj, 'api/CatalougeMaster/UploadSPTExcelData').subscribe(
        (resp: any) =>{
        {
          if(resp.statusCode == 200)
          {
            this.toaster.successToastr(resp.data); 
            this.disabled = true;
            //this.toaster.infoToastr("Add to the Parts Table" )                 
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
  BtnSaveUpload()
   {if(this.oType == 1){
     this.UploadTru4Masters();
   }
    else if(this.oType == 2) {
       this.readToDataSource();} 
    else if(this.oType == 3){
      this.UploadKitsMasters();
    }
    else if(this.oType == 4){
      this.UploadSPTMasters();
    }
    this.myfilename = "";
    this.disabled = true;     
   }
  //  exportAsXLSX(): void {
  //   this.excelDatasource = this.convertData();
  //   let excelJsonData = this.excelDatasource;
  //   console.log(JSON.stringify(excelJsonData));
  //   this.excelService.exportAsExcelFile(excelJsonData, 'sample');
  // }
  exportAsXLSX():void {  
    if(this.oType == 1)
    {
      this.excelService.exportAsExcelMulFile(this.Tru4Data, 'Tru4Data',this.tabTru4List);
    }  
    else if(this.oType == 2){            
      this.excelService.exportAsExcelMulFile(this.ClustorData, 'ClustorData',this.tableList);
    }else if(this.oType == 3)
      {       
        this.excelService.exportAsExcelMulFile(this.KitData, 'KitData',this.tabKitList);
      }
      else if(this.oType == 4)
      {       
        this.excelService.exportAsExcelMulFile(this.SPTools, 'KitData',this.tabSPTList);
      }
      else{this.toaster.infoToastr("Select Type to Download")}
  }
  getClustorData()
  {
    this.masterdata.getReq('', 'api/CatalougeMaster/GetClustorImport?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {           
             this.ClustorData = resp.data;                                    
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  getKitDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/CatalougeMaster/getPrKitMaster?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.KitData.mlist1 = resp.data.kitParts;  
            this.KitData.mlist2 = resp.data.kPartsDtls;          
            //this.prPartslist = this.tempPartslist.filter(key => key.MODELID == '000020000200000003')                             
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  getTru4Detail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/CatalougeMaster/getTru4MasterData?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.Tru4Data.mlist1 = resp.data.Headers;  
            this.Tru4Data.mlist2 = resp.data.Parts;          
            //this.prPartslist = this.tempPartslist.filter(key => key.MODELID == '000020000200000003')                             
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  getSPTDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/CatalougeMaster/getSPTMaster?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.SPTools.mlist1 = resp.data.Headers;  
            this.SPTools.mlist2 = resp.data.Parts;    
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  getdata(e)
  {if(this.oType == 1){
    this.getTru4Detail();
  }
    else if(this.oType == 2){ 
      this.getClustorData();
    }else if(this.oType == 3)
    {
      this.getKitDetail();
    }else if(this.oType == 4)
    {
      this.getSPTDetail();
    }
  }
  filesDropped(evnt,num): void {
    if(num == 1){
      this.ImgData = <File> evnt.target.files[0];  
      this.myiconimg = this.ImgData.name;
      console.log("i got 1 img",this.myiconimg);  
    }else if(num == 2){
      this.ImgData2 = <File> evnt.target.files[0];  
      this.mylblimg = this.ImgData2.name;
      console.log("i got 2 img",this.mylblimg);  
    }else if(num == 3){
      console.log("test",this.tabTru4List[1])
      this.ImgData = <File> evnt.target.files[0];
      this.mypartimg = this.ImgData.name;
      console.log("i got part img",this.mypartimg);
    }else
    {
      console.log("no image selected !!!!!!!");
    }  
    
  }
  uploadImage(tpath,id){
    const fd = new FormData();
    if(id == 1){
    fd.append('image', this.ImgData);
    fd.append('folder',tpath);
    }else if(id == 2){
      fd.append('image', this.ImgData2);
    fd.append('folder',tpath);
    }else if(id == 3)
    {
      fd.append('image', this.ImgData);
    fd.append('folder',tpath);
    }
    this.masterdata.postimags(fd, 'api/CatalougeMaster/UploadImages').subscribe(
      (resp: any) =>{
      {
        if(resp.statusCode == 200)
        {
          this.toaster.successToastr(resp.message); 
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
  ImageUpload(eve){
    if(this.oType == 1 && this.oTable == "" )
    {
     
    }

  }
  // convertData() {
  //   let elemCount;
  //   let finalData = [];
  //   for (const [key, value] of Object.entries(this.dataSource[0])) {
  //     console.log(key, value);
  //     elemCount = value;
  //     for (let i = 0; i < elemCount; i++) {
  //       if (!finalData[i]) {
  //         finalData[i] = {
  //           SegID: '',
  //           ModelID: '',
  //           PartID: '',
  //           PartDesc: '',
  //           ClusterID: '',
  //           Active: '',
  //         };
  //       }
  //       finalData[i][key] = value[i];
  //     }
  //   }
  //   console.log(finalData);
  //   return finalData;
  // }

}
