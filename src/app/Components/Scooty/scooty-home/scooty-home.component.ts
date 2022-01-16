/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';

@Component({
  selector: 'app-scooty-home',
  templateUrl: './scooty-home.component.html',
  styleUrls: ['./scooty-home.component.scss']
})
export class ScootyHomeComponent implements OnInit {
 scootyApiData:any={
    head:[],
    url:""
  }
  scootyHead:any=[]
  //scootyData:any={head:[{id:1,name:"Scooty Pept"},{id:2,name:"Zest"}],url:"scooty/scootyDetail"};
  scootyData:any
  constructor(private masterdata: MasterdataService, private toaster: ToastrManager) { }

  ngOnInit(): void {
    this.getScootyDetail();
  }
  getScootyDetail() {
    // this.isShowPageLoader = true;
    this.masterdata.getReq('', 'api/Catalouge/GetVehicalDataByCategoryID?CATEGORY_ID=4').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.scootyApiData.head = resp.data;
            this.scootyApiData.url = "scooty/scootyDetail";
            this.addList(this.scootyApiData.head);
            this.scootyApiData.head = this.scootyHead
            this.scootyData = this.scootyApiData;
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
      this.scootyHead.push(obj);
    }
    //this.mopedApiData.url = "moped/mopedDetail";     
  }

}
