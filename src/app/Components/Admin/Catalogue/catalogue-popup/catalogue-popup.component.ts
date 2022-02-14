/*tslint:disable*/
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  x: string;
  y: string;
  type:string;
  series:string; 
  isEdt:string;
  editData:string;
  PS:string;
  modelId:string;
  curLst:any; 
}
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
@Component({
  selector: 'app-catalogue-popup',
  templateUrl: './catalogue-popup.component.html',
  styleUrls: ['./catalogue-popup.component.scss']
})
export class CataloguePopupComponent implements OnInit {
  partData:any={
    modelId:"",assemblyid:'',assemblyName:"",IsSubAssembly:false,series:"",subAssemblyId:null,subAssemDesc:null,subassemblygrp:null,figNo:null,Active:true
  }
  subPartData:any={REF_NO:1,COORDINATES:"",PART_NO:"",PART_DESC:"",QV:0,NDP:0,MRP:0,MOQ:1,ORD:0,ACTIVE:"true",x:"",y:"",REMARKS:"",FIG_NO:""};
  ModelData:any={MODEL_ID:null,MODEL_NAME:null,SERIES:null,ACTIVE:false,IS_ACC:false}
  assemlyData: any;
  assemblePart: any;
  series: string;
  modelID:string;
  coordMatch: any;
  imgVar: any;
  isReadonly: boolean;
  subAssemlyData: any;  
  SubAssemgrp: any;
  curntdata: any;
  Isexist: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CataloguePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private masterdata: MasterdataService, private toaster: ToastrManager) { }

  ngOnInit(): void {    
    if(this.data.isEdt == 'N' ){
    this.subPartData.x=this.data.x;
    this.subPartData.y=this.data.y;
    this.series=this.data.series;
    this.modelID = this.data.modelId;
    this.isReadonly = false;
    this.subPartData.COORDINATES = this.data.x +',' + this.data.y +',' + this.data.PS;
    this.subPartData.MRP = 0;
    this.subPartData.REMARKS = null;
    this.subPartData.FIG_NO = null; 
    this.getMopedDetail();   
    }else if(this.data.isEdt == 'CatY')
    { 
          
      this.partData = this.data.editData;
      this.series = this.data.series;   
      console.log('nn123',this.partData)
      this.getMopedDetail();              
      if(this.subPartData.IS_SUBASSEMBLY_ID == true){this.getSubassemDetail()}
    }else
    {
     this.subPartData = this.data.editData;
     this.isReadonly = true;
    }
    this.curntdata = this.data.curLst;
    console.log("currentdata",this.curntdata); 
  }  
  getMopedDetail() {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/GetVehCoordinatesbySeries?series='+this.series).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.assemlyData = resp.data; 
            this.assemblePart = resp.data.coordinates;
            
            if(this.data.isEdt != 'CatY')
            {
              this.getassignedData();
            }else{
              this.geteditdata();
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
  getassignedData(){
    if(this.assemlyData){
      this.getmatchData(this.subPartData.x,this.subPartData.y)
      this.partData.modelId = this.modelID;
    }else {this.partData.modelId = this.modelID;return;}            
      if(this.coordMatch.length > 0)
      {     
        this.partData.modelId = this.coordMatch[0].MODEL_ID;
        this.partData.assemblyid = this.coordMatch[0].ASSEMBLY_ID;
        this.partData.assemblyName = this.coordMatch[0].ASSEMBLY_NAME;
        this.partData.IsSubAssembly = this.coordMatch[0].IS_SUBASSEMBLY_ID
        this.partData.figNo = this.coordMatch[0].FIG_NO      
        this.partData.series = this.series;
        if(this.coordMatch[0].IS_SUBASSEMBLY_ID == true){this.getSubassemDetail()}
      }else{this.partData.modelId = this.modelID} 
      this.partData.modelId = this.modelID    
  }
  geteditdata(){
    let assemblydata = [];    
    this.partData = this.assemblePart.filter(x => x.MODEL_ID == this.partData.MODEL_ID && x.ASSEMBLY_ID == this.partData.ASSEMBLY_ID)
     console.log('asdasdad',this.partData);
        this.partData.modelId = this.partData[0].MODEL_ID;
        this.partData.assemblyid = this.partData[0].ASSEMBLY_ID;
        this.partData.assemblyName = this.partData[0].ASSEMBLY_NAME;
        this.partData.IsSubAssembly = this.partData[0].IS_SUBASSEMBLY_ID
        this.partData.figNo = this.partData[0].FIG_NO      
        this.partData.series = this.series;
        this.partData.Active = this.partData[0].ACTIVE
        this.subPartData.COORDINATES = this.partData[0].COORDINATES;        
        if(this.partData[0].IS_SUBASSEMBLY_ID == true){this.getSubassemDetail()}
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
  filterItemsOfType(x1,y){
    
    const ele = [x1,y];
    let comb = ele.join();
    let filterdata:any= [];
    filterdata =  this.assemlyData.coordinates.filter(x => x.COORDINATES == [x1,y,x.COORDINATES.split(",")[2]].join());
    return filterdata;
  }
  getSubassemDetail() {
    // this.isShowPageLoader = true;GetVehCoordinatesbySeries
    this.masterdata.getReq('', 'api/Catalouge/GetCoordinatesforSubAssembly?series='+this.series+'&ASSEMBLY_ID='+ this.partData.assemblyid).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.subAssemlyData = resp.data;
            this.SubAssemgrp =  this.subAssemlyData[0].ASSEMBLY_GROUP           
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
//   getPartAssembDetail() {    
//    this.masterdata.getReq('', 'api/Catalouge/GetPartDetailsByAssemblyID?SERIES='+this.series+'&ASSEMBLY_ID='+this.partData.assemblyid).subscribe(
//      (resp: any) => 
//     {
//          if (resp && resp.statusCode == 200) {
//            this.imgVar = resp.data.IMAGE_LINK;
//            this.subPartData = resp.data.partDetails      
//          }         
//     }, error => {
//          if (error.status == 401) {         
//           this.toaster.errorToastr(error.statusMessage);
//          }         
//          this.toaster.errorToastr(error.statusMessage);
//        }
//      );    
//  }
 save(){ 
  this.ModelData.SERIES = this.series;
  this.ModelData.ACTIVE = true;
  this.ModelData.IS_ACC = false;
  //let req = {"Parts":this.ModelData}
  
   this.masterdata.post(this.ModelData, 'api/CatalougeMaster/AddUpdateModel').subscribe(
  (resp: any) =>{
  {
    if(resp.statusCode == 200)
    {
      this.toaster.successToastr(resp.data);
      this.ModelData.MODEL_ID = null;
      this.ModelData.MODEL_NAME = null;
      this.dialogRef.close(); 
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
onchange(data){
  this.partData.subAssemblyId = data.value.ASSEMBLY_ID;
  this.partData.subAssemDesc = data.value.ASSEMBLY_NAME;
  this.partData.figNo = data.value.FIG_NO;
  this.partData.subassemblygrp = this.SubAssemgrp; 
}

checkCurrentParts(){  
  let temlist = this.curntdata;
   temlist =  temlist.filter(e => e.PART_NO == this.subPartData.PART_NO && e.REF_NO == this.subPartData.REF_NO)  
   if(temlist.length > 0){
     this.toaster.infoToastr("Part No Already Existing")
     this.Isexist = true;     
   }else(this.Isexist = false);   
}

}

