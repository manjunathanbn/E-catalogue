/*tslint:disable*/
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CommonService } from 'src/app/Services/common.service';
import { ExcelserviceService } from 'src/app/Services/excelservice.service';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { SidenavService } from 'src/app/Services/sidenave.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FeedbackDetailsComponent } from '../../reports/feedback-details/feedback-details.component';

@Component({
  selector: 'app-feedback-entry-home',
  templateUrl: './feedback-entry-home.component.html',
  styleUrls: ['./feedback-entry-home.component.scss']
})
export class FeedbackEntryHomeComponent implements OnInit {
   subject:any;
   remarks:string = "";
   Replies:string = "";  
   cartList:any=[];
   adminrol: any=false;
  step = 0;
  responseData: any;
  tableList:any=[{id:1,name:"ECAT_FEEDBACK_DETAILS"},{id:2,name:"ECAT_FEEDBACK_DETAILS"}];
  htmlContent:string = '';
  htmlContentWithoutStyles='';
  type:any;
  status:any;
showHTML(){
  this.htmlContentWithoutStyles=document.getElementById("htmlDiv").innerHTML;

}
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    maxHeight: '185px',
    minHeight: '185px',
    placeholder: 'Enter text here...',
    translate: 'no',
    
    
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialogRef: MatDialogRef<FeedbackDetailsComponent>,public sidenaveService:SidenavService,private excelService:ExcelserviceService,private masterdata: MasterdataService,private toaster: ToastrManager) { }

  ngOnInit(): void {
    this.getFeedbackDetails();
    console.log("theis role",this.data)
    if(this.data){
      if(this.data.data){
        this.subject = this.data.data.SUBJECT;
        this.remarks = this.data.data.DESCRIPTION;
        this.type = this.data.type;
      }else{
        this.adminrol = this.data.title;
      }
    }
    console.log("the is role",this.adminrol)
    // this.sidenaveService.lisentingRole().subscribe(res => {
    //   this.adminrol=res;
    // });
    //console.log("theis role",localStorage.getItem('role'))
   //this.adminrol = localStorage.getItem('role')
  }
  SaveEnter(i){
    if(!this.subject){
      alert("Enter the Subject");
      return;
    }    
    if(!this.remarks){
      alert("Enter the Remarks");
      return;
    }
    if(this.type == 'feedback'){
      if(!this.Replies){
        alert("Please Replay to Message");
        return;
      }
    }    
    var obj:any = {
      "SUBJECT":this.subject,
      "DESCRIPTION":this.remarks,
      "DEALER_ID": this.type == "feedback"? this.data.data.DEALER_ID : localStorage.getItem('dealercode'),
      "REPLIES": this.type == "feedback"? this.Replies : null,
      "FEEDBK_NO": this.type == "feedback"? this.data.data.FEEDBK_NO : 0,
      "STATUS": this.type == "feedback"? this.status : 0,
      "ISEDIT": i
    }
    this.masterdata.post(obj, 'api/Catalouge/AddRemoveFeedbackPts').subscribe(
      (resp: any) =>{
      {
        if(resp.statusCode == 200)
        {
          if(this.type == 'feedback'){
            this.toaster.successToastr("Updated successfully");
            this.remarks = null;
            this.subject = null;
            this.Replies = null; 
            this.dialogRef.close();
            
          }else{
            this.remarks = null;
            this.subject = null;
            this.toaster.successToastr(resp.data); 
          } 
                
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
  ClearAll(){
    this.remarks = null;
  }
  getFeedbackDetails() {
    // this.isShowPageLoader = true;
    //this.customLoader.start();
    this.masterdata.getReq('', 'api/Catalouge/GetFeedbackDetails?').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.responseData = resp.data;
            this.cartList = resp.data.filter(x => x.DEALER_ID == localStorage.getItem('dealercode'))                       
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
  ExportExcel(){
    if(this.cartList.length > 0)
    {
      this.excelService.exportAsExcelFile(this.cartList, 'FeedbackDetails');
    }
  }
}
