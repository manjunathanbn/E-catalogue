/*tslint:disable*/
import { Component, OnInit, ViewChild,Pipe,  PipeTransform } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { Router } from '@angular/router';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OtherPopupComponent } from '../../Others/other-popup/other-popup.component';
import {OthersPopupEditComponent} from '../../Others/others-popup-edit/others-popup-edit.component'
import { FeedbackEntryHomeComponent } from 'src/app/Components/feedback-entry/feedback-entry-home/feedback-entry-home.component';
@Component({
  selector: 'app-others-home',
  templateUrl: './others-home.component.html',
  styleUrls: ['./others-home.component.scss','../../Catalogue/catalogue-home/catalogue-home.component.scss']
})
export class OthersHomeComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
  typeList:any=[{id:1,name:"TRU4"},{id:2,name:"Photo Cluster"},{id:3,name:"Kits Parts"},{id:4,name:"Special Tool"}];
  displayedtru4Columns: string[]=["id","type","partNo","partName","Capacity","ndp","mrp","status","edit"];
  displayedColumns: string[]=["id","type","ClusterID","partNo","partName","qv","ndp","moq","remarks","edit"];
  displayedkitColumns: string[]=["id","Kit","KitName","partNo","partName","Qty"];
  dataSource:any[]=[{id:1,type:"Kits Part",partNo:"P545",partName:"Engine",qv:5,ndp:7,moq:6,remarks:"Remarks"}];
  //displaySptColumns: string[]=["id","type","partNo","partName","Capacity","ndp","mrp","status","edit"];
  menuList: any;
  submenuList: any;
  tempsublist: any;  
  tempPartslist: any;
  type: any;
  MenuID:any;
  SubMenuId:any;
  typeId:any;
  KitPartlist: any;
  kitID:any;
  kitview: any;
  kitname: any;
  excelDatasource:any[];
  constructor(public dialog: MatDialog,private router:Router,private masterdata: MasterdataService, private toaster: ToastrManager) { }
  
  ngOnInit(): void {
    var list=JSON.parse(localStorage.getItem('others'));
    this.type = this.typeList[1].name
    //this.getMenuDetail();
    if(list){
      this.dataSource.push(list);
      localStorage.removeItem('others');
    }    
  }
  createNew(){
    this.router.navigate(['/others/detail']);
  }
  getMenuDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/CatalougeMaster/getPrClustorMenu?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.menuList = resp.data.PMenuLst;
            this.submenuList = resp.data.modelDatas;
            this.tempsublist = resp.data.modelDatas;
            this.dataSource = resp.data.prClustorParts;
            this.tempPartslist = resp.data.prClustorParts; 
            //this.prPartslist = this.tempPartslist.filter(key => key.MODELID == '000020000200000003')                             
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
            this.menuList = resp.data.SegMaster;
            this.submenuList = resp.data.kitParts;
            this.tempsublist = resp.data.kitParts;
            this.dataSource = resp.data.kPartsDtls;
            this.tempPartslist = resp.data.kPartsDtls; 
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
            this.menuList = resp.data.Headers;            
            this.dataSource = resp.data.Parts;
            this.tempPartslist = resp.data.Parts; 
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
            this.menuList = resp.data.Headers;  
            this.dataSource = resp.data.Parts;
            this.tempPartslist = resp.data.Parts;    
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  onSubChange(id){
    if(!this.typeId) {
      this.toaster.infoToastr("Select Type to filter");       
      return;
    }
    if(this.typeId == 2){
      this.submenuList = this.tempsublist.filter(key => key.CATEGORY_ID == id)
      this.type = this.typeList[this.typeId-1].name;
    }else
    {
      let list = this.tempsublist.filter(key => key.SEG == id) 
      this.submenuList = [...new Map(list.map(item =>
      [item["MODEL_APPL"], item])).values()];
      this.type = this.typeList[this.typeId-1].name;
    }   
        //this.dataSource = this.tempPartslist.filter(key => key.CATEGORY_ID == this.catid && key.SEGMENT_ID == id)
  }
  onSubMenuChange(id){  
    if(this.typeId == 2){
      this.dataSource = this.tempPartslist.filter(key => key.MODELID == id)}else
      {
       this.KitPartlist = this.tempsublist.filter(key => key.MODEL_APPL == this.SubMenuId)
      }
  }
  openDialog(type) {    
      const dialogRef = this.dialog.open(OtherPopupComponent,{
        data:{upldOpt:type}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          
        }
      });   
  }
  openbtnDialog(type){
    this.openDialog(type);
  }
  onTypChange(evnt)
  {
    if(this.typeId == 1){
      this.getTru4Detail();
    }
    else if(this.typeId == 2){
       this.getMenuDetail();
     }else if(this.typeId == 3)
     {
       this.getKitDetail();
     }else if(this.typeId == 4)
     {
       this.getSPTDetail();
     }
  }
  onKitSelect(event)
  {    
    if(this.typeId == 3){
      this.dataSource = this.tempPartslist.filter(key => key.KIT_ID == this.kitID);
      this.kitview = this.KitPartlist.filter(key => key.KIT_ID == this.kitID)[0].KIT_PART_NO;
      this.kitname = this.KitPartlist.filter(key => key.KIT_ID == this.kitID)[0].KIT_DESCRIPTION;
    }

  }
  onSMenuChange(event){
    if(this.typeId == 1 || this.typeId == 4)
    {
      this.dataSource = this.tempPartslist.filter(key => key.TruSeries == this.MenuID);
    }   
  }
  editData(data)
{
  //this.openDialog();
  const dialogRef = this.dialog.open(OthersPopupEditComponent,{
    data:{data:data,isEdit:'Y',typeid:this.typeId,menuID:this.MenuID,subMenu:this.SubMenuId},
    width:"700px"
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      
    }
  });   
}
myFeedbck(){
  // this.sidenaveService.togglingSidenav({});    
  //this.router.navigate(['/feedbackEntry/']);
  const dialogRef = this.dialog.open(FeedbackEntryHomeComponent, {
    data: {title:'admin'},
    width:"750px",
    height:"500px"      
  });    
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);     
  });   
}
 
  
}
