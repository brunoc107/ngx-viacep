"use strict";(self.webpackChunkngx_viacep_showcase=self.webpackChunkngx_viacep_showcase||[]).push([[318],{6065:(ht,F,c)=>{c.d(F,{l:()=>M});var s=c(8830);let M=(()=>{var p;class h{constructor(){}ngOnInit(){}}return(p=h).\u0275fac=function(m){return new(m||p)},p.\u0275cmp=s.Xpm({type:p,selectors:[["app-address-card"]],inputs:{endereco:"endereco"},decls:6,vars:5,consts:[[1,"card"],[1,"card-body"],[1,"card-title"],[1,"card-subtitle","mb-2","text-muted"]],template:function(m,y){1&m&&(s.TgZ(0,"div",0)(1,"div",1)(2,"h5",2),s._uU(3),s.qZA(),s.TgZ(4,"h6",3),s._uU(5),s.qZA()()()),2&m&&(s.xp6(3),s.Oqu(y.endereco.logradouro),s.xp6(2),s.HOy(" ",y.endereco.bairro," \xb7 ",y.endereco.cep," ",y.endereco.localidade,", ",y.endereco.uf," "))},styles:[".card[_ngcontent-%COMP%]{margin-bottom:10px}"]}),h})()},9267:(ht,F,c)=>{c.d(F,{m:()=>p});var s=c(6814),M=c(8830);let p=(()=>{var h;class v{}return(h=v).\u0275fac=function(y){return new(y||h)},h.\u0275mod=M.oAB({type:h}),h.\u0275inj=M.cJS({imports:[s.ez]}),v})()},285:(ht,F,c)=>{c.d(F,{Fj:()=>I,u5:()=>_n,JJ:()=>Tt,On:()=>st});var s=c(8830),M=c(6814),p=c(5253),h=c(4699),v=c(1280),m=c(6124),y=c(7755);function x(e,t){return new h.y(r=>{const n=e.length;if(0===n)return void r.complete();const o=new Array(n);let i=0,a=0;for(let l=0;l<n;l++){const f=(0,p.D)(e[l]);let D=!1;r.add(f.subscribe({next:_=>{D||(D=!0,a++),o[l]=_},error:_=>r.error(_),complete:()=>{i++,(i===n||!D)&&(a===n&&r.next(t?t.reduce((_,mn,yn)=>(_[mn]=o[yn],_),{}):o),r.complete())}}))}})}let ft=(()=>{var e;class t{constructor(n,o){this._renderer=n,this._elementRef=o,this.onChange=i=>{},this.onTouched=()=>{}}setProperty(n,o){this._renderer.setProperty(this._elementRef.nativeElement,n,o)}registerOnTouched(n){this.onTouched=n}registerOnChange(n){this.onChange=n}setDisabledState(n){this.setProperty("disabled",n)}}return(e=t).\u0275fac=function(n){return new(n||e)(s.Y36(s.Qsj),s.Y36(s.SBq))},e.\u0275dir=s.lG2({type:e}),t})(),b=(()=>{var e;class t extends ft{}return(e=t).\u0275fac=function(){let r;return function(o){return(r||(r=s.n5z(e)))(o||e)}}(),e.\u0275dir=s.lG2({type:e,features:[s.qOj]}),t})();const g=new s.OlP("NgValueAccessor"),ve={provide:g,useExisting:(0,s.Gpc)(()=>I),multi:!0},Ve=new s.OlP("CompositionEventMode");let I=(()=>{var e;class t extends ft{constructor(n,o,i){super(n,o),this._compositionMode=i,this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function Ce(){const e=(0,M.q)()?(0,M.q)().getUserAgent():"";return/android (\d+)/.test(e.toLowerCase())}())}writeValue(n){this.setProperty("value",n??"")}_handleInput(n){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(n)}_compositionStart(){this._composing=!0}_compositionEnd(n){this._composing=!1,this._compositionMode&&this.onChange(n)}}return(e=t).\u0275fac=function(n){return new(n||e)(s.Y36(s.Qsj),s.Y36(s.SBq),s.Y36(Ve,8))},e.\u0275dir=s.lG2({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(n,o){1&n&&s.NdJ("input",function(a){return o._handleInput(a.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(a){return o._compositionEnd(a.target.value)})},features:[s._Bn([ve]),s.qOj]}),t})();const u=new s.OlP("NgValidators"),V=new s.OlP("NgAsyncValidators");function Mt(e){return null!=e}function bt(e){return(0,s.QGY)(e)?(0,p.D)(e):e}function Et(e){let t={};return e.forEach(r=>{t=null!=r?{...t,...r}:t}),0===Object.keys(t).length?null:t}function Ot(e,t){return t.map(r=>r(e))}function wt(e){return e.map(t=>function De(e){return!e.validate}(t)?t:r=>t.validate(r))}function W(e){return null!=e?function Ft(e){if(!e)return null;const t=e.filter(Mt);return 0==t.length?null:function(r){return Et(Ot(r,t))}}(wt(e)):null}function $(e){return null!=e?function St(e){if(!e)return null;const t=e.filter(Mt);return 0==t.length?null:function(r){return function me(...e){if(1===e.length){const t=e[0];if((0,v.k)(t))return x(t,null);if((0,y.K)(t)&&Object.getPrototypeOf(t)===Object.prototype){const r=Object.keys(t);return x(r.map(n=>t[n]),r)}}if("function"==typeof e[e.length-1]){const t=e.pop();return x(e=1===e.length&&(0,v.k)(e[0])?e[0]:e,null).pipe((0,m.U)(r=>t(...r)))}return x(e,null)}(Ot(r,t).map(bt)).pipe((0,m.U)(Et))}}(wt(e)):null}function Nt(e,t){return null===e?[t]:Array.isArray(e)?[...e,t]:[e,t]}function z(e){return e?Array.isArray(e)?e:[e]:[]}function k(e,t){return Array.isArray(e)?e.includes(t):e===t}function xt(e,t){const r=z(t);return z(e).forEach(o=>{k(r,o)||r.push(o)}),r}function It(e,t){return z(t).filter(r=>!k(e,r))}class Pt{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=W(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=$(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t=void 0){this.control&&this.control.reset(t)}hasError(t,r){return!!this.control&&this.control.hasError(t,r)}getError(t,r){return this.control?this.control.getError(t,r):null}}class d extends Pt{get formDirective(){return null}get path(){return null}}class A extends Pt{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}class kt{constructor(t){this._cd=t}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}}let Tt=(()=>{var e;class t extends kt{constructor(n){super(n)}}return(e=t).\u0275fac=function(n){return new(n||e)(s.Y36(A,2))},e.\u0275dir=s.lG2({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,o){2&n&&s.ekj("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},features:[s.qOj]}),t})();const S="VALID",H="INVALID",O="PENDING",N="DISABLED";function U(e){return null!=e&&!Array.isArray(e)&&"object"==typeof e}class jt{constructor(t,r){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(t),this._assignAsyncValidators(r)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get valid(){return this.status===S}get invalid(){return this.status===H}get pending(){return this.status==O}get disabled(){return this.status===N}get enabled(){return this.status!==N}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(xt(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(xt(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(It(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(It(t,this._rawAsyncValidators))}hasValidator(t){return k(this._rawValidators,t)}hasAsyncValidator(t){return k(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){this.touched=!0,this._parent&&!t.onlySelf&&this._parent.markAsTouched(t)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(t=>t.markAllAsTouched())}markAsUntouched(t={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}markAsDirty(t={}){this.pristine=!1,this._parent&&!t.onlySelf&&this._parent.markAsDirty(t)}markAsPristine(t={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(r=>{r.markAsPristine({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}markAsPending(t={}){this.status=O,!1!==t.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!t.onlySelf&&this._parent.markAsPending(t)}disable(t={}){const r=this._parentMarkedDirty(t.onlySelf);this.status=N,this.errors=null,this._forEachChild(n=>{n.disable({...t,onlySelf:!0})}),this._updateValue(),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors({...t,skipPristineCheck:r}),this._onDisabledChange.forEach(n=>n(!0))}enable(t={}){const r=this._parentMarkedDirty(t.onlySelf);this.status=S,this._forEachChild(n=>{n.enable({...t,onlySelf:!0})}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors({...t,skipPristineCheck:r}),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(t){this._parent&&!t.onlySelf&&(this._parent.updateValueAndValidity(t),t.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===S||this.status===O)&&this._runAsyncValidator(t.emitEvent)),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.updateValueAndValidity(t)}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(r=>r._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?N:S}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t){if(this.asyncValidator){this.status=O,this._hasOwnPendingAsyncValidator=!0;const r=bt(this.asyncValidator(this));this._asyncValidationSubscription=r.subscribe(n=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(n,{emitEvent:t})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(t,r={}){this.errors=t,this._updateControlsErrors(!1!==r.emitEvent)}get(t){let r=t;return null==r||(Array.isArray(r)||(r=r.split(".")),0===r.length)?null:r.reduce((n,o)=>n&&n._find(o),this)}getError(t,r){const n=r?this.get(r):this;return n&&n.errors?n.errors[t]:null}hasError(t,r){return!!this.getError(t,r)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(t)}_initObservables(){this.valueChanges=new s.vpe,this.statusChanges=new s.vpe}_calculateStatus(){return this._allControlsDisabled()?N:this.errors?H:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(O)?O:this._anyControlsHaveStatus(H)?H:S}_anyControlsHaveStatus(t){return this._anyControls(r=>r.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t={}){this.pristine=!this._anyControlsDirty(),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}_updateTouched(t={}){this.touched=this._anyControlsTouched(),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){U(t)&&null!=t.updateOn&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=function we(e){return Array.isArray(e)?W(e):e||null}(this._rawValidators)}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=function Fe(e){return Array.isArray(e)?$(e):e||null}(this._rawAsyncValidators)}}const w=new s.OlP("CallSetDisabledState",{providedIn:"root",factory:()=>R}),R="always";function G(e,t,r=R){(function tt(e,t){const r=function Gt(e){return e._rawValidators}(e);null!==t.validator?e.setValidators(Nt(r,t.validator)):"function"==typeof r&&e.setValidators([r]);const n=function Bt(e){return e._rawAsyncValidators}(e);null!==t.asyncValidator?e.setAsyncValidators(Nt(n,t.asyncValidator)):"function"==typeof n&&e.setAsyncValidators([n]);const o=()=>e.updateValueAndValidity();q(t._rawValidators,o),q(t._rawAsyncValidators,o)})(e,t),t.valueAccessor.writeValue(e.value),(e.disabled||"always"===r)&&t.valueAccessor.setDisabledState?.(e.disabled),function Ge(e,t){t.valueAccessor.registerOnChange(r=>{e._pendingValue=r,e._pendingChange=!0,e._pendingDirty=!0,"change"===e.updateOn&&Lt(e,t)})}(e,t),function xe(e,t){const r=(n,o)=>{t.valueAccessor.writeValue(n),o&&t.viewToModelUpdate(n)};e.registerOnChange(r),t._registerOnDestroy(()=>{e._unregisterOnChange(r)})}(e,t),function Be(e,t){t.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,"blur"===e.updateOn&&e._pendingChange&&Lt(e,t),"submit"!==e.updateOn&&e.markAsTouched()})}(e,t),function Ne(e,t){if(t.valueAccessor.setDisabledState){const r=n=>{t.valueAccessor.setDisabledState(n)};e.registerOnDisabledChange(r),t._registerOnDestroy(()=>{e._unregisterOnDisabledChange(r)})}}(e,t)}function q(e,t){e.forEach(r=>{r.registerOnValidatorChange&&r.registerOnValidatorChange(t)})}function Lt(e,t){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function Wt(e,t){const r=e.indexOf(t);r>-1&&e.splice(r,1)}function $t(e){return"object"==typeof e&&null!==e&&2===Object.keys(e).length&&"value"in e&&"disabled"in e}const zt=class extends jt{constructor(t=null,r,n){super(function Q(e){return(U(e)?e.validators:e)||null}(r),function K(e,t){return(U(t)?t.asyncValidators:e)||null}(n,r)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(t),this._setUpdateStrategy(r),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),U(r)&&(r.nonNullable||r.initialValueIsDefault)&&(this.defaultValue=$t(t)?t.value:t)}setValue(t,r={}){this.value=this._pendingValue=t,this._onChange.length&&!1!==r.emitModelToViewChange&&this._onChange.forEach(n=>n(this.value,!1!==r.emitViewToModelChange)),this.updateValueAndValidity(r)}patchValue(t,r={}){this.setValue(t,r)}reset(t=this.defaultValue,r={}){this._applyFormState(t),this.markAsPristine(r),this.markAsUntouched(r),this.setValue(this.value,r),this._pendingChange=!1}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){Wt(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){Wt(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(t){$t(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}},je={provide:A,useExisting:(0,s.Gpc)(()=>st)},Qt=(()=>Promise.resolve())();let st=(()=>{var e;class t extends A{constructor(n,o,i,a,l,f){super(),this._changeDetectorRef=l,this.callSetDisabledState=f,this.control=new zt,this._registered=!1,this.name="",this.update=new s.vpe,this._parent=n,this._setValidators(o),this._setAsyncValidators(i),this.valueAccessor=function rt(e,t){if(!t)return null;let r,n,o;return Array.isArray(t),t.forEach(i=>{i.constructor===I?r=i:function ke(e){return Object.getPrototypeOf(e.constructor)===b}(i)?n=i:o=i}),o||n||r||null}(0,a)}ngOnChanges(n){if(this._checkForErrors(),!this._registered||"name"in n){if(this._registered&&(this._checkName(),this.formDirective)){const o=n.name.previousValue;this.formDirective.removeControl({name:o,path:this._getPath(o)})}this._setUpControl()}"isDisabled"in n&&this._updateDisabled(n),function nt(e,t){if(!e.hasOwnProperty("model"))return!1;const r=e.model;return!!r.isFirstChange()||!Object.is(t,r.currentValue)}(n,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(n){this.viewModel=n,this.update.emit(n)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!(!this.options||!this.options.standalone)}_setUpStandalone(){G(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),this._isStandalone()}_updateValue(n){Qt.then(()=>{this.control.setValue(n,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(n){const o=n.isDisabled.currentValue,i=0!==o&&(0,s.VuI)(o);Qt.then(()=>{i&&!this.control.disabled?this.control.disable():!i&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(n){return this._parent?function j(e,t){return[...t.path,e]}(n,this._parent):[n]}}return(e=t).\u0275fac=function(n){return new(n||e)(s.Y36(d,9),s.Y36(u,10),s.Y36(V,10),s.Y36(g,10),s.Y36(s.sBO,8),s.Y36(w,8))},e.\u0275dir=s.lG2({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:["disabled","isDisabled"],model:["ngModel","model"],options:["ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[s._Bn([je]),s.qOj,s.TTD]}),t})(),Xt=(()=>{var e;class t{}return(e=t).\u0275fac=function(n){return new(n||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({}),t})(),pn=(()=>{var e;class t{}return(e=t).\u0275fac=function(n){return new(n||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[Xt]}),t})(),_n=(()=>{var e;class t{static withConfig(n){return{ngModule:t,providers:[{provide:w,useValue:n.callSetDisabledState??R}]}}}return(e=t).\u0275fac=function(n){return new(n||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[pn]}),t})()}}]);