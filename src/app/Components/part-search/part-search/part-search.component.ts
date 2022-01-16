/*tslint:disable*/
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from "ngx-perfect-scrollbar";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SidenavService } from 'src/app/Services/sidenave.service';
@Component({
  selector: 'app-part-search',
  templateUrl: './part-search.component.html',
  styleUrls: ['./part-search.component.scss']
})
export class PartSearchComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll?: PerfectScrollbarDirective;  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild("myinput") myInputField: ElementRef;
  control = new FormControl();
  pcontrol = new FormControl();
  filteredOptions: Observable<string[]>;
  filteredPartNo: Observable<string[]>;

  //displayedColumns: string[] = ['ID', 'Model', 'Series','pName','Status'];
  displayedColumns: string[] = ['SEGMENT_NAME','SERIES_NAME','MODEL_NAME','VARIENT','ASSEMBLY','QV','REMARKS']
  responseData: any = {
    CCategory: [],
    CModel: [],    
    PartsLst: [],
    ModelsAppies:[],
    priceLst:[]
  };
  dataSource = [];
  modelId: string;
  CatID: string;
  PartId: any;
  PartName:any = {    
    PartNo:"",        
    PartDescription:"",
    NDP:0,
    MRP:0
  };
  series: string;
  tempsublist: any;
  
  FilterLst: any[];
  FinalList: any[];
  adminrol: any=false;
  constructor(private masterServices: MasterdataService, public sidenaveService:SidenavService,public toaster: ToastrManager) { }

  ngOnInit(): void {
    //this.adminrol = localStorage.getItem('role')
    this.sidenaveService.lisentingRole().subscribe(res => {
      this.adminrol=res;
      if(this.adminrol == false){
        this.displayedColumns = ['SEGMENT_NAME','SERIES_NAME','MODEL_NAME','VARIENT','ASSEMBLY','QV','REMARKS']      
      }else
      {
        this.displayedColumns = ['SEGMENT_ID','SEGMENT_NAME','SERIES_ID','SERIES_NAME','MODEL_ID','MODEL_NAME','VARIENT','ASSEMBLY','QV','REMARKS']
      }
    });
    
   
    //this.myInputField.nativeElement.focus();   
  }
  ngAfterViewInit(){
    this.getKitData();
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );    
    this.filteredPartNo = this.pcontrol.valueChanges.pipe(
      startWith(''),
      map(value => this._filterpart(value)),
    );    
  }
  
  private _filter(value: string): string[] {
    if(value.length >= 3){
    const filterValue = value.toLowerCase();
    return this.FilterLst.filter(option => option.PartDescription.toLowerCase().includes(filterValue));}
  }
  private _filterpart(value: string): string[] {
    if(value.length >= 2){
    const filterValue = value.toLowerCase();
    return this.FilterLst.filter(option => option.PartNo.toLowerCase().includes(filterValue));}
  }
 
  getKitData() {
    // this.isShowPageLoader = true;
    this.masterServices.getReq('', 'api/Catalouge/GetKitsMaster?dealerID='+localStorage.getItem('dealercode')).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.responseData.CCategory = resp.data.CCategory;
            this.responseData.CModel = resp.data.CModel;
            this.responseData.PartsLst = resp.data.PartsLst;
            let oPricelst =  resp.data.pricelst.partPrices//           PartDescription
            this.responseData.priceLst = oPricelst            
            //this.filteredList = resp.data.PartsLst;
            this.tempsublist = resp.data.CModel;
            this.responseData.ModelsAppies = resp.data.ModelsAppies;
           // this.FilterLst = this.responseData.PartsLst
            this.FilterLst = [...new Map(this.responseData.PartsLst.map(item =>
              [item["PartNo"], item])).values()]; 
            //this.FilterLst = this.responseData.PartsLst;
            // this.dataSource = resp.data.kPartsDtls;
            // this.tempPartslist = resp.data.kPartsDtls;                                       
          }         
          }, error => {
          if (error.status == 401) { this.toaster.errorToastr(error.statusMessage); }
          this.toaster.errorToastr(error.statusMessage);   
        }
      );      
  }
  getModelwise(item) {

    if(this.CatID){
      //this.responseData.CModel = this.tempsublist.filter(key => key.SEG == this.CatID)
      let list = this.tempsublist.filter(key => key.CatID == this.CatID) 
      this.responseData.CModel = [...new Map(list.map(item =>
      [item["name"], item])).values()];
    }else
    {
      this.toaster.warningToastr("Select the Catagory")
      return;
    }         
  }
  getserieswise(eve){
    if(this.series){
      let list = this.responseData.PartsLst.filter(key => key.Series == this.series) 
      this.FinalList = list;
    }
  }
  getPartSearch(eve){
    if(eve){
      this.PartName = eve.option.value;      
      let list = this.responseData.ModelsAppies.filter(key => key.PARTNO == eve.option.value.PartNo)
      let pricepart = this.responseData.priceLst.filter(key => key.PartNo == eve.option.value.PartNo)
      this.PartName.MRP = pricepart[0].MRP;
      this.PartName.NDP = pricepart[0].NDP; 
      this.dataSource = [];
      this.dataSource = list;
    }
  }
  getPartNameSearch(eve){
    if(eve){
      let str = this.PartId.PartDescription.trim();
      let list = this.responseData.ModelsAppies.filter(key => key.PartNo === eve) 
      this.dataSource = list;
    }
  }
  getOptionText(option) {
    return option.PartDescription;
  }
  getOptionPart(option) {
    return option.PartNo;
  }
//   onChange(e): void {
//     console.log(`Value Changed: ${e}`);
//     this.changeValue.emit(e);
// }
getSubtier(value) {
  console.log(value);
}

onKey(value) {
  if(value.length >= 3){
    let lst = this.FilterLst.filter(item => item.PartNo.toLowerCase().includes(value.toLowerCase()))
    this.FinalList = lst;
  }
    // this.FinalList = [...new Map(lst.map(item =>
    //   [item["PartNo"], item])).values()]; 
  
  //this.search(value);
}
onKeyname(value) {  
  if(value.length >= 3){
  let lst = this.FilterLst.filter(item => item.PartDescription.toLowerCase().includes(value.toLowerCase()))
  this.FinalList = lst;
}
  // this.FinalList = [...new Map(lst.map(item =>
  //   [item["PartDescription"], item])).values()]; 

//this.search(value);
}

search(value: string) {
  if(value.length >= 3){
    let filter = this.responseData.PartsLst.filter(item =>
      item.PartNo.toLowerCase().includes(value.toLowerCase())
    );
    return filter;
  }  
}

}
