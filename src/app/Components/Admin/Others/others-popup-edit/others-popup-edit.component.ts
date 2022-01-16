/*tslint:disable*/
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
export interface DialogData {
data: any,
isEdit:string,
typeid:string,
menuID:string,
subMenu:string
}
@Component({
  selector: 'app-others-popup-edit',
  templateUrl: './others-popup-edit.component.html',
  styleUrls: ['./others-popup-edit.component.scss']
})
export class OthersPopupEditComponent implements OnInit {
  typeId: any;
  MenuID: any;

  constructor(public dialogRef: MatDialogRef<OthersPopupEditComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,private masterdata: MasterdataService, private toaster: ToastrManager,private http: HttpClient) { }
  otherEditData: any={};
  ngOnInit(): void {
    if(this.data.isEdit == 'Y'){
      this.otherEditData = this.data.data;
      this.typeId = this.data.typeid;
      this.MenuID = this.data.menuID;
    }
  }
  saveToList(){
    if(this.typeId == null || this.typeId == undefined){
      this.toaster.warningToastr("select Type")
      return;
    }
    if(this.MenuID == null || this.MenuID == undefined){
      this.toaster.warningToastr("select Menu");
      return;
    }
    let req;
    if(this.typeId == 1 || this.typeId == 4){
      if(this.otherEditData.PartNO == null || this.otherEditData.PartNO == ''){
        this.toaster.warningToastr("Enter Part Number");
        return;
      }
        if(this.otherEditData.Description == null || this.otherEditData.Description == ''){
          this.toaster.warningToastr("Enter Part Name");
          return;
        }
        if(this.otherEditData.MRP == null || this.otherEditData.MRP <= 0){
          this.toaster.warningToastr("Enter MRP");
          return;
        }
        var objtru4: any ={
          "PartNO": this.otherEditData.PartNO,
          "Description": this.otherEditData.Description,
          "TruSeries": this.otherEditData.TruSeries,
          "Capacity": this.otherEditData.Capacity,
          "NDP" : this.otherEditData.NDP,
          "MRP": this.otherEditData.MRP,
          "Active": this.otherEditData.Active,         
        }
        req = {"tru4parts":objtru4,"Parts":null, "type":this.typeId}
    }
    if(this.typeId == 2){
      if(this.otherEditData.PartID == null || this.otherEditData.PartID == ''){
        this.toaster.warningToastr("Enter Part NO");
        return;
      }
        if(this.otherEditData.PartDesc == null || this.otherEditData.PartDesc == ''){
          this.toaster.warningToastr("Enter Part Name");
          return;
        }
        if(this.otherEditData.Price == null || this.otherEditData.Price <= 0){
          this.toaster.warningToastr("Enter Price");
          return;
        }
        if(this.otherEditData.MODELID == null || this.otherEditData.MODELID == ''){
          this.toaster.warningToastr("Enter ModelID");
          return;
        }
        var objclu:any = {
        "SegID": this.MenuID,
        "ModelID": this.data.subMenu,
        "PartID": this.otherEditData.PartID,
        "PartDesc": this.otherEditData.PartDesc,
        "ClusterID" : this.otherEditData.ClusterID,
        "Active": 1
        }
        req = {"tru4parts":null, "Parts":objclu,"type":this.typeId}
    }
    
    //  if(this.typeId == 2){
    //    req = {"Parts":obj,"type":this.typeId}
    //  }else if(this.typeId == 3){
     //   req = {"Parts":obj,"KitParts":objkit,"type":this.typeId}
    //  }
     
      this.masterdata.post(req, 'api/CatalougeMaster/AddUpdateOthersdata').subscribe(
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
    localStorage.setItem('others',JSON.stringify(this.otherEditData));
    
  }
}
