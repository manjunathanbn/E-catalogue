/*tslint:disable*/
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelserviceService {

  constructor() { }
  public exportAsExcelMulFile(json: any=[], excelFileName: string,tablecount: any=[]): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    for(var i = 1; i <= tablecount.length; i++){
       const ws : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json['mlist' + i]);
       XLSX.utils.book_append_sheet(workbook, ws, tablecount[i-1].name);
    }   
       const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.book_append_sheet(workbook, myworksheet, excelFileName);
    //const myworkbook: XLSX.WorkBook = { Sheets: { 'excelFileName': myworksheet }, SheetNames: [excelFileName] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
