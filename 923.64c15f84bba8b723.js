"use strict";(self.webpackChunkngx_viacep_showcase=self.webpackChunkngx_viacep_showcase||[]).push([[923],{3923:(A,p,t)=>{t.r(p),t.d(p,{BuscaCepModule:()=>b});var u=t(6814),c=t(285),C=t(9267),d=t(6292),a=t(3282),m=t(1226),g=t(2413),e=t(8830),f=t(6065);function h(o,n){if(1&o&&(e.TgZ(0,"div",10),e._uU(1),e.qZA()),2&o){const s=e.oxw();e.xp6(1),e.hij(" ",s.errorMessage," ")}}function v(o,n){if(1&o&&e._UZ(0,"app-address-card",12),2&o){const s=e.oxw(2);e.Q6J("endereco",s.endereco)}}function M(o,n){if(1&o&&e.YNc(0,v,1,1,"app-address-card",11),2&o){const s=e.oxw();e.Q6J("ngIf",s.endereco)}}const B=[{path:"",component:(()=>{var o;class n{constructor(r){this.viacep=r,this.cep="",this.error=!1,this.errorMessage=""}ngOnInit(){}buscarCep(){this.endereco=null,this.error=!1,this.errorMessage="",this.viacep.buscarPorCep(this.cep).pipe((0,g.K)(r=>{switch(this.error=!0,r.getCode()){case a.rA.CEP_VAZIO:this.errorMessage="Por favor, informe o CEP :)";break;case a.rA.CEP_INVALIDO:this.errorMessage=`O CEP "${this.cep}" n\xe3o \xe9 v\xe1lido :/`;break;case a.rA.CEP_MUITO_CURTO:this.errorMessage="O CEP informado \xe9 curto demais :P";break;case a.rA.CEP_MUITO_LONGO:this.errorMessage="O CEP informado \xe9 longo demais \xac\xac";break;case a.rA.CEP_NAO_ENCONTRADO:this.errorMessage=`O CEP "${this.cep}" n\xe3o existe :(`;break;default:this.errorMessage="Erro ao buscar o CEP :O"}return m.E})).subscribe(r=>{this.endereco=r})}}return(o=n).\u0275fac=function(r){return new(r||o)(e.Y36(a.yN))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-busca-cep"]],decls:17,vars:3,consts:[[1,"container"],[1,"row"],[1,"col-sm-12","col-md-5","col-lg-4","col-xl-3"],[1,"input-group","mb-3"],["type","text","placeholder","Digite o CEP","aria-label","CEP a ser buscado","aria-describedby","button-addon2",1,"form-control",3,"ngModel","ngModelChange"],[1,"input-group-append"],["type","button","id","button-addon2",1,"btn","btn-primary",3,"click"],[1,"col-sm-12","col-md-7","col-lg-8","col-xl-9"],["class","alert alert-danger","role","alert",4,"ngIf","ngIfElse"],["addr",""],["role","alert",1,"alert","alert-danger"],[3,"endereco",4,"ngIf"],[3,"endereco"]],template:function(r,i){if(1&r&&(e.TgZ(0,"div",0)(1,"h2"),e._uU(2,"Buscar CEP"),e.qZA(),e.TgZ(3,"p"),e._uU(4," Utilize o formul\xe1rio abaixo para buscar um CEP :) "),e.qZA(),e.TgZ(5,"div",1)(6,"div",2)(7,"div",3)(8,"input",4),e.NdJ("ngModelChange",function(O){return i.cep=O}),e.qZA(),e.TgZ(9,"div",5)(10,"button",6),e.NdJ("click",function(){return i.buscarCep()}),e._uU(11,"Buscar"),e.qZA()()()(),e.TgZ(12,"div",7)(13,"div"),e.YNc(14,h,2,1,"div",8),e.YNc(15,M,1,1,"ng-template",null,9,e.W1O),e.qZA()()()()),2&r){const l=e.MAs(16);e.xp6(8),e.Q6J("ngModel",i.cep),e.xp6(6),e.Q6J("ngIf",i.error)("ngIfElse",l)}},dependencies:[u.O5,c.Fj,c.JJ,c.On,f.l]}),n})()}];let E=(()=>{var o;class n{}return(o=n).\u0275fac=function(r){return new(r||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[d.Bz.forChild(B),d.Bz]}),n})(),b=(()=>{var o;class n{}return(o=n).\u0275fac=function(r){return new(r||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[u.ez,c.u5,C.m,E]}),n})()}}]);