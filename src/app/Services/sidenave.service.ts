import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private messageSource = new Subject<any>();
  private menuSource = new Subject<any>();

  private openSource = new Subject<any>();
  private roleSta = new Subject<any>();
  private closeSource = new Subject<any>();  
  
  AdminRole;
  constructor() { }

  togglingSidenav(message: any) {
    this.messageSource.next(message);
  }

  listenToggle(): Observable<any> {
    return this.messageSource.asObservable();
  }
  togglingMenu(message: any) {
    this.menuSource.next(message);
  }

  listenMenu(): Observable<any> {
    return this.menuSource.asObservable();
  }

  openingSidenav(message: any) {
    this.openSource.next(message);
  }

  listenopeningSidenav(): Observable<any> {
    return this.openSource.asObservable();
  }

  // tslint:disable-next-line: typedef
  closingSidenav(message: any) {
    this.closeSource.next(message);
  }

  listenclosingSidenav(): Observable<any> {
    return this.closeSource.asObservable();
  }
  // tslint:disable-next-line: typedef
  changingRole(message: any) {
    this.roleSta.next(message);
  }

  lisentingRole(): Observable<any> {
    return this.roleSta.asObservable();
  }
}
