(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"1oag":function(e,t,a){"use strict";a.d(t,"a",(function(){return x}));var i=a("EUZL"),s=a("0IaG"),l=a("fXoL"),o=a("tyNb"),n=a("rxmM"),r=a("Kmm4"),c=a("as5N"),m=a("kmnG"),f=a("d3UM"),b=a("3Pt+"),d=a("FKr1"),u=a("ofXK"),g=a("bTqV"),h=a("qFsG"),p=a("NFeN"),T=["fileInput"],I=["UploadFileInput"];function S(e,t){if(1&e&&(l.Ub(0,"mat-option",11),l.Ic(1),l.Tb()),2&e){var a=t.$implicit;l.mc("value",a),l.Cb(1),l.Lc(" ",a.DESCRIPTION," / ",a.MODEL_NAME," ")}}function E(e,t){if(1&e&&(l.Ub(0,"mat-option",11),l.Ic(1),l.Tb()),2&e){var a=t.$implicit;l.mc("value",a),l.Cb(1),l.Kc(" ",a.name," ")}}function y(e,t){if(1&e){var a=l.Vb();l.Ub(0,"mat-form-field",1),l.Ub(1,"mat-label"),l.Ic(2,"Table List"),l.Tb(),l.Ub(3,"mat-select",12),l.bc("ngModelChange",(function(e){return l.xc(a),l.fc().oTable=e})),l.Gc(4,E,2,2,"mat-option",4),l.Tb(),l.Tb()}if(2&e){var i=l.fc();l.Cb(3),l.mc("ngModel",i.oTable),l.Cb(1),l.mc("ngForOf",i.tableList)}}function C(e,t){if(1&e&&(l.Ub(0,"mat-option",11),l.Ic(1),l.Tb()),2&e){var a=t.$implicit;l.mc("value",a),l.Cb(1),l.Kc(" ",a.name," ")}}function v(e,t){if(1&e){var a=l.Vb();l.Ub(0,"mat-form-field",1),l.Ub(1,"mat-label"),l.Ic(2,"Table List"),l.Tb(),l.Ub(3,"mat-select",12),l.bc("ngModelChange",(function(e){return l.xc(a),l.fc().oTable=e})),l.Gc(4,C,2,2,"mat-option",4),l.Tb(),l.Tb()}if(2&e){var i=l.fc();l.Cb(3),l.mc("ngModel",i.oTable),l.Cb(1),l.mc("ngForOf",i.tableIMGList)}}function M(e,t){if(1&e){var a=l.Vb();l.Ub(0,"mat-form-field",1),l.Ub(1,"input",13),l.bc("ngModelChange",(function(e){return l.xc(a),l.fc().myfilename=e})),l.Tb(),l.Ub(2,"button",14),l.Ub(3,"mat-icon"),l.Ic(4,"file_upload"),l.Tb(),l.Tb(),l.Ub(5,"input",15,16),l.bc("ngModelChange",(function(e){return l.xc(a),l.fc().myfilename=e}))("change",(function(e){return l.xc(a),l.fc().fileChangeEvent(e)})),l.Tb(),l.Tb()}if(2&e){var i=l.fc();l.Cb(1),l.mc("ngModel",i.myfilename),l.Cb(4),l.mc("ngModel",i.myfilename)}}function U(e,t){if(1&e){var a=l.Vb();l.Ub(0,"mat-form-field"),l.Ub(1,"input",13),l.bc("ngModelChange",(function(e){return l.xc(a),l.fc().imagename=e})),l.Tb(),l.Ub(2,"input",17,16),l.bc("ngModelChange",(function(e){return l.xc(a),l.fc().imagename=e}))("change",(function(e){return l.xc(a),l.fc().filesDropped(e,1)})),l.Tb(),l.Ub(4,"button",18),l.bc("click",(function(){return l.xc(a),l.fc().uploadImage()})),l.Ub(5,"mat-icon"),l.Ic(6,"file_upload"),l.Tb(),l.Ic(7,"Upload "),l.Tb(),l.Tb()}if(2&e){var i=l.fc();l.Cb(1),l.mc("ngModel",i.imagename),l.Cb(1),l.mc("ngModel",i.imagename)}}function A(e,t){if(1&e){var a=l.Vb();l.Ub(0,"button",19),l.bc("click",(function(){return l.xc(a),l.fc().BtnSaveClick()})),l.Ic(1,"Save"),l.Tb()}if(2&e){var i=l.fc();l.mc("disabled",i.disabled)}}function L(e,t){if(1&e){var a=l.Vb();l.Ub(0,"button",20),l.bc("click",(function(){return l.xc(a),l.fc().exportAsXLSX()})),l.Ub(1,"mat-icon"),l.Ic(2,"download"),l.Tb(),l.Ic(3," Import"),l.Tb()}}var x=function(){function e(e,t,a,i,s){this.router=e,this.masterdata=t,this.data=a,this.toaster=i,this.excelService=s,this.myfilename="Select File",this.excelDatasource=[],this.disabled=!0,this.AssemblyList=[],this.tableList=[{id:1,name:"ECAT_VEHCLE_SERIES"},{id:2,name:"ECAT_MODEL_MASTER"},{id:3,name:"ECAT_VEHICLE_IMAGES"},{id:4,name:"ECAT_ASSEMBLY_MASTER"},{id:5,name:"ECAT_ASSEMBLY_GROUP"},{id:6,name:"ECAT_ASSEMBLY_IMAGES"},{id:7,name:"ECAT_CATALOGUE"},{id:8,name:"ECAT_CATALOGUE_QV"}],this.tableIMGList=[{id:1,name:"ECAT_VEHCLE_SERIES"},{id:3,name:"ECAT_VEHICLE_IMAGES"},{id:6,name:"ECAT_ASSEMBLY_IMAGES"}]}return e.prototype.ngOnInit=function(){this.getClustorData(),this.data&&(console.log("dat",this.data),this.upldType=this.data.upldTyp)},e.prototype.fileChangeEvent=function(e){var t=this;if(!this.serId&&!this.oTable)return this.toaster.warningToastr("Select the series and Table to Upload"),void(this.myfilename="");if(e.target.files&&e.target.files[0]){if(this.myfilename="",this.file=e.target.files[0],this.file.size>0){var a=new FileReader;a.readAsArrayBuffer(this.file),a.onload=function(e){t.arrayBuffer=a.result;for(var s=new Uint8Array(t.arrayBuffer),l=new Array,o=0;o!=s.length;++o)l[o]=String.fromCharCode(s[o]);var n=l.join(""),r=i.read(n,{type:"binary"}),c=r.SheetNames;if(c.length>0&&(c=c.filter((function(e){return e==t.oTable.name}))),t.oTable.name==c){var m=r.Sheets[t.oTable.name];console.log(i.utils.sheet_to_json(m,{raw:!0}));var f=i.utils.sheet_to_json(m,{defval:""});t.filelist=[],t.filelist=f,console.log(t.filelist),t.myfilename+=t.file.name,t.disabled=!1}else t.toaster.warningToastr("selected table is not in Excel File")},a.readAsDataURL(e.target.files[0])}this.uploadFileInput.nativeElement.value=""}else this.myfilename="Select File"},e.prototype.getClustorData=function(){var e=this;this.masterdata.getReq("","api/Catalouge/GetMenuList?dealerID="+localStorage.getItem("dealercode")+"&type=1").subscribe((function(t){t&&200==t.statusCode&&(console.log("daata",t.data),e.Series=t.data)}),(function(t){401==t.status&&e.toaster.errorToastr(t.statusMessage),e.toaster.errorToastr(t.statusMessage)}))},e.prototype.BtnSaveClick=function(){var e=this;if(this.filelist.length>0){if(!this.serId&&!this.oTable)return this.toaster.warningToastr("Select the series and Table to Upload"),void(this.myfilename="");var t=this.filelist.filter((function(t){return t.SERIES===e.serId.SERIES}));if(t.length<=0)return console.log("series",t),void this.toaster.infoToastr("Selected Series is not Matching in Excel Sheet");if(this.filelist.length>0)if(1==this.oTable.id)var a={type:this.serId.SERIES,mTable:this.oTable.name,mlist1:this.filelist};else 2==this.oTable.id?a={type:this.serId.SERIES,mTable:this.oTable.name,mlist2:this.filelist}:3==this.oTable.id?a={type:this.serId.SERIES,mTable:this.oTable.name,mlist3:this.filelist}:4==this.oTable.id?a={type:this.serId.SERIES,mTable:this.oTable.name,mlist4:this.filelist}:5==this.oTable.id?a={type:this.serId.SERIES,mTable:this.oTable.name,mlist5:this.filelist}:6==this.oTable.id?a={type:this.serId.SERIES,mTable:this.oTable.name,mlist6:this.filelist}:7==this.oTable.id?a={type:this.serId.SERIES,mTable:this.oTable.name,mlist7:this.filelist}:8==this.oTable.id?a={type:this.serId.SERIES,mTable:this.oTable.name,mlist8:this.filelist}:this.toaster.infoToastr("select Table to Upload the Datasheet");else this.toaster.infoToastr("select Table to Upload the Datasheet");this.masterdata.post(a,"api/CatalougeMaster/UploadExcelAssemblyData").subscribe((function(t){200==t.statusCode?(e.toaster.successToastr(t.data),e.filelist=[],e.myfilename="",e.disabled=!0):e.toaster.errorToastr(t.data)}),(function(t){e.toaster.errorToastr(t.statusMessage)}))}},e.prototype.exportAsXLSX=function(){this.serId?this.getAllAssemblyData():this.toaster.infoToastr("Please select the Vehicle Model")},e.prototype.getAllAssemblyData=function(){var e=this;this.masterdata.getReq("","api/CatalougeMaster/GetAssemblySeriesData?dealerID="+localStorage.getItem("dealercode")+"&Series="+this.serId.SERIES).subscribe((function(t){t&&200==t.statusCode&&(e.AssemblyList=t.data,e.excelService.exportAsExcelMulFile(e.AssemblyList,"AssemblyVehicleSeries",e.tableList))}),(function(t){401==t.status&&e.toaster.errorToastr(t.statusMessage),e.toaster.errorToastr(t.statusMessage)}))},e.prototype.filesDropped=function(e,t){1==t?1==this.oTable.id?(this.ImgData1=e.target.files[0],this.imagename=this.ImgData1.name,this.imgpath="Series",console.log("i got 1 img",this.imagename)):3==this.oTable.id?(this.ImgData1=e.target.files[0],this.imagename=this.ImgData1.name,this.imgpath="Vehicle"):6==this.oTable.id&&this.serId.SERIES?(this.ImgData1=e.target.files,this.imagename=this.ImgData1[0].name,this.imgpath=this.serId.SERIES):this.toaster.infoToastr("No Images to Upload"):console.log("no image selected !!!!!!!")},e.prototype.uploadImage=function(){var e,t=this,a=new FormData;if((e=this.ImgData1).length>1){for(var i=0;i<e.length;i++)a.append("fileUpload",e[i]);a.append("folder",this.imgpath),this.masterdata.postMultiImags(a,"api/CatalougeMaster/UploadMultileImgs").subscribe((function(e){200==e.statusCode?(t.toaster.successToastr(e.message),t.ImgData1=null,t.imgpath=null,t.imagename=null):t.toaster.errorToastr(e.message)}),(function(e){401==e.status&&t.toaster.errorToastr(e.statusMessage)}))}else{if(!this.ImgData1)return void alert("No Images to Upload");a.append("image",this.ImgData1),a.append("folder",this.imgpath),this.masterdata.postimags(a,"api/CatalougeMaster/UploadImages").subscribe((function(e){200==e.statusCode?(t.toaster.successToastr(e.message),t.ImgData1=null,t.imgpath=null,t.imagename=null):t.toaster.errorToastr(e.message)}),(function(e){401==e.status&&t.toaster.errorToastr(e.statusMessage)}))}},e.\u0275fac=function(t){return new(t||e)(l.Ob(o.f),l.Ob(n.a),l.Ob(s.a),l.Ob(r.a),l.Ob(c.a))},e.\u0275cmp=l.Ib({type:e,selectors:[["app-menuupload-popup"]],viewQuery:function(e,t){var a;1&e&&(l.Nc(T,!0),l.Nc(I,!0)),2&e&&(l.tc(a=l.cc())&&(t.fileInput=a.first),l.tc(a=l.cc())&&(t.uploadFileInput=a.first))},decls:18,vars:9,consts:[[1,"pd-20"],[1,"example-full-width","m-10"],["name","type","id","typ",3,"ngModel","ngModelChange"],["value","-1"],[3,"value",4,"ngFor","ngForOf"],["class","example-full-width m-10",4,"ngIf"],[4,"ngIf"],[1,"cntr"],["mat-raised-button","",1,"m-10",3,"mat-dialog-close"],["mat-raised-button","","color","primary",3,"disabled","click",4,"ngIf"],["mat-raised-button","","color","warn",3,"click",4,"ngIf"],[3,"value"],["name","table","id","tab",3,"ngModel","ngModelChange"],["matInput","","readonly","",3,"ngModel","ngModelChange"],["matSuffix","","mat-icon-button","","matTooltip","Select a file"],["type","file","id","fileUpload","name","fileUpload","multiple","multiple","accept","xlsx/*",3,"ngModel","ngModelChange","change"],["UploadFileInput",""],["type","file","id","fileUpload","name","fileUpload","multiple","multiple","accept","image/x-png,image/gif,image/jpeg",3,"ngModel","ngModelChange","change"],["mat-icon-button","","matTooltip","Select a Image",3,"click"],["mat-raised-button","","color","primary",3,"disabled","click"],["mat-raised-button","","color","warn",3,"click"]],template:function(e,t){1&e&&(l.Ub(0,"div",0),l.Ub(1,"div"),l.Ub(2,"mat-form-field",1),l.Ub(3,"mat-label"),l.Ic(4,"Header List"),l.Tb(),l.Ub(5,"mat-select",2),l.bc("ngModelChange",(function(e){return t.serId=e})),l.Ub(6,"mat-option",3),l.Ic(7,"Select"),l.Tb(),l.Gc(8,S,2,3,"mat-option",4),l.Tb(),l.Tb(),l.Gc(9,y,5,2,"mat-form-field",5),l.Gc(10,v,5,2,"mat-form-field",5),l.Tb(),l.Gc(11,M,7,2,"mat-form-field",5),l.Gc(12,U,8,2,"mat-form-field",6),l.Ub(13,"div",7),l.Ub(14,"button",8),l.Ic(15,"Cancel"),l.Tb(),l.Gc(16,A,2,1,"button",9),l.Gc(17,L,4,0,"button",10),l.Tb(),l.Tb()),2&e&&(l.Cb(5),l.mc("ngModel",t.serId),l.Cb(3),l.mc("ngForOf",t.Series),l.Cb(1),l.mc("ngIf","file"==t.upldType),l.Cb(1),l.mc("ngIf","image"==t.upldType),l.Cb(1),l.mc("ngIf","file"==t.upldType),l.Cb(1),l.mc("ngIf","image"==t.upldType),l.Cb(2),l.mc("mat-dialog-close",!1),l.Cb(2),l.mc("ngIf","image"!=t.upldType),l.Cb(1),l.mc("ngIf","image"!=t.upldType))},directives:[m.c,m.f,f.a,b.n,b.q,d.l,u.m,u.n,g.b,s.d,h.b,b.c,m.g,p.a],styles:[""]}),e}()},mrSG:function(e,t,a){"use strict";function i(e,t){var a="function"==typeof Symbol&&e[Symbol.iterator];if(!a)return e;var i,s,l=a.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(i=l.next()).done;)o.push(i.value)}catch(n){s={error:n}}finally{try{i&&!i.done&&(a=l.return)&&a.call(l)}finally{if(s)throw s.error}}return o}function s(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(i(arguments[t]));return e}a.d(t,"a",(function(){return s}))}}]);