/*tslint:disable*/
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MenuuploadPopupComponent} from '../../Menu/menuupload-popup/menuupload-popup.component'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { SidenavService } from 'src/app/Services/sidenave.service';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss']
})
export class MenuHomeComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;
newHeaderList:any[]=[];
selectedFile : File = null;
headerList:any[]=[
  {CATEGORY_ID:1,CATEGORY_NAME:"Moped"},{CATEGORY_ID:2,CATEGORY_NAME:"Scooter"},{CATEGORY_ID:3,CATEGORY_NAME:"Scooty"},{CATEGORY_ID:4,CATEGORY_NAME:"MotorCycle"},{CATEGORY_ID:5,CATEGORY_NAME:"Painted Parts"},{id:6,name:"Accessory Parts"},{id:7,name:"Dynamic"}
];
listObj={
  id:"",
  head:"",
  name:"",
  menuType:"",
  mainMenu:"",
  subMenu:'',
  icon:''
}
listArr:any[]=[
  {
    id:"1",
    head:"Moped",
    name:"TVS XL",
    menuType:"",
    mainMenu:"",
    subMenu:'',
    icon:''
  }
];
mainMenuList:any[]=[
  {id:1,name:"Moped"},{id:2,name:"Scooter"},{id:3,name:"Scooty"},{id:4,name:"Motorcycle"}
];
subMenuList:any[]=[
  {id:1,name:"TVS XL"},{id:2,name:"TVS XL-100"}
];
displayedColumns: string[]=["sNo","head","series","name","model","edit"];
dataSource:any[]=[{id:1,head:"Moped",name:"TVS XL"}];
dataSourceTemp:any[];
  currentIndx: any;
  type:any;
  isCheck:boolean = true;
  hideAdd: boolean;
  buttonName: string="Add Menu";
  menu: any;
  hideAddmore: boolean = true;
  imgvehicle: any;
  userFile: any;
  Isupdate:any;
  submenuList: any[];
  constructor(private masterdata: MasterdataService, public sidenaveService:SidenavService,private toaster: ToastrManager,public dialog: MatDialog,private http: HttpClient) { }

  ngOnInit(): void {
    this.newHeaderList.push(this.listObj);
    this.sidenaveService.togglingMenu({});
    this.hideAdd=false;
    this.hideAddmore = false;
    this.getMenuDetail();
    this.getMenuList(1);
    this.type= 1
  }
  addMore(){
    var obj={
      CATEGORY_ID:"",
      SERIES:"",
      DESCRIPTION:"",
      CATEGORY_NAME:"",
      MODEL_ID:"",
      IMAGE_LINK:'',
      IS_VEHICLE:'',
      MODEL_NAME:'',
      VEHIMAG:'',
    }
    this.hideAdd=false;
    this.hideAddmore = false;
    this.newHeaderList.push(obj);
    this.imgvehicle = '';
  }
  chekValid(i){
    var count=0;
    // this.newHeaderList[i].CATEGORY_ID = this.menu.CATEGORY_ID;
    // this.newHeaderList[i].
    // CATEGORY_NAME = this.menu.name;

    if(this.newHeaderList[i].SERIES) ++count;
    if(this.newHeaderList[i].CATEGORY_ID) ++count;
    if(this.newHeaderList[i].DESCRIPTION) ++count;
    if(count==3){this.hideAdd=false;this.hideAddmore=false;} else {this.hideAdd=true;this.hideAddmore = true;}
  }
  onChange(cat){
    if(cat){
    this.dataSource = this.dataSourceTemp.filter(key => key.CATEGORY_ID == cat);
    this.submenuList = [...new Map(this.dataSource.map(item =>
      [item["SERIES"], item])).values()]; 
    }else{this.dataSource = this.dataSourceTemp}
  }
  onseriesChange(series)
  {
    if(series){
      this.dataSource = this.dataSourceTemp.filter(key => key.SERIES == series)
    }
  }
  addToList(){
    //this.buttonName="Add Menu"
    this.newHeaderList.filter(key=>{
      this.dataSource.push(key);
    });
    if(this.newHeaderList[0].CATEGORY_ID=='' || this.newHeaderList[0].DESCRIPTION=='')
    {
      this.toaster.infoToastr("No data to Add or Update");return;
    }
    if(this.newHeaderList[0].SERIES=='' || this.newHeaderList[0].VEHIMAG == '')
    {
      this.toaster.infoToastr("No data to Add or Update");return;
    }
    this.dataSource=this.newHeaderList;
    this.newHeaderList=[];
    this.addMore();
    this.saveUpdate(this.dataSource);
  }
  saveUpdate(dataSource: any[]) {
    localStorage.setItem("quardinates",JSON.stringify(this.dataSource));
    if(this.dataSource.length <= 0){this.toaster.infoToastr("No data to Add or Update");return;}
    if(this.buttonName == "Add Menu")this.Isupdate = 0;else this.Isupdate = 1;
    let iList = [];    
    for(let i= 0;i<= dataSource.length-1;i++){
        var obj:any={
          "CAT_ID": Number(dataSource[i].CATEGORY_ID),
          "SERIES_ID":dataSource[i].SERIES,
          "SERIES_NAME":dataSource[i].DESCRIPTION,
          "MODEL_ID":dataSource[i].MODEL_ID,
          "MODEL_NAME":dataSource[i].MODEL_NAME,
          "VEH_IMG":dataSource[i].VEHIMAG,
          "ISUPDATE":this.Isupdate,
          "TYPE":this.type,
          "IS_SUBSEGMENT":dataSource[i].IS_IS_VEHICLE
        }
        iList.push(obj);
    }    
this.masterdata.post(iList, 'api/CatalougeMaster/AddandUpdateSeries').subscribe(
  (resp: any) =>{
  {
    if(resp.statusCode == 200)
    {
      //this.uploadImage();
      this.toaster.successToastr(resp.data);
      this.uploadImage();
    }
    else{
      this.toaster.errorToastr(resp.data);     
      }
      this.refreshPage();           
  }
 }, error => {
      if (error.status == 401) {       
        this.toaster.errorToastr(error.statusMessage);
      }            
    }    
  );
     
  }
  editData(data){
    this.newHeaderList=[];
    this.newHeaderList.push(data);
    this.hideAdd=false;
    this.hideAddmore=true;
    this.buttonName="Update"
    this.Isupdate = true;
  }
  getMenuDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/Catalouge/GetMenuCategory?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.headerList = resp.data.filter(key=> key.is_vehicle == true);                        
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
  getMenuList(val) {
  
    this.masterdata.getReq('', 'api/Catalouge/GetMenuList?dealerID='+localStorage.getItem('dealercode')+'&type='+ Number(val)).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.dataSource = resp.data;
            this.dataSourceTemp = this.dataSource;
            //let list = this.dataSource.filter(key => key.SEG == this.MenuID) 
            this.submenuList = [...new Map(this.dataSource.map(item =>
            [item["SERIES"], item])).values()]; 
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
  onFileChange(event: any,i) {
    this.userFile = event.target.files[0];
    this.newHeaderList[i].VEHIMAG =  this.userFile.name;
    this.selectedFile = <File> event.target.files[0];
    //this.imageSelected = this.userFile.name;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // console.log("the color",this.paintedarr.color,i)
        this.imgvehicle = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }}
    refreshPage() {
      window.location.reload();
     }
     openbtnDialog(){
      this.openDialog();
    }
    openDialog() {    
      const dialogRef = this.dialog.open(MenuuploadPopupComponent,{
        data:{}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          
        }
      });   
  }
  removeSeries(ele,act){
    var obj : any = {
      "series" : ele.SERIES,
      "action" : act,
      "type" : this.type
    }
    this.masterdata.post(obj, 'api/CatalougeMaster/DeleteOrBlkSeries').subscribe(
      (resp: any) =>{
      {
        if(resp.statusCode == 200)
        {
          if(act == 2){
            this.toaster.successToastr("Removed");
          }
          if(act == 3){
            this.toaster.successToastr("Blocked");
          }else
          {
            this.toaster.successToastr(resp.message);
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
  getpaintedMenuList(val) {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/Catalouge/GetMenuList?dealerID='+localStorage.getItem('dealercode')+'&type='+Number(val)).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.dataSource = resp.data;
            this.dataSourceTemp = this.dataSource;
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
  onChkChange(eve){    
    if(eve.value == 1){     
      this.getMenuList(eve.value);
    }else if(eve.value == 2){
      this.getpaintedMenuList(eve.value);
    }
    this.type = eve.value;

  }
  // onFileSelected(event){
  //  // this.selectedFile = <File> event.target.files[0];
  // }
  uploadImage(){
    const fd = new FormData();
    fd.append('image', this.selectedFile);
    if(this.type == 1){
      fd.append('folder','Series');
    }else{
      fd.append('folder','PAINTED_SEGMENT');
    }    
    this.masterdata.postimags(fd, 'api/CatalougeMaster/UploadImages').subscribe(
      (resp: any) =>{
      {
        if(resp.statusCode == 200)
        {
          this.toaster.successToastr(resp);      
        }
        else{
          this.toaster.errorToastr(resp);     
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
