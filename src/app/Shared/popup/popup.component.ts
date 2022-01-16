/*tslint:disable*/
import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MasterdataService } from 'src/app/Services/masterdata.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  //@Input() data;
  assemlyData:any=[];
  dynamicData:any;
  qvTablo: any[];
  headers:any
  displayedColumns: any[];
  dataSource: any;
  finaldata:any;
  displayData: {}[];
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private masterdata: MasterdataService, private toaster: ToastrManager) {
      this.dataSource = new MatTableDataSource();
    }
    ngOnInit(){
      if(this.data.title == 'mob'){
        this.getSubassemDetail(); 
      }else if(this.data.title == 'QV')
     {
          this.dynamicData = this.data.data
          this.qvTablo = [] //TABLE DATASOURCE
          this.headers = this.data.i;
        //FILL TABLE DATASOURCE 
        var obj = {};
        this.displayedColumns = [];
        for (let i = 0 ;i<this.dynamicData.length;i++ ){
            this.qvTablo.push(this.dynamicData[i].data);
            this.displayedColumns.push(this.dynamicData[i].header);
          }
        var ss = this.displayedColumns;
        var ss1= this.qvTablo
        var dict1 = {};
        for(let i = 0;i<ss.length;i++)
        {
          dict1[ss[i]] = ss1[i];
        }

        this.headers = []
        this.headers[0] = dict1
        this.dataSource =  new MatTableDataSource(this.headers);
      }else
      {
        this.getSubassemDetail();
      }    
 }
    // formatInputRow(row) {
    //   const output = {};
  
    //   for (let i = 0; i < this.dynamicData.length; ++i) {
    //     output[this.vzfPuanTablo[i]] = this.dynamicData[i][row];
    //   }
  
    //   return output;
    // }

    formats()
    {
      
    
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getSubassemDetail() {
    
    this.masterdata.getReq('', 'api/Catalouge/GetCoordinatesforSubAssembly?series='+this.data.data.SERIES+'&ASSEMBLY_ID='+ this.data.data.ASSEMBLY_ID).subscribe(
      (resp: any) => 
     {
          if (resp && resp.statusCode == 200) {
            this.assemlyData = resp.data;            
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

}
