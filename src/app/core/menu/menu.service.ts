/**
 * Created BY HMSPL
 * Menu Service
 */
/*tslint:disable*/
import { Injectable } from '@angular/core';
import { SidenavService } from '../../Services/sidenave.service';
import { MasterdataService } from 'src/app/Services/masterdata.service';
import { ToastrManager } from 'ng6-toastr-notifications';
export interface BadgeItem {
  type: string;
  value: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
 // icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

let MENUITEMS = 
[
  {
    state: 'moped',
    name: 'Moped',
    type: 'link',
    icon: 'local_library',
    img: 'moped'
  },
  {
    state: 'scooter',
    name: 'Scooter',
    type: 'link',
    icon: 'local_library',
    img: 'scooter'
  },
  {
    state: 'scooty',
    name: 'Scooty',
    type: 'link',
    icon: 'local_library',
    img: 'scooty',
  },
  {
    state: 'motor',
    name: 'Motorcycle',
    type: 'link',
    icon: 'local_library',
    img: 'motorcycle'
  },
  {
    state: 'painted',
    name: 'Painted Parts',
    type: 'sub',
    icon: 'local_library',
    img: 'painted_parts',
    children: [
      { state: 'p_motor', name: 'Motorcycle', type: 'link' },
      { state: 'p_scooter', name: 'Scooter' , type: 'link'},
      { state: 'p_scooty', name: 'Scooty' , type: 'link'},
      { state: 'p_moped', name: 'Moped', type: 'link' }
    ]
  },
  {
    state: 'accessory',
    name: 'Accessory Parts',
    type: 'link',
    icon: 'local_library',
    img: 'accessory_parts'
  },
  {
    state: 'cluster',
    name: 'Photo Cluster',
    type: 'link',
    icon: 'local_library',
    img: 'ccp_parts'
  },
  {
    state: 'kits',
    name: 'Kit Parts',
    type: 'link',
    icon: 'local_library',
    img: 'kit_parts'
  }
  ,
  {
    state: 'tools',
    name: 'Tools',
    type: 'link',
    icon: 'local_library',
    img: 'kit_parts'
  },
  {
    state: 'admin',
    name: 'Admin',
    type: 'sub',
    icon: 'local_library',
    img: 'img',
    children: [
      { state: 'menu', name: 'Menu', type: 'link' },
      { state: 'adminCat', name: 'Catalogue' , type: 'link'},
      { state: 'adminPainted', name: 'Painted' , type: 'link'},
      { state: 'others', name: 'Others', type: 'link' }
    ]
  },
  {
    state: 'ad',
    name: 'Admin',
    type: 'link',
    icon: 'local_library',
    img: ''
  },
  {
    state: 'menu',
    name: 'Menu',
    type: 'link',
    icon: 'local_library',
    img: 'kit_parts'
  },
  {
    state: 'adminCat',
    name: 'Catalogue',
    type: 'link',
    icon: 'local_library',
    img: 'kit_parts'
  },
  // {
  //   state: 'adminPainted',
  //   name: 'Painted',
  //   type: 'link',
  //   icon: 'local_library',
  //   img: 'kit_parts'
  // },
  {
    state: 'others',
    name: 'others',
    type: 'link',
    icon: 'local_library',
    img: 'kit_parts'
  }
];

@Injectable()
export class MenuService {
  MenuCatIems: [];
  constructor(private siService: SidenavService){
  }
  getAll(): Menu[] {   
    return MENUITEMS;
  }
  add(menu) {
    MENUITEMS.push(menu);
  }
  
  
}
