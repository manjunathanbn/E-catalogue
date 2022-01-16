/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  motorApiData:any={
    head:[],
    url:""
  }
  //motorData:any={head:[{id:1,name:"Apache"},{id:2,name:"StarCity"},{id:3,name:"Sports"},{id:4,name:"Radoon"}],url:"motor/motorDetail"};
  motorhead:any=[];
  motorData:any;
  constructor(private masterdata: MasterdataService, private toaster: ToastrManager) { }

  ngOnInit(): void {
    this.getMotorDetail();
  }
  getMotorDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/Catalouge/GetVehicalDataByCategoryID?CATEGORY_ID=3&dealerId='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.motorApiData.head = resp.data;
            this.motorApiData.url = "motor/motorDetail";
            this.addList(this.motorApiData.head);
            this.motorApiData.head = this.motorhead
            this.motorData = this.motorApiData;            
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
      this.motorhead.push(obj);
    }
    //this.mopedApiData.url = "moped/mopedDetail";     
  }

}
