(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"1oag":function(t,e,a){"use strict";a.d(e,"a",(function(){return x}));var i=a("EUZL"),s=a("0IaG"),o=a("fXoL"),n=a("tyNb"),l=a("rxmM"),r=a("Kmm4"),c=a("as5N"),h=a("kmnG"),m=a("d3UM"),d=a("3Pt+"),b=a("FKr1"),g=a("ofXK"),f=a("bTqV"),u=a("qFsG"),p=a("NFeN");const T=["fileInput"],I=["UploadFileInput"];function S(t,e){if(1&t&&(o.Ub(0,"mat-option",12),o.Ic(1),o.Tb()),2&t){const t=e.$implicit;o.mc("value",t),o.Cb(1),o.Lc(" ",t.DESCRIPTION," / ",t.MODEL_NAME," ")}}function C(t,e){if(1&t&&(o.Ub(0,"mat-option",12),o.Ic(1),o.Tb()),2&t){const t=e.$implicit;o.mc("value",t),o.Cb(1),o.Kc(" ",t.name," ")}}function E(t,e){if(1&t){const t=o.Vb();o.Ub(0,"mat-form-field",1),o.Ub(1,"input",13),o.bc("ngModelChange",(function(e){return o.xc(t),o.fc().myfilename=e})),o.Tb(),o.Ub(2,"button",14),o.Ub(3,"mat-icon"),o.Ic(4,"file_upload"),o.Tb(),o.Tb(),o.Ub(5,"input",15,16),o.bc("ngModelChange",(function(e){return o.xc(t),o.fc().myfilename=e}))("change",(function(e){return o.xc(t),o.fc().fileChangeEvent(e)})),o.Tb(),o.Tb()}if(2&t){const t=o.fc();o.Cb(1),o.mc("ngModel",t.myfilename),o.Cb(4),o.mc("ngModel",t.myfilename)}}function M(t,e){if(1&t){const t=o.Vb();o.Ub(0,"mat-form-field"),o.Ub(1,"input",13),o.bc("ngModelChange",(function(e){return o.xc(t),o.fc().imagename=e})),o.Tb(),o.Ub(2,"input",17,16),o.bc("ngModelChange",(function(e){return o.xc(t),o.fc().imagename=e}))("change",(function(e){return o.xc(t),o.fc().filesDropped(e,1)})),o.Tb(),o.Ub(4,"button",18),o.bc("click",(function(){return o.xc(t),o.fc().uploadImage()})),o.Ub(5,"mat-icon"),o.Ic(6,"file_upload"),o.Tb(),o.Ic(7,"Upload "),o.Tb(),o.Tb()}if(2&t){const t=o.fc();o.Cb(1),o.mc("ngModel",t.imagename),o.Cb(1),o.mc("ngModel",t.imagename)}}function v(t,e){if(1&t){const t=o.Vb();o.Ub(0,"button",19),o.bc("click",(function(){return o.xc(t),o.fc().BtnSaveClick()})),o.Ic(1,"Save"),o.Tb()}if(2&t){const t=o.fc();o.mc("disabled",t.disabled)}}function y(t,e){if(1&t){const t=o.Vb();o.Ub(0,"button",20),o.bc("click",(function(){return o.xc(t),o.fc().exportAsXLSX()})),o.Ub(1,"mat-icon"),o.Ic(2,"download"),o.Tb(),o.Ic(3," Import"),o.Tb()}}let x=(()=>{class t{constructor(t,e,a,i,s){this.router=t,this.masterdata=e,this.data=a,this.toaster=i,this.excelService=s,this.myfilename="Select File",this.excelDatasource=[],this.disabled=!0,this.AssemblyList=[],this.tableList=[{id:1,name:"ECAT_VEHCLE_SERIES"},{id:2,name:"ECAT_MODEL_MASTER"},{id:3,name:"ECAT_VEHICLE_IMAGES"},{id:4,name:"ECAT_ASSEMBLY_MASTER"},{id:5,name:"ECAT_ASSEMBLY_GROUP"},{id:6,name:"ECAT_ASSEMBLY_IMAGES"},{id:7,name:"ECAT_CATALOGUE"},{id:8,name:"ECAT_CATALOGUE_QV"}],this.tableIMGList=[{id:1,name:"ECAT_VEHCLE_SERIES"},{id:3,name:"ECAT_VEHICLE_IMAGES"},{id:6,name:"ECAT_ASSEMBLY_IMAGES"}]}ngOnInit(){this.getClustorData(),this.data&&(console.log("dat",this.data),this.upldType=this.data.upldTyp)}fileChangeEvent(t){if(!this.serId&&!this.oTable)return this.toaster.warningToastr("Select the series and Table to Upload"),void(this.myfilename="");if(t.target.files&&t.target.files[0]){if(this.myfilename="",this.file=t.target.files[0],this.file.size>0){const e=new FileReader;e.readAsArrayBuffer(this.file),e.onload=t=>{this.arrayBuffer=e.result;for(var a=new Uint8Array(this.arrayBuffer),s=new Array,o=0;o!=a.length;++o)s[o]=String.fromCharCode(a[o]);var n=s.join(""),l=i.read(n,{type:"binary"}),r=l.SheetNames;if(r.length>0&&(r=r.filter(t=>t==this.oTable.name)),this.oTable.name==r){var c=l.Sheets[this.oTable.name];console.log(i.utils.sheet_to_json(c,{raw:!0}));var h=i.utils.sheet_to_json(c,{defval:""});this.filelist=[],this.filelist=h,console.log(this.filelist),this.myfilename+=this.file.name,this.disabled=!1}else this.toaster.warningToastr("selected table is not in Excel File")},e.readAsDataURL(t.target.files[0])}this.uploadFileInput.nativeElement.value=""}else this.myfilename="Select File"}getClustorData(){this.masterdata.getReq("","api/Catalouge/GetMenuList?dealerID="+localStorage.getItem("dealercode")+"&type=1").subscribe(t=>{t&&200==t.statusCode&&(console.log("daata",t.data),this.Series=t.data)},t=>{401==t.status&&this.toaster.errorToastr(t.statusMessage),this.toaster.errorToastr(t.statusMessage)})}BtnSaveClick(){if(this.filelist.length>0){if(!this.serId&&!this.oTable)return this.toaster.warningToastr("Select the series and Table to Upload"),void(this.myfilename="");let e=this.filelist.filter(t=>t.SERIES===this.serId.SERIES);if(e.length<=0)return console.log("series",e),void this.toaster.infoToastr("Selected Series is not Matching in Excel Sheet");if(this.filelist.length>0)if(1==this.oTable.id)var t={type:this.serId.SERIES,mTable:this.oTable.name,mlist1:this.filelist};else 2==this.oTable.id?t={type:this.serId.SERIES,mTable:this.oTable.name,mlist2:this.filelist}:3==this.oTable.id?t={type:this.serId.SERIES,mTable:this.oTable.name,mlist3:this.filelist}:4==this.oTable.id?t={type:this.serId.SERIES,mTable:this.oTable.name,mlist4:this.filelist}:5==this.oTable.id?t={type:this.serId.SERIES,mTable:this.oTable.name,mlist5:this.filelist}:6==this.oTable.id?t={type:this.serId.SERIES,mTable:this.oTable.name,mlist6:this.filelist}:7==this.oTable.id?t={type:this.serId.SERIES,mTable:this.oTable.name,mlist7:this.filelist}:8==this.oTable.id?t={type:this.serId.SERIES,mTable:this.oTable.name,mlist8:this.filelist}:this.toaster.infoToastr("select Table to Upload the Datasheet");else this.toaster.infoToastr("select Table to Upload the Datasheet");this.masterdata.post(t,"api/CatalougeMaster/UploadExcelAssemblyData").subscribe(t=>{200==t.statusCode?(this.toaster.successToastr(t.data),this.filelist=[],this.myfilename="",this.disabled=!0):this.toaster.errorToastr(t.data)},t=>{this.toaster.errorToastr(t.statusMessage)})}}exportAsXLSX(){this.serId?this.getAllAssemblyData():this.toaster.infoToastr("Please select the Vehicle Model")}getAllAssemblyData(){this.masterdata.getReq("","api/CatalougeMaster/GetAssemblySeriesData?dealerID="+localStorage.getItem("dealercode")+"&Series="+this.serId.SERIES).subscribe(t=>{t&&200==t.statusCode&&(this.AssemblyList=t.data,this.excelService.exportAsExcelMulFile(this.AssemblyList,"AssemblyVehicleSeries",this.tableList))},t=>{401==t.status&&this.toaster.errorToastr(t.statusMessage),this.toaster.errorToastr(t.statusMessage)})}filesDropped(t,e){1==e?1==this.oTable.id?(this.ImgData1=t.target.files[0],this.imagename=this.ImgData1.name,this.imgpath="Series",console.log("i got 1 img",this.imagename)):3==this.oTable.id?(this.ImgData1=t.target.files[0],this.imagename=this.ImgData1.name,this.imgpath="Vehicle"):6==this.oTable.id&&this.serId.SERIES?(this.ImgData1=t.target.files,this.imagename=this.ImgData1[0].name,this.imgpath=this.serId.SERIES):this.toaster.infoToastr("No Images to Upload"):console.log("no image selected !!!!!!!")}uploadImage(){const t=new FormData;let e=[];if(e=this.ImgData1,e.length>1){for(var a=0;a<e.length;a++)t.append("fileUpload",e[a]);t.append("folder",this.imgpath),this.masterdata.postMultiImags(t,"api/CatalougeMaster/UploadMultileImgs").subscribe(t=>{200==t.statusCode?(this.toaster.successToastr(t.message),this.ImgData1=null,this.imgpath=null,this.imagename=null):this.toaster.errorToastr(t.message)},t=>{401==t.status&&this.toaster.errorToastr(t.statusMessage)})}else{if(!this.ImgData1)return void alert("No Images to Upload");t.append("image",this.ImgData1),t.append("folder",this.imgpath),this.masterdata.postimags(t,"api/CatalougeMaster/UploadImages").subscribe(t=>{200==t.statusCode?(this.toaster.successToastr(t.message),this.ImgData1=null,this.imgpath=null,this.imagename=null):this.toaster.errorToastr(t.message)},t=>{401==t.status&&this.toaster.errorToastr(t.statusMessage)})}}}return t.\u0275fac=function(e){return new(e||t)(o.Ob(n.f),o.Ob(l.a),o.Ob(s.a),o.Ob(r.a),o.Ob(c.a))},t.\u0275cmp=o.Ib({type:t,selectors:[["app-menuupload-popup"]],viewQuery:function(t,e){var a;1&t&&(o.Nc(T,!0),o.Nc(I,!0)),2&t&&(o.tc(a=o.cc())&&(e.fileInput=a.first),o.tc(a=o.cc())&&(e.uploadFileInput=a.first))},decls:21,vars:9,consts:[[1,"pd-20"],[1,"example-full-width","m-10"],["name","type","id","typ",3,"ngModel","ngModelChange"],["value","-1"],[3,"value",4,"ngFor","ngForOf"],["name","table","id","tab",3,"ngModel","ngModelChange"],["class","example-full-width m-10",4,"ngIf"],[4,"ngIf"],[1,"cntr"],["mat-raised-button","",1,"m-10",3,"mat-dialog-close"],["mat-raised-button","","color","primary",3,"disabled","click",4,"ngIf"],["mat-raised-button","","color","warn",3,"click",4,"ngIf"],[3,"value"],["matInput","","readonly","",3,"ngModel","ngModelChange"],["matSuffix","","mat-icon-button","","matTooltip","Select a file"],["type","file","id","fileUpload","name","fileUpload","multiple","multiple","accept","xlsx/*",3,"ngModel","ngModelChange","change"],["UploadFileInput",""],["type","file","id","fileUpload","name","fileUpload","multiple","multiple","accept","image/x-png,image/gif,image/jpeg",3,"ngModel","ngModelChange","change"],["mat-icon-button","","matTooltip","Select a Image",3,"click"],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","","color","warn",3,"click"]],template:function(t,e){1&t&&(o.Ub(0,"div",0),o.Ub(1,"div"),o.Ub(2,"mat-form-field",1),o.Ub(3,"mat-label"),o.Ic(4,"Header List"),o.Tb(),o.Ub(5,"mat-select",2),o.bc("ngModelChange",(function(t){return e.serId=t})),o.Ub(6,"mat-option",3),o.Ic(7,"Select"),o.Tb(),o.Gc(8,S,2,3,"mat-option",4),o.Tb(),o.Tb(),o.Ub(9,"mat-form-field",1),o.Ub(10,"mat-label"),o.Ic(11,"Table List"),o.Tb(),o.Ub(12,"mat-select",5),o.bc("ngModelChange",(function(t){return e.oTable=t})),o.Gc(13,C,2,2,"mat-option",4),o.Tb(),o.Tb(),o.Tb(),o.Gc(14,E,7,2,"mat-form-field",6),o.Gc(15,M,8,2,"mat-form-field",7),o.Ub(16,"div",8),o.Ub(17,"button",9),o.Ic(18,"Cancel"),o.Tb(),o.Gc(19,v,2,1,"button",10),o.Gc(20,y,4,0,"button",11),o.Tb(),o.Tb()),2&t&&(o.Cb(5),o.mc("ngModel",e.serId),o.Cb(3),o.mc("ngForOf",e.Series),o.Cb(4),o.mc("ngModel",e.oTable),o.Cb(1),o.mc("ngForOf",e.tableIMGList),o.Cb(1),o.mc("ngIf","file"==e.upldType),o.Cb(1),o.mc("ngIf","image"==e.upldType),o.Cb(2),o.mc("mat-dialog-close",!1),o.Cb(2),o.mc("ngIf","image"!=e.upldType),o.Cb(1),o.mc("ngIf","image"!=e.upldType))},directives:[h.c,h.f,m.a,d.n,d.q,b.l,g.m,g.n,f.b,s.d,u.b,d.c,h.g,p.a],styles:[""]}),t})()},"t+9Q":function(t,e,a){"use strict";a.d(e,"a",(function(){return f}));var i=a("Kdsb"),s=a("uh2U"),o=a("fXoL"),n=a("tyNb"),l=a("2uiY"),r=a("0IaG"),c=a("fvNU"),h=a("rxmM"),m=a("Kmm4"),d=a("wZkO"),b=a("ofXK");function g(t,e){if(1&t){const t=o.Vb();o.Ub(0,"mat-tab",5),o.Ub(1,"div",6),o.Ub(2,"canvas",7),o.bc("click",(function(a){o.xc(t);const i=e.$implicit;return o.fc().getMopedDetail(a,i.id)})),o.Tb(),o.Tb(),o.Tb()}if(2&t){const t=e.$implicit,a=o.fc();o.nc("label",t.name),o.Cb(1),o.mc("perfectScrollbar",a.config),o.Cb(1),o.Dc("background","url("+t.image+")"),o.nc("title",a.imgTool)}}let f=(()=>{class t{constructor(t,e,a,i,s,o){this.router=t,this.sidenaveService=e,this.dialog=a,this.commonservice=i,this.masterdata=s,this.toaster=o,this.config={},this.imgTool="",this.assemlyData=[],this.setTab=0}onMouseMove(t){console.log(`x: ${t.clientX}, y: ${t.clientY}`);let e=0,a=0;e+=t.offsetX,a+=t.offsetY,this.canvas=document.getElementById("canvas");let i=t.offsetX,s=t.offsetY,o=[];console.log("123",this.assemblePart),this.assemblePart.length>0&&(o=function(t,e,a){let i=[],s=t+5,o=e+5,n=e-5;for(var l=t-5;l<s;l++){for(var r=n;r<o;r++)if(i=a.filter(t=>t.COORDINATES==[l,r,t.COORDINATES.split(",")[2]].join()),i.length>0)return i;if(i.length>0)return i}}(i,s,this.assemblePart),console.log("data",o)),o.length&&(this.imgTool=o[0].ASSEMBLY_NAME),console.log(e,a)}ngOnInit(){}ngAfterViewInit(){this.setTab=this.commonservice.selectTab,this.bckdata=this.commonservice.paramgrp,this.commonservice.selectTab=0,this.commonservice.paramgrp=null,console.log("tabdata",this.tabData),this.setTab>0?this.getMopedDetail(0,this.tabData.head[this.setTab].id):this.tabData.head.length>0&&this.getMopedDetail(0,this.tabData.head[0].id),this.bckdata&&1==this.bckdata.IS_SUBASSEMBLY_ID&&(this.openPopup(this.bckdata),this.bckdata=null),document.getElementById("myBtn").style.height="50px",this.imgresize()}imgresize(){var t=document.getElementById("canvas"),e=t.getContext("2d"),a=new Image;a.onload=function(){t.height=t.width*(a.height/a.width);var i=document.createElement("canvas"),s=i.getContext("2d");i.width=.5*a.width,i.height=.5*a.height,s.drawImage(a,0,0,i.width,i.height),s.drawImage(i,0,0,.5*i.width,.5*i.height),e.drawImage(i,0,0,.5*i.width,.5*i.height,0,0,t.width,t.height)},console.log("imgpath",this.tabData[0].image),a.src=this.tabData[0].image}openPopup(t){this.dialog.open(s.a,{data:{title:"part",data:t}}).afterClosed().subscribe(t=>{console.log("The dialog was closed",t),t&&this.router.navigate([this.tabData.url],{queryParams:{param1:t.SERIES,param2:t.ASSEMBLY_ID}})})}getPosition(t,e){this.element=this.root,this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d");let a=0,i=0;a+=t.offsetX,i+=t.offsetY,console.log("FFFFFFf",a,i),this.getmatchData(a,i),this.coordMatch.length>0&&(this.commonservice.selectTab=this.setTab,this.commonservice.paramgrp=this.coordMatch[0],this.coordMatch[0].IS_SUBASSEMBLY_ID?this.openPopup(this.coordMatch[0]):this.router.navigate([this.tabData.url],{queryParams:{param1:this.coordMatch[0].SERIES,param2:this.coordMatch[0].ASSEMBLY_ID}}))}getmatchData(t,e){let a=[],i=t+5,s=e+5,o=e-5,n=[];for(var l=t-5;l<i;l++){for(var r=o;r<s;r++){let t={x:l,y:r};if(this.coordMatch=this.filterItemsOfType(l,r),n.push(t),a=n,this.coordMatch.length>0)return!0}if(this.coordMatch.length>0)return!0}}getMopedDetail(t,e){this.masterdata.getReq("","api/Catalouge/GetVehCoordinatesbySeries?series="+e).subscribe(a=>{a&&200==a.statusCode&&(this.assemlyData=a.data,this.assemblePart=a.data.coordinates,console.log("321",this.assemblePart),0!=t&&this.getPosition(t,e))},t=>{this.toaster.errorToastr(t.statusMessage)})}filterItemsOfType(t,e){[t,e].join();let a=[];return a=this.assemlyData.coordinates.filter(a=>a.COORDINATES==[t,e,a.COORDINATES.split(",")[2]].join()),a}tabChanges(t){this.tabData.head.length>0&&this.getMopedDetail(t,this.tabData.head[t.index].id)}}return t.\u0275fac=function(e){return new(e||t)(o.Ob(n.f),o.Ob(l.a),o.Ob(r.b),o.Ob(c.a),o.Ob(h.a),o.Ob(m.a))},t.\u0275cmp=o.Ib({type:t,selectors:[["app-catalogue"]],viewQuery:function(t,e){var a;1&t&&o.Nc(i.b,!0),2&t&&o.tc(a=o.cc())&&(e.directiveScroll=a.first)},hostBindings:function(t,e){1&t&&o.bc("mousemove",(function(t){return e.onMouseMove(t)}))},inputs:{tabData:"tabData"},decls:5,vars:2,consts:[[1,"tooltip"],["tooltip",""],[1,"homeMain"],["mat-align-tabs","start",3,"selectedIndex","selectedIndexChange","Change"],[3,"label",4,"ngFor","ngForOf"],[3,"label"],["fullpage","",3,"perfectScrollbar"],["id","canvas","width","750","height","506",2,"width","auto","height","100%","margin-top","5px","opacity","1",3,"title","click"]],template:function(t,e){1&t&&(o.Pb(0,"div",0,1),o.Ub(2,"div",2),o.Ub(3,"mat-tab-group",3),o.bc("selectedIndexChange",(function(t){return e.setTab=t}))("Change",(function(t){return e.tabChanges(t)})),o.Gc(4,g,3,5,"mat-tab",4),o.Tb(),o.Tb()),2&t&&(o.Cb(3),o.mc("selectedIndex",e.setTab),o.Cb(1),o.mc("ngForOf",e.tabData.head))},directives:[d.b,b.m,d.a,i.b],styles:["mat-tab-label{height:10vh;padding:0 7px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:180px;min-width:12vw;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative;font-size:4.8px}#canvas[_ngcontent-%COMP%]{cursor:pointer;background-repeat:no-repeat!important}#canvas[_ngcontent-%COMP%]:-webkit-any-link{cursor:pointer}.tooltip[_ngcontent-%COMP%]{display:none;position:absolute;font-size:.75em;background-color:#fff;border:1px solid grey;border-radius:2px}@media screen and (min-width:1900px) and (max-height:1080px){.canvas[_ngcontent-%COMP%]{width:750px!important;height:500px!important}}@media (max-width:768px){.mBack[_ngcontent-%COMP%]{background-size:295px!important}}.srlDiv[_ngcontent-%COMP%]{height:calc(100% - 100px);position:absolute;background-repeat:no-repeat!important}[class*=col-][_ngcontent-%COMP%]{width:100%}.mat-tab-labels[_ngcontent-%COMP%],   .mat-tab-label{color:#fff!important;height:40px!important}  .mat-tab-list{border-radius:10px}  .mat-tab-header{border-radius:10px;background-color:#00599d!important;height:40px!important}"]}),t})()}}]);