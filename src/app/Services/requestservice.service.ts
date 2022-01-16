/*tslint:disable*/
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestserviceService {

  constructor() { }
  public static BaseWebApiUrl(): string
  {
    // tslint:disable-next-line: no-string-literal
    return environment['hostWebApi'];
  }
  /**
     * Get
     * @param {string} url
     // tslint:disable-next-line: jsdoc-format
     * Return Object
     */
     public static getReq(url)
     {
       const headers =  new HttpHeaders({ 'Content-Type': 'text/plain' });
       return {
         url: this.BaseWebApiUrl() + url,
         headers
       };
     }  
     public static postreq(url)
     {
       const headers =  new HttpHeaders({ 'Content-Type': 'application/json' });
       return {
         url: this.BaseWebApiUrl() + url,
         headers:headers
       };
     }   
}
