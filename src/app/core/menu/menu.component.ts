/*tslint:disable*/
import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';

//import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SidenavService } from '../../Services/sidenave.service';
import { CommonService } from 'src/app/Services/common.service';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MenuService]
})
export class MenuComponent implements OnInit {
  currentLang = 'en';
  public currIndex: any;
  public currentUrl: any;
  public masterLink: any;
  masterstatus:any=false;
  adminStatus: any=false;
  masterstatus1: any=false
  color: any = 'accent';
  checked = false;
  disabled = false;
  isChecked
  MenuCatIems: any;
  isadminreq: boolean = false;
  constructor(
    public menuService: MenuService,private siService:SidenavService,
    private masterdata: MasterdataService, private toaster: ToastrManager, private commonService: CommonService,   
    private router: Router) {
    this.masterLink = 'master';
    this.currentUrl = this.router.url;
    this.currentUrl = this.currentUrl.split('/')[1];  
    this.siService.lisentingRole().subscribe(res => {
        this.adminStatus=res;
    });
  }
  ngOnInit(){
    this.getMenuDetail();       
  }
  addMenuItem(): void {
    this.menuService.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        { state: 'menu', name: 'MENU' },
        { state: 'timeline', name: 'MENU' }
      ]
    });
  }
  setCurrIndex(value) {
    //console.log(value);
  }
  getMenuDetail() {    
    this.masterdata.getReq('', 'api/Catalouge/GetMenuCategory?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.MenuCatIems = resp.data;
            this.commonService.sentbadge(Number(this.MenuCatIems[0].CART_COUNT));            
            let filt = this.MenuCatIems.filter(res => res.CATEGORY_ID === 9 && res.type === 's2');
            let isad = localStorage.getItem('admin');
            console.log('isssssad',isad)
            if(isad == null){
              this.siService.changingRole(false);
              return;
            }
            if(filt.length > 0 && isad.toUpperCase() == 'Y'){
              this.siService.changingRole(true);
              this.isadminreq = true; 
            }else if(isad.toLocaleUpperCase() == 'N')
            {
              this.siService.changingRole(false);
              this.isadminreq = false;
            }else{this.siService.changingRole(false)}
            
            // if(filt.length > 0){
            //   if(isad.toUpperCase() == 'Y'){
            //     this.isadminreq = true;        
            //     }else{this.isadminreq = false;this.siService.changingRole(false)}
            //     this.siService.changingRole(true)                        
            // }else{this.siService.changingRole(false)}
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

}
