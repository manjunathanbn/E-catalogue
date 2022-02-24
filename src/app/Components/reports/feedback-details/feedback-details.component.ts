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
import { MatDialog } from '@angular/material/dialog';
import { FeedbackEntryHomeComponent } from '../../feedback-entry/feedback-entry-home/feedback-entry-home.component';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss','../purchase-orders/purchase-orders.component.scss']
})
export class FeedbackDetailsComponent implements OnInit {

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
  constructor(public dialog: MatDialog,public datepipe: DatePipe,private excelService:ExcelserviceService,private masterServices: MasterdataService, public sidenaveService:SidenavService,public toaster: ToastrManager) { }
  displayedColumns: string[] = ['DealerId','Date','ID','Subject','Description','Remarks']  
  dataSource = new MatTableDataSource<any[]>();
  filterValues = {
    DEALER_ID: '',
    STATUS: ''    
  };
  frmdate = new Date();
  todate = new Date();

  ngOnInit(): void {
    this.getFeedbackDetails();    
  }
  getFeedbackDetails() {
    // this.isShowPageLoader = true;
    //this.customLoader.start();
    this.masterServices.getReq('', 'api/Catalouge/GetFeedbackDetails?').subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.ordersList = resp.data;
            this.ordersList.forEach(row => row.CREATED_DATE = new Date(this.datepipe.transform(row.CREATED_DATE, 'yyyy-MM-dd'))); 
            this.dataSource = new MatTableDataSource(resp.data);

            this.dataSource.data = this.ordersList
            this.dataSource.filterPredicate = this.createFilter();                                     
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
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.DEALER_ID.toString().indexOf(searchTerms.DEALER_ID) !== -1     
    }
    return filterFunction;
  }
  applyFilter(filterValue) {
   this.dealerFilter.valueChanges
      .subscribe(
        DEALER_ID => {
          this.filterValues.DEALER_ID = DEALER_ID;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )    
    // this.partnoFilter.valueChanges
    //   .subscribe(
    //     PartNO => {
    //       this.filterValues.PartNO = PartNO;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   )     
  }
  applydateFilter(filterValue) {
    if(this.frmdate && this.todate){
      let fdate =this.datepipe.transform(this.frmdate, 'yyyy-MM-dd');
      let tdate =this.datepipe.transform(this.todate, 'yyyy-MM-dd');   
      if(filterValue){
        this.dataSource.data = this.ordersList.filter(
          m => new Date(this.datepipe.transform(m.CREATED_DATE, 'yyyy-MM-dd')) >= new Date(fdate) && new Date(this.datepipe.transform(m.CREATED_DATE, 'yyyy-MM-dd')) <= new Date(tdate)
          );                 
      }   
    }else{
      this.toaster.warningToastr("select Both Dates");      
    }  
    
  }
  ExportExcel(){
    if(this.dataSource.data.length > 0)
    { 
          
      this.excelService.exportAsExcelFile(this.dataSource.filteredData, 'RptEcat_Feedbacks');
    }
  }
  editData(ele){
    if(ele){
      this.openDialog(ele);
    }
  }
  openDialog(data) {
    if(data){
      const dialogRef = this.dialog.open(FeedbackEntryHomeComponent,{
        data:{type:"feedback",data:data}        
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){          
        }
      });
    }

  }

}
