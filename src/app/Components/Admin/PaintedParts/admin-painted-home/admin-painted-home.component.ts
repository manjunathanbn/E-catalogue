/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { Router } from '@angular/router';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialog } from '@angular/material/dialog';
import { PaintedPopupComponent } from 'src/app/Components/Admin/PaintedParts/painted-popup/painted-popup.component';
import { timeStamp } from 'console';
@Component({
  selector: 'app-admin-painted-home',
  templateUrl: './admin-painted-home.component.html',
  styleUrls: ['./admin-painted-home.component.scss','../../Catalogue/catalogue-home/catalogue-home.component.scss']
})
export class AdminPaintedHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
  displayedColumns: string[]=["segId","segName","serId","serName","modId","modNam","mVarnt","figno","colId","colNam","parts"];
  dataSource:any[]=[];
  tempdata:any[];
  menuList: any;
  submenuList:any;
  MenuTypelst:any;
  subHead:any;
  catid:any;
  submenuId:any;
  typeList:any;
  tempsublist: any;
  temptyplst: any;
  PaintedData: any;
  colordata: any;
  colorData: any;
  menuTYPE: any;
  constructor(public dialog: MatDialog,private router:Router,private masterdata: MasterdataService, private toaster: ToastrManager) { }
  
  ngOnInit(): void {
    this.getMenuDetail();
  }
  createNew(){
    this.router.navigate(["/adminPainted/detail"]);
  }
  editData(data,i){
   if(i==1){this.openEditDiaLog(data)}
   if(i==2){this.openbtnDialog(data)}
   if(i==3){this.openEditDiaLog(data)}   
  }
  getMenuDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/CatalougeMaster/GetPaintedMenus?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.menuList = resp.data.PMenuLst;
            this.submenuList = resp.data.pSubMenuLst;
            this.tempsublist = resp.data.pSubMenuLst
            this.MenuTypelst = resp.data.PTypeMenuLst;
            this.temptyplst = resp.data.PTypeMenuLst;
            this.dataSource = resp.data.paintSegData;
            this.tempdata = resp.data.paintSegData;
            this.colordata = resp.data.colorList;
          }         
          }, error => {
          if (error.status == 401) {   }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  onMenuChange(id){
    //this.tempdata = this.dataSource;
    this.submenuList = this.tempsublist.filter(key => key.TYPE == this.menuList[id.selectedIndex-1].CATEGORY_NAME)
    this.dataSource = this.tempdata.filter(key => key.ACATEGORY_ID == id.value)
  }
  onSubChange(id){
    this.MenuTypelst = this.temptyplst.filter(key => key.SEGMENT_ID == id)
    this.dataSource = this.tempdata.filter(key => key.ACATEGORY_ID == this.catid && key.BSEGMENT_ID == id)
  }
  onTypChange(id){        
    this.dataSource = this.tempdata.filter(key => key.ACATEGORY_ID == this.catid && key.BSEGMENT_ID == this.submenuId && key.CS_LEVEL_NAME == id)
  }
  openbtnDialog(type) {        
    const dialogRef = this.dialog.open(PaintedPopupComponent,{
      data:{upldOpt:type}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
    });   
}
getPaintedDetail(ModelID) {
  // this.isShowPageLoader = true;
  this.masterdata.getReq('', 'api/CatalougeMaster/GetPaintedDataByModel?modelID='+ModelID).subscribe(
    (resp: any) => 
   {
        if (resp && resp.statusCode == 200) {
          this.PaintedData = resp.data;
          if(this.PaintedData){
            this.openDialogue();      
          }             
        }         
        }, error => {
        if (error.status == 401) {   }
        this.toaster.errorToastr(error.statusMessage);   
      }
    );      
}
openEditDiaLog(ele){
  this.PaintedData = this.tempdata.filter(e => e.MODEL_ID == ele.MODEL_ID)
  //this.menuTYPE = this.menuList.filter(x => x.CATEGORY_ID == this.catid)
  this.colorData = this.colordata.filter(e => e.MODEL_ID == ele.MODEL_ID)
  if(this.PaintedData){
    this.openDialogue();
  }
  //this.getPaintedDetail(ele.MODEL_ID)
}
openDialogue(){
    const dialogRef = this.dialog.open(PaintedPopupComponent,{
    data:{upldOpt:'edit',data:this.PaintedData,colData:this.colorData},
    width:'700',
    height:'500'
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result){

    }
  });
}
}
