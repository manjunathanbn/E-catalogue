/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';

@Component({
  selector: 'ap-home',
  templateUrl: './moped-home.component.html',
  styleUrls: ['./moped-home.component.scss']
})
export class MopedHomeComponent implements OnInit {
  mopedApiData:any={
    head:[],
    url:""
  }
  mopedHead:any=[]
  DealerCode:any;
  Name:any;
  
  mopedData:any;
  constructor(private masterdata: MasterdataService, private toaster: ToastrManager,private route: ActivatedRoute) { }
 
  ngOnInit(): void {
    
    this.getMopedDetail();    
  }

  getMopedDetail() {    
    this.masterdata.getReq('', 'api/Catalouge/GetVehicalDataByCategoryID?CATEGORY_ID=1').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.mopedApiData.head = resp.data;
            this.mopedApiData.url = "moped/mopedDetail";
            this.addList(this.mopedApiData.head);
            this.mopedApiData.head = this.mopedHead
            this.mopedData = this.mopedApiData;
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
      this.mopedHead.push(obj);
    }
    //this.mopedApiData.url = "moped/mopedDetail";     
  }

}
