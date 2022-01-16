import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
//import { TranslateService } from '@ngx-translate/core';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { SidenavService } from '../../../Services/sidenave.service';
// import { DataService } from '../../services/data.service';
const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  private _router: Subscription;
  //@ViewChild('notifications') notifications;

  mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );
  url: string;
  sidePanelOpened;
  createType:any;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @ViewChild('sidemenu')
  sidemenu;
  @ViewChild('notifications')
  notifications;
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll: PerfectScrollbarDirective;
  dataObj:any;
  public config: PerfectScrollbarConfigInterface = {};
  dynTransform: string;
  transForm: string;
  visiblity: string;
  isDynClass: string;
  constructor(
    private _element: ElementRef,
    private router: Router,private sidenavService:SidenavService,
    zone: NgZone,
    // private dataService:DataService
  ) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => {
        //this.mediaMatcher = mql;
      })
    );
  }

  ngOnInit(): void {
    // this._router = this.dataService.getProject().subscribe(message => {
    //   this.dataObj=JSON.parse(message.text);
    //   this.createType=this.dataObj.name;
    //   this.notifications.toggle();
    // });
    this.url = this.router.url;
    this._router = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        document.querySelector(
          '.app-inner > .mat-drawer-content > div'
        ).scrollTop = 0;
        this.url = event.url;
        this.runOnRouteChange();
      });

      this.sidenavService.listenToggle().subscribe(res => {
        this.notifications.toggle();
      });
      // this.sidenavService.listenMenu().subscribe(res => {
      //   this.sidemenu.toggle();
      // });
  }

  ngOnDestroy(): void {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
      this.notifications.close();
    }

    this.updatePS();
  }

  receiveOptions($event): void {
    this.options = $event;
  }

  isOver(): boolean {
    if (
      this.url === '/apps/messages' ||
      this.url === '/apps/calendar' ||
      this.url === '/apps/media' ||
      this.url === '/maps/leaflet' ||
      this.url === '/taskboard'
    ) {
      return true;
    } else {
      return this.mediaMatcher.matches;
    }
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
      this.notifications.mode='over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
      this.notifications.mode='side';
    }
  }

  updatePS(): void {
    if (!this.mediaMatcher.matches && !this.options.compact) {
      // setTimeout(() => {
      //   this.directiveScroll.update();
      // }, 350);
    }
  }


  openedChange() {
    //this.dynTransform = '220px';
    this.transForm='';
    this.visiblity = '';
    this.isDynClass = 'open';
    }
    closedStart() {
    var myDiv = document.getElementById('sidenav');
    //this.dynTransform = '90px';
    this.transForm="translate3d(0,0,0)";
    this.visiblity='visible !important';
    //myDiv.scrollTop = 0;
    this.isDynClass = 'close';
    }

    onOpen() {
     // this.sidenavService.openingSidenav({ data: this.sidenavdetails });
    }
  
    onClose() {
      // if(this.sidenavdetails.type =='ADMIN'){
      //   this.messageService.sendAdminCall("");
      // }
      // this.sidenavService.closingSidenav({ data: this.sidenavdetails });
    }
}
