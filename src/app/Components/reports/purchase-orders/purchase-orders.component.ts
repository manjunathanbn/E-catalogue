/*tslint:disable*/
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable, Subject } from 'rxjs';
import { DatePipe } from '@angular/common'
import { map, startWith } from 'rxjs/operators';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SidenavService } from 'src/app/Services/sidenave.service';
import { checkServerIdentity } from 'tls';
import { ExcelserviceService } from 'src/app/Services/excelservice.service';
@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild("myinput") myInputField: ElementRef;
  fdate = new FormControl();
  tdate = new FormControl();
  filteredOptions: Observable<string[]>;
  filteredPartNo: Observable<string[]>;
  ordersList: any; 
  dealerFilter = new FormControl('');
  sapNoFilter = new FormControl('');
  refnoFilter = new FormControl('');
  partnoFilter = new FormControl('');
  constructor(public datepipe: DatePipe,private excelService:ExcelserviceService,private masterServices: MasterdataService, public sidenaveService:SidenavService,public toaster: ToastrManager) { }
  displayedColumns: string[] = ['SlNO','PoDate','PONO','SAPNO','DealerId','APSID','PartNO','Qty','TotAmt']  
  dataSource = new MatTableDataSource<any[]>();
  filterValues = {
    DealerId: '',
    SAPNO: '',
    PONO: '',
    PartNO: ''
  };
  frmdate = new Date();
  todate = new Date();
  ngOnInit(): void {
    this.getPodetails();
    //this.applyFilter();
  }
  getPodetails(){
    this.masterServices.getReq('', 'api/Catalouge/GetRptEcatOrders?CUSTOMER_ID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            if(resp.data.length){
            this.ordersList = resp.data;
            this.dataSource = new MatTableDataSource(this.ordersList); 
            this.dataSource.data = this.ordersList;
            this.dataSource.filterPredicate = this.createFilter();     
            }else{
              this.toaster.infoToastr("No Orders");
            }           
          }         
          }, error => {
          if (error.status == 401) {          
          }
          this.toaster.errorToastr(error.statusMessage);     
        }
      ); 
  } 
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.DealerId.toString().indexOf(searchTerms.DealerId) !== -1
        && data.SAPNO.toString().indexOf(searchTerms.SAPNO) !== -1
        && data.PONO.toString().indexOf(searchTerms.PONO) !== -1
        && data.PartNO.toLowerCase().indexOf(searchTerms.PartNO) !== -1       
    }
    return filterFunction;
  }
  applyFilter(filterValue) {
   this.dealerFilter.valueChanges
      .subscribe(
        DealerId => {
          this.filterValues.DealerId = DealerId;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.sapNoFilter.valueChanges
      .subscribe(
        SAPNO => {
          this.filterValues.SAPNO = SAPNO;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.refnoFilter.valueChanges
      .subscribe(
        PONO => {
          this.filterValues.PONO = PONO;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.partnoFilter.valueChanges
      .subscribe(
        PartNO => {
          this.filterValues.PartNO = PartNO;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )     
  }
  applydateFilter(filterValue) {
    if(this.frmdate && this.todate){
      let fdate =this.datepipe.transform(this.frmdate, 'yyyy-MM-dd');
      let tdate =this.datepipe.transform(this.todate, 'yyyy-MM-dd');   
      if(filterValue){
        this.dataSource.data = this.ordersList.filter(
          m => new Date(this.datepipe.transform(m.PoDate, 'yyyy-MM-dd')) >= new Date(fdate) && new Date(this.datepipe.transform(m.PoDate, 'yyyy-MM-dd')) <= new Date(tdate)
          );                 
      }   
    }else{
      this.toaster.warningToastr("select Both Dates");      
    }  
    
  }
  ExportExcel(){
    if(this.dataSource.data.length > 0)
    {
      console.log(this.dataSource);
      this.excelService.exportAsExcelFile(this.dataSource.filteredData, 'RptEcat_POs');
    }
  }

}
