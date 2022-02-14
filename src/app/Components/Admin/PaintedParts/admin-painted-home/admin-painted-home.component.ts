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
@Component({
  selector: 'app-admin-painted-home',
  templateUrl: './admin-painted-home.component.html',
  styleUrls: ['./admin-painted-home.component.scss','../../Catalogue/catalogue-home/catalogue-home.component.scss']
})
export class AdminPaintedHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
  displayedColumns: string[]=["sNo","head","name","type","parts","model","edit"];
  dataSource:any[]=[{id:1,head:"Moped",name:"TVS XL",type:"XL 100",parts:20}];
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
  constructor(public dialog: MatDialog,private router:Router,private masterdata: MasterdataService, private toaster: ToastrManager) { }
  
  ngOnInit(): void {
    this.getMenuDetail();
  }
  createNew(){
    this.router.navigate(["/adminPainted/detail"]);
  }
  editData(data){

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
            this.dataSource = resp.data.paintedMenusdata;
            this.tempdata = resp.data.paintedMenusdata;
                                  
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
    this.dataSource = this.tempdata.filter(key => key.CATEGORY_ID == id.value)
  }
  onSubChange(id){
    this.MenuTypelst = this.temptyplst.filter(key => key.SEGMENT_ID == id)
    this.dataSource = this.tempdata.filter(key => key.CATEGORY_ID == this.catid && key.SEGMENT_ID == id)
  }
  onTypChange(id){    
    this.dataSource = this.tempdata.filter(key => key.CATEGORY_ID == this.catid && key.SEGMENT_ID == this.submenuId && key.S_LEVEL_NAME == id)
  }
  openbtnDialog(type) {    
    console.log("typ",type)
    const dialogRef = this.dialog.open(PaintedPopupComponent,{
      data:{upldOpt:type}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        
      }
    });   
}
}
