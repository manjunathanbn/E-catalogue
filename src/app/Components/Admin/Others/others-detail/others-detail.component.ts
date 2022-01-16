/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileHandle } from '../../../../Directives/dragDrop.directive';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FileUploadService } from 'src/app/Services/file-upload.service';

@Component({
  selector: 'app-others-detail',
  templateUrl: './others-detail.component.html',
  styleUrls: ['./others-detail.component.scss','../../Catalogue/catalogue-detail/catalogue-detail.component.scss']
})
export class OthersDetailComponent implements OnInit {
  typeList:any=[{id:1,name:"TRU4"},{id:2,name:"Photo Cluster"},{id:3,name:"Kits Parts"}];
  menuList:any=[{id:1,name:"TVS XL"},{id:2,name:"TVS XL 100"}];
  menuType:any=0;
  newList:any={id:2,type:'',partNo:'',partName:'',partDesc:'',qv:'',ndp:'',moq:'',val:'',remarks:'',stk:"",model:'',kitNo:'',kitDesc:'',capacity:0,mrp:0,ClustorId:''}
  files: FileHandle[]=[];
  files2: FileHandle[]=[];
  fileToUpload: File | null = null;
  type: any;
  MenuID:any;
  SubMenuId:any;
  typeId:any;
  SubmodTyp1:any;
  oReadonly:boolean = false;
  //menuList: any;
  submenuList: any;
  tempsublist: any;  
  tempPartslist: any;
  dataSource: any;
  KitPartlist: any;
  imageSrc: string | ArrayBuffer;
  kitmodellst: any;
  kitpartLst: unknown[];
  KitModel: any;
  kitmodid:any;
  constructor(private router:Router,private masterdata: MasterdataService, private toaster: ToastrManager,private http: HttpClient,private uploadService: FileUploadService) { }
  
  ngOnInit(): void {
    
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
    
    if(this.newList.partNo == null || this.newList.partNo == ''){
    this.toaster.warningToastr("Enter Part Number");
    return;
  }   
  if(this.newList.partDesc == null || this.newList.partDesc == ''){
    this.toaster.warningToastr("Enter Part Name");
    return;
  }  
  if(this.typeId == 2) { 
  if(this.SubMenuId == null || this.SubMenuId == undefined){
    this.toaster.warningToastr("Enter Part Model");
    return;
  }  
  if(this.newList.ClustorId == null || this.newList.ClustorId == ''){
    this.toaster.warningToastr("Enter Cluster ID");
    return;
  }   
    }
    if(this.typeId == 3){
      if(this.KitModel == null || this.KitModel == undefined){
        this.toaster.warningToastr("select Kit Model");
        return;
      }  
      if(this.SubmodTyp1 == null || this.SubmodTyp1 == undefined){
        this.toaster.warningToastr("Select Model Type");
        return;
      }  
      if(this.newList.kitNo == null || this.newList.kitNo == ''){
        this.toaster.warningToastr("Enter Kit Part");
        return;
      }  
      if(this.newList.kitDesc == null || this.newList.kitDesc == ''){
        this.toaster.warningToastr("Enter Kit Part Name");
        return;
      }  
    }
  //let clupart=[];
      var obj: any ={
        "SegID": this.MenuID,
        "ModelID": this.SubMenuId,
        "PartID": this.newList.partNo,
        "PartDesc": this.newList.partDesc,
        "ClusterID" : this.newList.ClustorId,
        "Active": 1
      }
      var objkit:any = {
        "SEG": this.MenuID,
        "MID": Number(this.KitModel),
        "PART_NO": this.newList.partNo,
        "PART_DESCRIPTION": this.newList.partDesc,
        "KIT_PART_NO":this.newList.kitNo,
        "KIT_DESCRIPTION": this.newList.kitDesc,
        "KIT_ID": Number(this.kitmodid),
        "MODEL_APPL":this.SubmodTyp1,
        "ACTIVE":true,
        "QTY":Number(this.newList.stk)
      }
     // clupart.push(obj);
     let req;
    //  if(this.typeId == 2){
    //    req = {"Parts":obj,"type":this.typeId}
    //  }else if(this.typeId == 3){
        req = {"Parts":obj,"KitParts":objkit,"type":this.typeId}
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
    localStorage.setItem('others',JSON.stringify(this.newList));
    this.goBack();
  }
  goBack(){
    this.router.navigate(['/others']);
  }
  filesDropped(files: FileHandle[],i): void {
    //alert("FF")
    if(i==1)
    this.files = files;
    else{
      this.files2=files;
    }
    console.log("i got",this.files[0].url);
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const file = files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
}
  onTypChange(evnt)
  {
     if(this.typeId == 2){
       this.getMenuDetail();
     }else if(this.typeId == 3)
     {
       this.getKitDetail();
     }
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
            // this.dataSource = resp.data.prClustorParts;
            // this.tempPartslist = resp.data.prClustorParts; 
            //this.prPartslist = this.tempPartslist.filter(key => key.MODELID == '000020000200000003')                             
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
      this.SubMenuId = ""   
      return;
    }
    if(this.typeId == 2){
      this.submenuList = this.tempsublist.filter(key => key.CATEGORY_ID == id)
      this.oReadonly = false
      this.SubMenuId = ""  
      //this.type = this.typeList[this.typeId-1].name;
    }else if(this.typeId = 3)
    {
      //this.submenuList = this.tempsublist.filter(key => key.SEG == this.MenuID)  
      let list = this.tempsublist.filter(key => key.SEG == this.MenuID) 
      this.submenuList = [...new Map(list.map(item =>
      [item["MODEL"], item])).values()];   
      //this.type = this.typeList[this.typeId-1].name;
    }    
       
      
        //this.dataSource = this.tempPartslist.filter(key => key.CATEGORY_ID == this.catid && key.SEGMENT_ID == id)
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
  onSubMenuChange(id){  
    if(this.typeId == 2){
      this.dataSource = this.tempPartslist.filter(key => key.MODELID == id)}else
      {
       this.KitPartlist = this.tempsublist.filter(key => key.MODEL_APPL == this.SubmodTyp1)
      }
  }
  onmodelChang(){
    if(this.typeId == 3){
      let list = this.tempsublist.filter(key => key.MID == this.KitModel) 
      this.kitpartLst = [...new Map(list.map(item =>
      [item["MODEL_APPL"], item])).values()];
    }

    // if(this.SubMenuId != '' && this.typeId == 2){
    //   this.oReadonly = true;
    // }

    //this.newList.model = this.SubMenuId;
  }
  onKitSelect(event){
    if(event.target.selectedIndex > 0){    
    this.newList.kitNo = this.KitPartlist[event.target.selectedIndex - 1].KIT_PART_NO
    this.newList.kitDesc = this.KitPartlist[event.target.selectedIndex - 1].KIT_DESCRIPTION
    this.oReadonly = true
    }
    else
    {
      this.newList.kitNo = "";
      this.newList.kitDesc = "";
      this.oReadonly = false
    }
  }
  onUpload() {
    // this.http is the injected HttpClient
    // const uploadData = new FormData();
    // const baseur = console.log(location.origin)
    // uploadData.append('myFile', this.fileToUpload, this.fileToUpload.name);
    // this.http.post('http://localhost:4200/src/assets/Images', uploadData)
    //   .subscribe(event => {
    //     console.log(event); // handle event here
    //   });;
    this.upload(0, this.fileToUpload);
  }
  progressInfos: any[] = [];
  message: string[] = [];
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          this.progressInfos[idx].value = Math.round(
            (100 * event.loaded) / event.total
          );
          if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);           
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }
}
