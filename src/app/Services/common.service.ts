/**
 * Created BY HMSPL
 * Common for API
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Observable, Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  static cdnUrl ;
  static rootUrl: string ;
  // private rootUrl ;
  // private cdnUrl ;
  //count = 0;
  param1;
  param2;
  param3;
  param4;
  param5;
  param6;
  param7;
  param8;
  param9;
  param10;
  selectTab;
  paramgrp:any;
  assemblylst:any=[];
  orderlist:any=[];
  private subject = new Subject<any>();
  subject$ = this.subject.asObservable();

  private headtitle = new BehaviorSubject('null');
  headcontainer = this.headtitle.asObservable();

  private admindetail=new BehaviorSubject('null');
  adminContainer=this.admindetail.asObservable();

  private badgecount=new BehaviorSubject('0');
  badgeNumber=this.badgecount.asObservable();

  constructor() { }

  sendtitle(title){
    this.headtitle.next(title);
  }
  sentbadge(badge){
    this.badgecount.next(badge);
  }
  sendAdminData(data){
    this.admindetail.next(data);
  }
  // addCount() {
  //   this.count+=1;
  //   this.subject.next(this.count)
  // }
  // removeCount() {
  //   if (this.count > 0) { this.count-=1 };
  //   this.subject.next(this.count)
  // }
  // getCount(){
  //   return this.subject$;
  // }

  static getrootUrl() {
    return this.rootUrl;
  }

//   static authReq(url) {
//     const headers = new Headers({ 'Accept': 'application/json', 'authorization':localStorage.getItem('authToken') });
//     const reqOptions = new RequestOptions({ headers: headers });
//      return {
//       url: this.rootUrl + url,
//       headers: reqOptions
//      }
// }

// //upload
// static uploadAuthReq(url) {
//   const headers = new Headers({ 'Accept': 'application/json', 'authorization':localStorage.getItem('authToken') });
//   const reqOptions = new RequestOptions({ headers: headers });
//    return {
//     url:  url,
//     headers: reqOptions
//    }
// }

//  static NoauthReq(url: string) {
//     const headers = new Headers({ 'Accept': 'application/json' });
//     const reqOptions = new RequestOptions({ headers: headers });
//     return {
//       url: this.rootUrl + url,
//       headers: reqOptions
//     };
//   }

//   getCall(urlData) {
//     var resData = CommonService.authReq(urlData);
//     return this.http.get(resData.url, resData.headers).pipe(map(res => res.json()));
//   }

//   putCall(data,reqUrl) {
//     var respData = CommonService.authReq(reqUrl);
//     return this.http.put(respData.url, data, respData.headers).pipe(map(res => res.json()));
//   }

//   postCall(data,reqUrl) {
//     var respData = CommonService.authReq(reqUrl);
//     return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
//   }

//   //for upload
//   uploadPostCall(data,reqUrl) {
//     var respData = CommonService.uploadAuthReq(reqUrl);
//     return this.http.post(respData.url, data, respData.headers).pipe(map(res => res.json()));
//   }

//   // uploadGetCall(urlData) {
//   //   var resData = CommonService.uploadAuthReq(urlData);
//   //   return this.http.get(resData.url, resData.headers).pipe(map(res => res.json()));
//   // }
// //file process end
//   deleteCall(urlData) {
//     var resData = CommonService.authReq(urlData);
//     return this.http.delete(resData.url, resData.headers).pipe(map(res => res.json()));
//   }

  setAssembly(item: any) {
    this.subject.next(item);
    }
    getAssembly(): Observable<any> {
    return this.subject.asObservable();
    }

    //this is for category and admin refresh list
    listsetAssembly(item: any) {
      this.subject.next(item);
      }
      listGetAssembly(): Observable<any> {
      return this.subject.asObservable();
      }
}


