(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{ht4G:function(t,a,e){"use strict";e.d(a,"a",(function(){return G}));var s=e("0IaG"),b=e("fXoL"),r=e("rxmM"),n=e("Kmm4"),i=e("ofXK"),c=e("kmnG"),o=e("qFsG"),l=e("3Pt+"),d=e("bSwM"),m=e("bTqV"),u=e("d3UM"),D=e("FKr1");function h(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter Assemblyid"),b.Tb())}function g(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter Assembly Name"),b.Tb())}function f(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter Fig No"),b.Tb())}function I(t,a){if(1&t&&(b.Ub(0,"mat-option",14),b.Ic(1),b.Tb()),2&t){const t=a.$implicit;b.mc("value",t),b.Cb(1),b.Kc(" ",t.ASSEMBLY_NAME," ")}}function p(t,a){if(1&t){const t=b.Vb();b.Ub(0,"mat-form-field",2),b.Ub(1,"mat-select",13),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc(2).SubAssem=a}))("selectionChange",(function(a){return b.xc(t),b.fc(2).onchange(a)})),b.Ub(2,"mat-option",14),b.Ic(3,"AddNew"),b.Tb(),b.Gc(4,I,2,2,"mat-option",15),b.Tb(),b.Tb()}if(2&t){const t=b.fc(2);b.Cb(1),b.mc("ngModel",t.SubAssem),b.Cb(1),b.mc("value",0),b.Cb(2),b.mc("ngForOf",t.subAssemlyData)}}function M(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter Assembly GroupID"),b.Tb())}function T(t,a){if(1&t){const t=b.Vb();b.Ub(0,"mat-form-field",2),b.Ub(1,"mat-label"),b.Ic(2,"Assembly GroupID"),b.Tb(),b.Ub(3,"input",16),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc(2).partData.subassemblygrp=a})),b.Tb(),b.Gc(4,M,2,0,"mat-error",5),b.Tb()}if(2&t){const t=b.fc(2);b.Cb(3),b.mc("ngModel",t.partData.subassemblygrp),b.Cb(1),b.mc("ngIf",!t.partData.subAssemblyId)}}function C(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter SubAssembly ID"),b.Tb())}function A(t,a){if(1&t){const t=b.Vb();b.Ub(0,"mat-form-field",2),b.Ub(1,"mat-label"),b.Ic(2,"Sub AssembleyID"),b.Tb(),b.Ub(3,"input",16),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc(2).partData.subAssemblyId=a})),b.Tb(),b.Gc(4,C,2,0,"mat-error",5),b.Tb()}if(2&t){const t=b.fc(2);b.Cb(3),b.mc("ngModel",t.partData.subAssemblyId),b.Cb(1),b.mc("ngIf",!t.partData.subAssemblyId)}}function S(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter SubAssembly Name"),b.Tb())}function U(t,a){if(1&t){const t=b.Vb();b.Ub(0,"mat-form-field",2),b.Ub(1,"mat-label"),b.Ic(2,"Sub AssembleyName"),b.Tb(),b.Ub(3,"input",17),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc(2).partData.subAssemDesc=a})),b.Tb(),b.Gc(4,S,2,0,"mat-error",5),b.Tb()}if(2&t){const t=b.fc(2);b.Cb(3),b.mc("ngModel",t.partData.subAssemDesc),b.Cb(1),b.mc("ngIf",!t.partData.subAssDesc)}}function y(t,a){if(1&t){const t=b.Vb();b.Ub(0,"mat-form-field",2),b.Ub(1,"label"),b.Ic(2,"STATUS"),b.Tb(),b.Ub(3,"mat-select",18),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc(2).partData.Active=a})),b.Ub(4,"mat-option",14),b.Ic(5,"Active"),b.Tb(),b.Ub(6,"mat-option",14),b.Ic(7,"Inactive"),b.Tb(),b.Tb(),b.Tb()}if(2&t){const t=b.fc(2);b.Cb(3),b.mc("ngModel",t.partData.Active),b.Cb(1),b.mc("value",!0),b.Cb(2),b.mc("value",!1)}}function E(t,a){if(1&t){const t=b.Vb();b.Ub(0,"div",1),b.Ub(1,"h2"),b.Ic(2),b.Tb(),b.Ub(3,"div"),b.Ub(4,"mat-form-field",2),b.Ub(5,"mat-label"),b.Ic(6,"Model Id"),b.Tb(),b.Ub(7,"input",3),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().partData.modelId=a})),b.Tb(),b.Tb(),b.Ub(8,"mat-form-field",2),b.Ub(9,"mat-label"),b.Ic(10,"Assembly Id"),b.Tb(),b.Ub(11,"input",4),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().partData.assemblyid=a})),b.Tb(),b.Gc(12,h,2,0,"mat-error",5),b.Tb(),b.Ub(13,"mat-form-field",2),b.Ub(14,"mat-label"),b.Ic(15,"Assembly Name"),b.Tb(),b.Ub(16,"input",6),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().partData.assemblyName=a})),b.Tb(),b.Gc(17,g,2,0,"mat-error",5),b.Tb(),b.Ub(18,"mat-form-field",2),b.Ub(19,"mat-label"),b.Ic(20,"Figure No"),b.Tb(),b.Ub(21,"input",7),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().partData.figNo=a})),b.Tb(),b.Gc(22,f,2,0,"mat-error",5),b.Tb(),b.Ub(23,"mat-checkbox",8),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().partData.IsSubAssembly=a})),b.Ic(24,"Is SubAssembly"),b.Tb(),b.Tb(),b.Ub(25,"div"),b.Gc(26,p,5,3,"mat-form-field",9),b.Gc(27,T,5,2,"mat-form-field",9),b.Gc(28,A,5,2,"mat-form-field",9),b.Gc(29,U,5,2,"mat-form-field",9),b.Gc(30,y,8,3,"mat-form-field",9),b.Tb(),b.Ub(31,"div",10),b.Ub(32,"button",11),b.Ic(33,"Cancel"),b.Tb(),b.Ub(34,"button",11),b.Ic(35,"Save"),b.Tb(),b.Ub(36,"button",12),b.Ic(37,"Add Parts"),b.Tb(),b.Tb(),b.Tb()}if(2&t){const t=b.fc();b.Cb(2),b.Lc("Quardinates X,Y(",t.data.x,",",t.data.y,",9)"),b.Cb(5),b.mc("ngModel",t.partData.modelId)("readonly",!0),b.Cb(4),b.mc("ngModel",t.partData.assemblyid),b.Cb(1),b.mc("ngIf",!t.partData.assemblyid),b.Cb(4),b.mc("ngModel",t.partData.assemblyName),b.Cb(1),b.mc("ngIf",!t.partData.assemblyName),b.Cb(4),b.mc("ngModel",t.partData.figNo),b.Cb(1),b.mc("ngIf",!t.partData.assemblyName),b.Cb(1),b.mc("checked",t.partData.IsSubAssembly)("ngModel",t.partData.IsSubAssembly),b.Cb(3),b.mc("ngIf","true"==t.partData.IsSubAssembly||t.subAssemlyData),b.Cb(1),b.mc("ngIf",t.partData.IsSubAssembly&&(!t.subAssemlyData||t.subAssemlyData[0])),b.Cb(1),b.mc("ngIf",t.partData.IsSubAssembly&&t.partData.assemblyid&&(!t.subAssemlyData||t.subAssemlyData[0])),b.Cb(1),b.mc("ngIf",t.partData.IsSubAssembly&&t.partData.assemblyid&&(!t.subAssemlyData||t.subAssemlyData[0])),b.Cb(1),b.mc("ngIf",t.partData.assemblyid),b.Cb(2),b.mc("mat-dialog-close",!1),b.Cb(2),b.mc("mat-dialog-close",!1),b.Cb(2),b.mc("disabled",(t.partData.assemblyid||t.partData.assemblyName)&&t.partData.IsSubAssembly&&(!t.partData.subAssemblyId||!t.partData.subAssemDesc||!t.partData.subassemblygrp))("mat-dialog-close",t.partData)}}function P(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter Part NO"),b.Tb())}function N(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter Part Name"),b.Tb())}function O(t,a){1&t&&(b.Ub(0,"mat-error"),b.Ic(1,"Enter the Price"),b.Tb())}function _(t,a){if(1&t&&(b.Ub(0,"button",12),b.Ic(1,"Update"),b.Tb()),2&t){const t=b.fc(2);b.mc("disabled",!t.subPartData.PART_NO||!t.subPartData.PART_DESC)("mat-dialog-close",t.subPartData)}}function R(t,a){if(1&t&&(b.Ub(0,"button",12),b.Ic(1,"ADD"),b.Tb()),2&t){const t=b.fc(2);b.mc("disabled",!t.subPartData.PART_NO||!t.subPartData.PART_DESC)("mat-dialog-close",t.subPartData)}}function x(t,a){if(1&t){const t=b.Vb();b.Ub(0,"div",1),b.Ub(1,"h2"),b.Ic(2),b.Tb(),b.Ub(3,"div"),b.Ub(4,"mat-form-field",2),b.Ub(5,"label"),b.Ic(6,"REF NO"),b.Tb(),b.Ub(7,"input",19),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().subPartData.REF_NO=a})),b.Tb(),b.Tb(),b.Ub(8,"mat-form-field",2),b.Ub(9,"label"),b.Ic(10,"PART NO"),b.Tb(),b.Ub(11,"input",19),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().subPartData.PART_NO=a})),b.Tb(),b.Gc(12,P,2,0,"mat-error",5),b.Tb(),b.Ub(13,"mat-form-field",2),b.Ub(14,"label"),b.Ic(15,"PART NAME"),b.Tb(),b.Ub(16,"input",19),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().subPartData.PART_DESC=a})),b.Tb(),b.Gc(17,N,2,0,"mat-error",5),b.Tb(),b.Ub(18,"mat-form-field",2),b.Ub(19,"label"),b.Ic(20,"QV"),b.Tb(),b.Ub(21,"input",20),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().subPartData.QV=a})),b.Tb(),b.Tb(),b.Ub(22,"mat-form-field",2),b.Ub(23,"label"),b.Ic(24,"NDP"),b.Tb(),b.Ub(25,"input",21),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().subPartData.NDP=a})),b.Tb(),b.Gc(26,O,2,0,"mat-error",5),b.Tb(),b.Ub(27,"mat-form-field",2),b.Ub(28,"label"),b.Ic(29,"MOQ"),b.Tb(),b.Ub(30,"input",22),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().subPartData.MOQ=a})),b.Tb(),b.Tb(),b.Ub(31,"mat-form-field",2),b.Ub(32,"label"),b.Ic(33,"REMARKS"),b.Tb(),b.Ub(34,"input",20),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().subPartData.REMARKS=a})),b.Tb(),b.Tb(),b.Ub(35,"mat-form-field",2),b.Ub(36,"label"),b.Ic(37,"STATUS"),b.Tb(),b.Ub(38,"mat-select",18),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().subPartData.ACTIVE=a})),b.Ub(39,"mat-option",14),b.Ic(40,"Active"),b.Tb(),b.Ub(41,"mat-option",14),b.Ic(42,"Inactive"),b.Tb(),b.Tb(),b.Tb(),b.Tb(),b.Ub(43,"div",10),b.Ub(44,"button",11),b.Ic(45,"Cancel"),b.Tb(),b.Gc(46,_,2,2,"button",23),b.Ub(47,"button",24),b.bc("click",(function(){return b.xc(t),b.fc().checkCurrentParts()})),b.Ic(48,"Validate"),b.Tb(),b.Gc(49,R,2,2,"button",23),b.Tb(),b.Tb()}if(2&t){const t=b.fc();b.Cb(2),b.Mc("Quardinates X,Y(",t.data.x,",",t.data.y,",",t.data.PS,")"),b.Cb(5),b.mc("ngModel",t.subPartData.REF_NO),b.Cb(4),b.mc("ngModel",t.subPartData.PART_NO),b.Cb(1),b.mc("ngIf",!t.subPartData.PART_NO),b.Cb(4),b.mc("ngModel",t.subPartData.PART_DESC),b.Cb(1),b.mc("ngIf",!t.subPartData.PART_DESC),b.Cb(4),b.mc("ngModel",t.subPartData.QV),b.Cb(4),b.mc("readonly",t.isReadonly)("ngModel",t.subPartData.NDP),b.Cb(1),b.mc("ngIf",!t.subPartData.NDP),b.Cb(4),b.mc("readonly",t.isReadonly)("ngModel",t.subPartData.MOQ),b.Cb(4),b.mc("ngModel",t.subPartData.REMARKS),b.Cb(4),b.mc("ngModel",t.subPartData.ACTIVE),b.Cb(1),b.mc("value",!0),b.Cb(2),b.mc("value",!1),b.Cb(3),b.mc("mat-dialog-close",!1),b.Cb(2),b.mc("ngIf","Y"==t.data.isEdt),b.Cb(1),b.mc("disabled",!(t.subPartData.PART_NO&&t.subPartData.PART_DESC||t.Isexist)),b.Cb(2),b.mc("ngIf","N"==t.data.isEdt&&!t.Isexist)}}function v(t,a){if(1&t){const t=b.Vb();b.Ub(0,"div",1),b.Ub(1,"div"),b.Ub(2,"mat-form-field",2),b.Ub(3,"mat-label"),b.Ic(4,"MODEL ID"),b.Tb(),b.Ub(5,"input",25),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().ModelData.MODEL_ID=a})),b.Tb(),b.Tb(),b.Ub(6,"mat-form-field",2),b.Ub(7,"mat-label"),b.Ic(8,"DESCRIPTION"),b.Tb(),b.Ub(9,"input",26),b.bc("ngModelChange",(function(a){return b.xc(t),b.fc().ModelData.MODEL_NAME=a})),b.Tb(),b.Tb(),b.Tb(),b.Ub(10,"div",10),b.Ub(11,"button",11),b.Ic(12,"Cancel"),b.Tb(),b.Ub(13,"button",27),b.bc("click",(function(a){return b.xc(t),b.fc().save(a)})),b.Ic(14,"Save"),b.Tb(),b.Tb(),b.Tb()}if(2&t){const t=b.fc();b.Cb(5),b.mc("ngModel",t.ModelData.MODEL_ID),b.Cb(4),b.mc("ngModel",t.ModelData.MODEL_NAME),b.Cb(2),b.mc("mat-dialog-close",!1)}}let G=(()=>{class t{constructor(t,a,e,s){this.dialogRef=t,this.data=a,this.masterdata=e,this.toaster=s,this.partData={modelId:"",assemblyid:"",assemblyName:"",IsSubAssembly:!1,series:"",subAssemblyId:null,subAssemDesc:null,subassemblygrp:null,figNo:null,Active:!0},this.subPartData={REF_NO:1,COORDINATES:"",PART_NO:"",PART_DESC:"",QV:0,NDP:0,MRP:0,MOQ:1,ORD:0,ACTIVE:"true",x:"",y:"",REMARKS:"",FIG_NO:""},this.ModelData={MODEL_ID:null,MODEL_NAME:null,SERIES:null,ACTIVE:!1,IS_ACC:!1},this.Isexist=!1}ngOnInit(){"N"==this.data.isEdt?(this.subPartData.x=this.data.x,this.subPartData.y=this.data.y,this.series=this.data.series,this.modelID=this.data.modelId,this.isReadonly=!1,this.subPartData.COORDINATES=this.data.x+","+this.data.y+","+this.data.PS,this.subPartData.MRP=0,this.subPartData.REMARKS=null,this.subPartData.FIG_NO=null,this.getMopedDetail()):"CatY"==this.data.isEdt?(this.partData=this.data.editData,this.series=this.data.series,console.log("nn123",this.partData),this.getMopedDetail(),1==this.subPartData.IS_SUBASSEMBLY_ID&&this.getSubassemDetail()):(this.subPartData=this.data.editData,this.isReadonly=!0),this.curntdata=this.data.curLst,console.log("currentdata",this.curntdata)}getMopedDetail(){this.masterdata.getReq("","api/Catalouge/GetVehCoordinatesbySeries?series="+this.series).subscribe(t=>{t&&200==t.statusCode&&(this.assemlyData=t.data,this.assemblePart=t.data.coordinates,"CatY"!=this.data.isEdt?this.getassignedData():this.geteditdata())},t=>{this.toaster.errorToastr(t.statusMessage)})}getassignedData(){this.assemlyData?(this.getmatchData(this.subPartData.x,this.subPartData.y),this.partData.modelId=this.modelID,this.coordMatch.length>0?(this.partData.modelId=this.coordMatch[0].MODEL_ID,this.partData.assemblyid=this.coordMatch[0].ASSEMBLY_ID,this.partData.assemblyName=this.coordMatch[0].ASSEMBLY_NAME,this.partData.IsSubAssembly=this.coordMatch[0].IS_SUBASSEMBLY_ID,this.partData.figNo=this.coordMatch[0].FIG_NO,this.partData.series=this.series,1==this.coordMatch[0].IS_SUBASSEMBLY_ID&&this.getSubassemDetail()):this.partData.modelId=this.modelID,this.partData.modelId=this.modelID):this.partData.modelId=this.modelID}geteditdata(){this.partData=this.assemblePart.filter(t=>t.MODEL_ID==this.partData.MODEL_ID&&t.ASSEMBLY_ID==this.partData.ASSEMBLY_ID),console.log("asdasdad",this.partData),this.partData.modelId=this.partData[0].MODEL_ID,this.partData.assemblyid=this.partData[0].ASSEMBLY_ID,this.partData.assemblyName=this.partData[0].ASSEMBLY_NAME,this.partData.IsSubAssembly=this.partData[0].IS_SUBASSEMBLY_ID,this.partData.figNo=this.partData[0].FIG_NO,this.partData.series=this.series,this.partData.Active=this.partData[0].ACTIVE,this.subPartData.COORDINATES=this.partData[0].COORDINATES,1==this.partData[0].IS_SUBASSEMBLY_ID&&this.getSubassemDetail()}getmatchData(t,a){let e=[],s=t+5,b=a+5,r=a-5,n=[];for(var i=t-5;i<s;i++){for(var c=r;c<b;c++){let t={x:i,y:c};if(this.coordMatch=this.filterItemsOfType(i,c),n.push(t),e=n,this.coordMatch.length>0)return!0}if(this.coordMatch.length>0)return!0}}filterItemsOfType(t,a){[t,a].join();let e=[];return e=this.assemlyData.coordinates.filter(e=>e.COORDINATES==[t,a,e.COORDINATES.split(",")[2]].join()),e}getSubassemDetail(){this.masterdata.getReq("","api/Catalouge/GetCoordinatesforSubAssembly?series="+this.series+"&ASSEMBLY_ID="+this.partData.assemblyid).subscribe(t=>{t&&200==t.statusCode&&(this.subAssemlyData=t.data,this.SubAssemgrp=this.subAssemlyData[0].ASSEMBLY_GROUP)},t=>{this.toaster.errorToastr(t.statusMessage)})}save(){this.ModelData.SERIES=this.series,this.ModelData.ACTIVE=!0,this.ModelData.IS_ACC=!1,this.masterdata.post(this.ModelData,"api/CatalougeMaster/AddUpdateModel").subscribe(t=>{200==t.statusCode?(this.toaster.successToastr(t.data),this.ModelData.MODEL_ID=null,this.ModelData.MODEL_NAME=null,this.dialogRef.close()):this.toaster.errorToastr(t.data)},t=>{this.toaster.errorToastr(t.statusMessage)})}onchange(t){this.partData.subAssemblyId=t.value.ASSEMBLY_ID,this.partData.subAssemDesc=t.value.ASSEMBLY_NAME,this.partData.figNo=t.value.FIG_NO,this.partData.subassemblygrp=this.SubAssemgrp}checkCurrentParts(){let t=this.curntdata;t=t.filter(t=>t.PART_NO==this.subPartData.PART_NO&&t.REF_NO==this.subPartData.REF_NO),t.length>0?(this.toaster.infoToastr("Part No Already Existing"),this.Isexist=!0):this.Isexist=!1}}return t.\u0275fac=function(a){return new(a||t)(b.Ob(s.g),b.Ob(s.a),b.Ob(r.a),b.Ob(n.a))},t.\u0275cmp=b.Ib({type:t,selectors:[["app-catalogue-popup"]],decls:3,vars:3,consts:[["class","pd-20",4,"ngIf"],[1,"pd-20"],[1,"example-full-width","m-10"],["matInput","","placeholder","Model Id","required","true",3,"ngModel","readonly","ngModelChange"],["matInput","","placeholder","Id","required","true",3,"ngModel","ngModelChange"],[4,"ngIf"],["matInput","","placeholder","Desc","required","true",3,"ngModel","ngModelChange"],["matInput","","placeholder","figno","required","true",3,"ngModel","ngModelChange"],[3,"checked","ngModel","ngModelChange"],["class","example-full-width m-10",4,"ngIf"],[1,"cntr"],["mat-raised-button","",1,"m-10",3,"mat-dialog-close"],["mat-raised-button","","color","primary",3,"disabled","mat-dialog-close"],["name","SubAssembly","formControlName","SubAss","placeholder","Select SubAssembly","required","",3,"ngModel","ngModelChange","selectionChange"],[3,"value"],[3,"value",4,"ngFor","ngForOf"],["matInput","","placeholder","Sid","required","true",3,"ngModel","ngModelChange"],["matInput","","placeholder","SubDesc","required","true",3,"ngModel","ngModelChange"],["matInput","","name","Status",3,"ngModel","ngModelChange"],["matInput","","required","true",3,"ngModel","ngModelChange"],["matInput","",3,"ngModel","ngModelChange"],["matInput","","required","true",3,"readonly","ngModel","ngModelChange"],["matInput","",3,"readonly","ngModel","ngModelChange"],["mat-raised-button","","color","primary",3,"disabled","mat-dialog-close",4,"ngIf"],["mat-raised-button","","color","primary",3,"disabled","click"],["matInput","","placeholder","Model ID","required","true",3,"ngModel","ngModelChange"],["matInput","","placeholder","Part NO","required","true",3,"ngModel","ngModelChange"],["mat-raised-button","","color","primary",3,"click"]],template:function(t,a){1&t&&(b.Gc(0,E,38,21,"div",0),b.Gc(1,x,50,22,"div",0),b.Gc(2,v,15,3,"div",0)),2&t&&(b.mc("ngIf","main"==a.data.type),b.Cb(1),b.mc("ngIf","sub"==a.data.type),b.Cb(1),b.mc("ngIf","AddModel"==a.data.type))},directives:[i.n,c.c,c.f,o.b,l.c,l.u,l.n,l.q,d.a,m.b,s.d,c.b,u.a,l.g,D.l,i.m],styles:[".cntr[_ngcontent-%COMP%]{text-align:center;padding:15px}.m-10[_ngcontent-%COMP%]{margin:10px}.pd-20[_ngcontent-%COMP%]{padding:20px}"]}),t})()}}]);