(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{PpKJ:function(t,e,n){"use strict";n.r(e),n.d(e,"Tru4ConsumablesModule",(function(){return O}));var a=n("ofXK"),i=n("tyNb"),o=n("H8qh"),r=n("Kdsb"),s=n("fXoL"),c=n("rxmM"),d=n("fvNU"),p=n("Kmm4"),l=n("wZkO"),b=n("bTqV"),g=n("NFeN"),m=n("bSwM"),h=n("3Pt+"),x=n("1zy2");function u(t,e){if(1&t&&(s.Pb(0,"img",14),s.Ic(1)),2&t){var n=s.fc().$implicit;s.nc("src",n.Image,s.zc),s.Cb(1),s.Kc(" ",n.Titles," ")}}function f(t,e){if(1&t){var n=s.Vb();s.Ub(0,"div"),s.Ub(1,"div",15),s.Ub(2,"div",16),s.Ub(3,"h5"),s.Ic(4),s.Tb(),s.Ub(5,"mat-checkbox",17),s.bc("ngModelChange",(function(t){return s.xc(n),e.$implicit.IsSelect=t}))("change",(function(t){s.xc(n);var a=e.index,i=e.$implicit;return s.fc(2).checked(a,t,i.PartNO)})),s.Ic(6,"Select "),s.Tb(),s.Tb(),s.Ub(7,"div",18),s.bc("click",(function(){s.xc(n);var t=e.index;return s.fc(2).currIndex=t})),s.Ub(8,"div",19),s.Pb(9,"lib-ngx-image-zoom",20),s.Tb(),s.Ub(10,"div",21),s.Ub(11,"label",22),s.Ic(12," PART NO "),s.Tb(),s.Ub(13,"label",22),s.Ic(14," DESCRIPTION "),s.Tb(),s.Ub(15,"label",22),s.Ic(16," CAPACITY"),s.Tb(),s.Ub(17,"label",22),s.Ic(18," NDP "),s.Tb(),s.Ub(19,"label",22),s.Ic(20," MRP "),s.Tb(),s.Tb(),s.Ub(21,"div",23),s.Ub(22,"span"),s.Ub(23,"small"),s.Ic(24,": \xa0 "),s.Tb(),s.Ub(25,"span",24),s.Ic(26),s.Tb(),s.Tb(),s.Ub(27,"span"),s.Ub(28,"small"),s.Ic(29,": \xa0 "),s.Tb(),s.Ub(30,"span",24),s.Ic(31),s.Tb(),s.Tb(),s.Ub(32,"span"),s.Ub(33,"small"),s.Ic(34,": \xa0 "),s.Tb(),s.Ub(35,"span",24),s.Ic(36),s.Tb(),s.Ic(37,"ML "),s.Tb(),s.Ub(38,"span"),s.Ub(39,"small"),s.Ic(40,": \xa0 "),s.Tb(),s.Ub(41,"span",24),s.Ic(42),s.Tb(),s.Tb(),s.Ub(43,"span"),s.Ub(44,"small"),s.Ic(45,": \xa0 "),s.Tb(),s.Ub(46,"span",24),s.Ic(47),s.Tb(),s.Tb(),s.Ub(48,"label",22),s.Ic(49,"Quantity : "),s.Ub(50,"input",25),s.bc("ngModelChange",(function(t){return s.xc(n),e.$implicit.qty=t})),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Tb()}if(2&t){var a=e.$implicit,i=e.index,o=s.fc(2);s.Cb(1),s.mc("ngClass",i==o.currIndex?"itemActive":""),s.Cb(3),s.Kc(" ",a.PartNO," "),s.Cb(1),s.mc("ngModel",a.IsSelect),s.Cb(4),s.mc("thumbImage",a.Image)("fullImage",a.Image),s.Cb(17),s.Kc(" ",a.PartNO,""),s.Cb(5),s.Kc(" ",a.Description," "),s.Cb(5),s.Kc(" ",a.Capacity," "),s.Cb(6),s.Kc(" ",a.NDP," "),s.Cb(5),s.Kc(" ",a.MRP," "),s.Cb(3),s.mc("disabled",!a.IsSelect)("ngModel",a.qty)}}function C(t,e){if(1&t){var n=s.Vb();s.Ub(0,"mat-tab",3),s.Gc(1,u,2,2,"ng-template",4),s.Ub(2,"div",5),s.Ub(3,"div",6),s.Ub(4,"div",7),s.Ub(5,"button",8),s.bc("click",(function(){return s.xc(n),s.fc().addToCart()})),s.Ub(6,"mat-icon"),s.Ic(7,"add_shopping_cart"),s.Tb(),s.Ic(8," Add To Cart"),s.Tb(),s.Tb(),s.Ub(9,"div",9),s.Ub(10,"div",10),s.Gc(11,f,51,12,"div",11),s.Tb(),s.Tb(),s.Tb(),s.Ub(12,"div",12),s.Pb(13,"img",13),s.Tb(),s.Tb(),s.Tb()}if(2&t){var a=e.$implicit,i=s.fc();s.Cb(10),s.mc("perfectScrollbar",i.config),s.Cb(1),s.mc("ngForOf",i.filterItemsofTseries(a.TruSeries,i.j)),s.Cb(2),s.nc("src",a.Labels,s.zc)}}var P=[{path:"",children:[{path:"",component:function(){function t(t,e,n,a){this.masterServices=t,this.commonService=e,this.router=n,this.toaster=a,this.config={},this.isShowLoader=!1,this.currIndex=0,this.dataSource={},this.addCart=[{custID:0,dealerID:0,cartid:0,parts:[],status:0,series:""}],this.consumableHeader=[],this.consumableParts=[]}return t.prototype.ngOnInit=function(){this.GetformLoadData()},t.prototype.ngAfterViewInit=function(){},t.prototype.GetformLoadData=function(){var t=this;this.masterServices.getReq("","api/Catalouge/GetConsumablesDetails?").subscribe((function(e){e&&200==e.statusCode&&(t.dataSource=e.data,t.consumableHeader=t.dataSource.Headers,t.consumableParts=t.dataSource.Parts),e&&401==e.statusCode&&t.toaster.errorToastr(e.message)}),(function(e){401==e.status&&t.toaster.errorToastr(e.statusMessage),t.toaster.errorToastr(e.statusMessage)}))},t.prototype.filterItemsofTseries=function(t,e){return this.consumableParts.filter((function(e){return e.TruSeries===t}))},t.prototype.onTabChanged=function(t){},t.prototype.addToCart=function(){var t=this;this.addCart.custID=localStorage.getItem("dealercode"),this.addCart.dealerID=localStorage.getItem("dealercode"),this.addCart.series="0";for(var e=[],n=0;n<this.consumableParts.length;n++)if(this.consumableParts[n].IsSelect){if(!(this.consumableParts[n].qty>0))return void this.toaster.warningToastr("Please enter the Quantity");e.push({PART_NO:this.consumableParts[n].PartNO,ORDER_QTY:this.consumableParts[n].qty})}this.addCart.parts=e,this.addCart.status=1,this.masterServices.post({custID:this.addCart.custID,dealerID:this.addCart.dealerID,status:this.addCart.status,parts:this.addCart.parts,series:this.addCart.series},"api/Catalouge/AddUpdateToCart").subscribe((function(e){e&&200==e.statusCode&&("Part Added Successfully"==e.message?(t.toaster.successToastr("Part Added Successfully"),t.commonService.sentbadge(e.data)):"Part Updated Successfully"==e.message?t.toaster.successToastr("Part Updated Successfully"):(t.toaster.warningToastr(e.statusMessage),t.commonService.sentbadge(e.data)),t.refreshPage())}),(function(e){t.isShowLoader=!1,t.toaster.errorToastr(e.statusMessage)}))},t.prototype.refreshPage=function(){this.GetformLoadData()},t.prototype.checked=function(t,e,n){this.consumableParts[t].qty=e.checked?1:0},t.\u0275fac=function(e){return new(e||t)(s.Ob(c.a),s.Ob(d.a),s.Ob(i.f),s.Ob(p.a))},t.\u0275cmp=s.Ib({type:t,selectors:[["app-consumables-home"]],viewQuery:function(t,e){var n;1&t&&s.Nc(r.b,!0),2&t&&s.tc(n=s.cc())&&(e.directiveScroll=n.first)},decls:3,vars:2,consts:[[1,"homeMain"],[3,"perfectScrollbar"],["style","display: block;",4,"ngFor","ngForOf"],[2,"display","block"],["mat-tab-label",""],[2,"width","100%","display","inline-flex"],[2,"width","473px"],[2,"display","flex","justify-content","flex-end"],["mat-stroked-button","","color","primary",3,"click"],[1,"flx"],[1,"col-sm-12","srlDiv","h-512",3,"perfectScrollbar"],[4,"ngFor","ngForOf"],[1,"col-md-6","col-sm-12","srlDiv","cntr"],["alt","",1,"wt-81",2,"margin-top","7px","width","auto","height","520px",3,"src"],["alt","",1,"wt-10",3,"src"],[1,"brCls",3,"ngClass"],[1,"btn"],[3,"ngModel","ngModelChange","change"],[1,"flx","imgBlk",3,"click"],[2,"height","100px","width","100px"],["mode","hover",3,"thumbImage","fullImage"],[1,"userLabDiv","f-10"],["for",""],[1,"userDetDiv","f-10"],[1,"namePadSpan"],["type","number","min","0",1,"qtyWt",3,"disabled","ngModel","ngModelChange"]],template:function(t,e){1&t&&(s.Ub(0,"div",0),s.Ub(1,"mat-tab-group",1),s.Gc(2,C,14,3,"mat-tab",2),s.Tb(),s.Tb()),2&t&&(s.Cb(1),s.mc("perfectScrollbar",e.config),s.Cb(1),s.mc("ngForOf",e.consumableHeader))},directives:[l.b,r.b,a.m,l.a,l.c,b.b,g.a,a.l,m.a,h.n,h.q,x.a,h.s,h.c],styles:[".mainCls[_ngcontent-%COMP%]{padding:0 5px 10px;padding:15px;display:flex;height:calc(100vh - 100px)}.tabWith[_ngcontent-%COMP%]{width:100%}.tableOut[_ngcontent-%COMP%]{padding:3px 15px 15px}.qtyInbx[_ngcontent-%COMP%]{width:50px}.brClass[_ngcontent-%COMP%]{border:1px solid #e4d9d9}.backImag[_ngcontent-%COMP%]{width:20px;padding:20px}.posTop[_ngcontent-%COMP%]{position:relative;top:8px;right:11px}.homeMain[_ngcontent-%COMP%]{padding:5px}.imgClss[_ngcontent-%COMP%]{width:98%;position:relative;top:30px}@media (max-width:768px){.homeMain[_ngcontent-%COMP%]{padding:5px!important}}.rImg[_ngcontent-%COMP%]{width:50%}.itemCls[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:165px;border-radius:10px;margin:10px;border:1px solid #dedddd;cursor:pointer;box-shadow:0 0 1px -4px rgba(0,0,0,.2),0 2px 1px -1px rgba(0,0,0,.14),0 3px 2px 1px rgba(0,0,0,.12)}.itemActive[_ngcontent-%COMP%]{border:2px solid #1143c3!important;box-shadow:0 5px 15px -8px rgba(0,0,0,.2),0 3px 4px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.col-md-5[_ngcontent-%COMP%]{width:43%}.wrCls[_ngcontent-%COMP%]{display:flex;flex-flow:wrap}.center[_ngcontent-%COMP%]{text-align:center}.mr-10[_ngcontent-%COMP%]{margin:10px}@media (max-width:768px){.mWt[_ngcontent-%COMP%]{width:30%!important}.hClass[_ngcontent-%COMP%]{width:100%!important}}  .ngxImageZoomContainer>img{width:100px!important;height:100px!important}tr.mat-footer-row[_ngcontent-%COMP%], tr.mat-row[_ngcontent-%COMP%]{height:28px}.img-zoom-container[_ngcontent-%COMP%]{position:relative}.img-zoom-lens[_ngcontent-%COMP%]{position:absolute;border:1px solid #d4d4d4;width:40px;height:40px}.img-zoom-result[_ngcontent-%COMP%]{border:1px solid #d4d4d4;width:300px;height:300px}.srlDiv[_ngcontent-%COMP%]{position:relative;height:calc(100% - 120px);min-inline-size:-moz-fit-content;min-inline-size:fit-content;margin-left:25px;text-align:initial}.wt-100[_ngcontent-%COMP%]{width:100px}.brCls[_ngcontent-%COMP%]{border:1px solid #d9d5d5;border-radius:10px;padding:5px;cursor:pointer}.detClass[_ngcontent-%COMP%]{line-height:2;padding-left:40px}.detClass[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-weight:600}.imgBlk[_ngcontent-%COMP%]{align-items:start}.h-580[_ngcontent-%COMP%]{height:calc(100% - 90px)!important}.h-512[_ngcontent-%COMP%]{max-height:486px}.wt-81[_ngcontent-%COMP%]{max-width:100%;height:calc(100vh - 190px)}.wt-10[_ngcontent-%COMP%]{width:auto;height:20px;padding-right:5px}.cntr[_ngcontent-%COMP%]{text-align:left}.btn[_ngcontent-%COMP%]{display:flex;justify-content:space-between;height:20px}.posR[_ngcontent-%COMP%]{position:relative;right:15px;float:right}  .mat-tab-body-content{overflow:hidden!important}.mat-tab-labels[_ngcontent-%COMP%],   .mat-tab-label{color:#fff!important;height:40px!important}  .mat-tab-list{border-radius:10px}  .mat-tab-header{border-radius:10px;background-color:#00599d!important;height:40px!important}",".headMain[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;width:100%}.posCls[_ngcontent-%COMP%]{position:relative;right:50px}.cartIcon[_ngcontent-%COMP%]{font-size:30px;position:relative;right:7px}@media (max-width:768px){.mFlex[_ngcontent-%COMP%]{display:flex;flex-direction:column!important}.mpos[_ngcontent-%COMP%]{top:5px}.mBottom[_ngcontent-%COMP%], .mpos[_ngcontent-%COMP%]{position:relative;right:20px}.mBottom[_ngcontent-%COMP%]{bottom:15px}}.userLabDiv[_ngcontent-%COMP%]{display:flex;flex-direction:column;line-height:10px}.userLabDiv[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding:10px 4px 5px 0}.userDetDiv[_ngcontent-%COMP%]{display:flex;flex-direction:column;line-height:10px}.userDetDiv[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:10px 4px 5px 0}.userDetailBlock[_ngcontent-%COMP%]{display:flex;border-bottom:1px solid rgba(0,0,0,.1);position:relative;margin:10px}.headPadUser[_ngcontent-%COMP%]{padding:10px 10px 15px;font-weight:500}.ordTxt[_ngcontent-%COMP%]{color:red}.f-12[_ngcontent-%COMP%]{font-size:12px!important}.f-10[_ngcontent-%COMP%]{font-size:10px!important}.pl-50[_ngcontent-%COMP%]{padding-left:50px}  .mat-menu-item{height:25px!important;line-height:25px!important}"]}),t}()}]}],M=n("bznP"),O=function(){function t(){}return t.\u0275mod=s.Mb({type:t}),t.\u0275inj=s.Lb({factory:function(e){return new(e||t)},providers:[],imports:[[a.c,i.i.forChild(P),o.a,M.b]]}),t}()}}]);