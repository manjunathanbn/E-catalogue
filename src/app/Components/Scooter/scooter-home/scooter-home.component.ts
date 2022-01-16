/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';

@Component({
  selector: 'app-scooter-home',
  templateUrl: './scooter-home.component.html',
  styleUrls: ['./scooter-home.component.scss']
})
export class ScooterHomeComponent implements OnInit {
  scooterApiData:any={
    head:[],
    url:""
  }
  scooterHead:any=[]
  //mopedData:any={head:[{id:1,name:"JUPITER"},{id:2,name:"WEGO"},{id:3,name:"NTORQ"}],url:"scooter/scooterDetail"};
  mopedData:any;
  constructor(private masterdata: MasterdataService, private toaster: ToastrManager) { }
  
  ngOnInit(): void {
    //this.getScooterDetail();  
  }
  ngAfterContentInit(): void {
    this.getScooterDetail(); 
  }
  getScooterDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/Catalouge/GetVehicalDataByCategoryID?CATEGORY_ID=2').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.scooterApiData.head = resp.data;
            this.scooterApiData.url = "scooter/scooterDetail";
            this.addList(this.scooterApiData.head);
            this.scooterApiData.head = this.scooterHead
            this.mopedData = this.scooterApiData;
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
  addList(data){
    for(let i=0;i<data.length;i++)
    {
      var obj:any={
        "id":data[i].SERIES,
        "name":data[i].DESCRIPTION,
        "image":data[i].IMAGE_LINK        
      }
      this.scooterHead.push(obj);
    }
    //this.mopedApiData.url = "moped/mopedDetail";     
  }

}
