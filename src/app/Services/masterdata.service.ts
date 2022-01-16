/*tslint:disable*/
import { Injectable } from '@angular/core';
import { RequestserviceService } from './requestservice.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  constructor(private httpClient: HttpClient) { }
  /**
     * WebAPI GET
     * @param {Object} request
     * return Object
     */
   public getReq(params,url)
   {
    // const data=this.requestServ.
    const data = RequestserviceService.getReq(url);
    return this.httpClient.get(data.url,{ params: params, headers: data.headers });  
    
   }
   /**
      * UVD POST
      * @param {Object} params
      * return Object
     */
    post(params,url) {
     const resData = RequestserviceService.postreq(url);
     return this.httpClient.post(resData.url, params,{headers:resData.headers});
 }
  /**
      * UVD POST
      * @param {Object} params
      * return Object
     */
   postimags(params,url) {
    const resData = RequestserviceService.postreq(url);
    return this.httpClient.post(resData.url, params);
}
    postMultiImags(params,url) {
      const resData = RequestserviceService.postreq(url);
      return this.httpClient.post(resData.url, params);
    }
}
