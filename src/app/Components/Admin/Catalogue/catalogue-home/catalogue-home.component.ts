/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { Router } from '@angular/router';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MenuuploadPopupComponent } from '../../Menu/menuupload-popup/menuupload-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CataloguePopupComponent } from '../catalogue-popup/catalogue-popup.component';
@Component({
  selector: 'app-catalogue-home',
  templateUrl: './catalogue-home.component.html',
  styleUrls: ['./catalogue-home.component.scss']
})
export class CatalogueHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
  displayedColumns: string[]=["sNo","head","seriesid","name","modelid","model","varient_qv","assemlyID","assemlyName","edit"];
  dataSource:any[]=[{id:1,head:"Moped",name:"TVS XL",parts:20}];
  headerList: any;
  dataSourceTemp: any;
  mainMenu: any;
  submenuList: any[];
  constructor(private router:Router,private masterdata: MasterdataService, public dialog: MatDialog,private toaster: ToastrManager) { }

  ngOnInit(): void {
    this.getMenuDetail();
    this.getMenuList(1);
  }
  createNew(){
    this.router.navigate(['/adminCat/detail']);
  }
  getMenuDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/Catalouge/GetMenuCategory?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.headerList = resp.data.filter(key=> key.is_vehicle == true);
                        // this.headerList.filter(key=>{
            //   key.CATEGORY_ID == 9
            // })
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
  getMenuList(val) {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/Catalouge/GetMenuList?dealerID='+localStorage.getItem('dealercode')+'&type='+ Number(val)).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.dataSource = resp.data;
            this.dataSourceTemp = this.dataSource;
            this.submenuList = [...new Map(this.dataSource.map(item =>
              [item["SERIES"], item])).values()]; 
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
  onChange(cat){
    if(cat){
    this.dataSource = this.dataSourceTemp.filter(key => key.CATEGORY_ID == cat);
    }else{this.dataSource = this.dataSourceTemp}
  }
  onseriesChange(series)
  {
    if(series){
      this.dataSource = this.dataSourceTemp.filter(key => key.MODEL_ID == series)
    }else{this.dataSource = this.dataSourceTemp.filter(key => key.CATEGORY_ID ==this.mainMenu )}
  }
  onAssblyChange(assembly)
  {
    if(assembly){
      this.dataSource = this.dataSourceTemp.filter(key => key.ASSEMBLY_ID == assembly)
    }else
    {
      this.dataSource = this.dataSourceTemp.filter(key => key.CATEGORY_ID ==this.mainMenu )
    }
  }
  openbtnDialog(type){
    this.openDialog(type);
  }
  openDialog(type) {    
    const dialogRef = this.dialog.open(MenuuploadPopupComponent,{
      data:{upldTyp:type}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //DeleteOrBlkCatalouge
      }
    });   
}
openEditDialog(ele){
  const dialogRef = this.dialog.open(CataloguePopupComponent,{
    data:{x:0,y:0,type:"main",series:ele.SERIES,isEdt:'CatY',editData:ele}
  });
}
editData(ele,act){
    if(ele){ 
      if(act == 1){
        this.openEditDialog(ele)
      } 
      else{     
       this.masterdata.post(ele, 'api/CatalougeMaster/DeleteOrBlkCatalouge').subscribe(
      (resp: any) =>{
      {
        if(resp.statusCode == 200)
        {
          if(act == 3){
            this.toaster.successToastr(resp.data);
          }
          if(act == 2){
            this.toaster.successToastr(resp.data);
          }else
          {
            this.toaster.successToastr(resp.data);
          }
          this.dataSource = this.dataSource
          .filter(i => i !== ele)
          .map((i, idx) => (i.position = (idx + 1), i));                
        }
        else{
          this.toaster.errorToastr(resp.data);     
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
}
}
