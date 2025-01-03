import{u as He,a as Pe,b as Ie,o as $e}from"./theme.d1cfb442.js";import{r as z,a as Q,a4 as _e,e as V,c as S,C as Xe,f as xe,h as Le,x as We,H as Ye,m as Ae,l as Oe,k as Ve,J as je,p as Te,i as Ge,F as ge,a2 as K,N as ye,E as ae,a5 as U,$ as Ke,u as qe,d as Z,B as Me,w as oe,a6 as Je,V as ke,a7 as Se}from"./framework.450954f1.js";function Ue(e){const a=z(1200);Q(()=>{n(),window.addEventListener("resize",t)}),_e(()=>{window.removeEventListener("resize",t)});const t=He(n);function n(){var f;a.value=((f=e.value)==null?void 0:f.getBoundingClientRect().width)||1200}return a}const Et=V({__name:"vp-demo",props:{source:{},demos:{},path:{}},setup(e){const a=z();Ue(a);const t=e,n=S(()=>t.path.startsWith("grid-layout")),f=S(()=>{const c=Object.keys(t.demos);for(const y of c)if(y.replace("../examples/","").replace(".vue","")===t.path)return t.demos[y].default;return!1});return(c,y)=>{const d=Xe("ClientOnly");return xe(),Le(ge,null,[We("section",{ref_key:"wrapRef",ref:a,style:{width:"100%"}},[Ye(d,null,{default:Ae(()=>[f.value?(xe(),Oe(je(f.value),{key:0,class:Ve(n.value?"grid-wrap":"free-wrap")},null,8,["class"])):Te("",!0)]),_:1})],512),Ge(c.$slots,"source")],64)}}});const pe=Symbol("Scene");function Y(e,a={},t={},n={}){if(!e)return()=>null;const f=Qe(n),c={...a,...t,...f};return y=>K(e,c,y)}const Ze=/^nativeOn([A-Z]\S*)/;function Qe(e){const a={};let t=!1;Object.entries(e).forEach(([f,c])=>{{t=!0;const y=f.replace(Ze,(d,l)=>`on${l}`);a[y]=c}});const n={};return t&&(n.on=a),n.on}function W(e,a,t=1/0){return Math.max(Math.min(e,t),a)}function ue(...e){}function ze(e){if(e){if(!e.getElementById("free-dom-style-el")){const a=e.createElement("style");a.id="free-dom-style-el",a.innerHTML=".free-dom-transparent-selection *::selection {all: inherit;}",e.getElementsByTagName("head")[0].appendChild(a)}e.body&&e.body.classList.add("free-dom-transparent-selection")}}function ve(e){if(!e)return;e.body&&e.body.classList.remove("free-dom-transparent-selection");const a=e.getSelection();a&&a.removeAllRanges()}function et(e,a,t,n,f){const{margin:c,cols:y,rowHeight:d,maxRows:l}=e,p=tt(e);let o=Math.round((a-c[0])/(p+c[0])),i=Math.round(t-c[1]/(d+c[1]));return o=W(o,0,y-n),i=W(i,0,l-f),{x:o,y:i}}function tt(e){const{margin:a,containerPadding:t,width:n,cols:f}=e;return(n-a[0]*(f-1)-t[0]*2)/f}const nt=["xt","xc","xb","yl","yc","yr"],at=V({props:{showLine:Boolean},setup(){const e=ye(pe),a=ae(nt),t=S(()=>e.diff/e.transformScale),n=e.nodes,f=S(()=>n.filter(o=>!o.node.selected)),c=U({xt:{show:!1,pos:0},xc:{show:!1,pos:0},xb:{show:!1,pos:0},yl:{show:!1,pos:0},yc:{show:!1,pos:0},yr:{show:!1,pos:0}}),y=(o,i)=>{var k;const h=(k=n.find(N=>N.uuid===o))==null?void 0:k.node;h&&(d(),f.value.forEach(N=>{if(N.uuid===o)return;const v=l(h._rect),g=l(N.node._rect);p(v.top,g.top,i)&&(c.xt={show:!0,pos:g.top},h._rect.y=g.top),p(v.bottom,g.top,i)&&(c.xt={show:!0,pos:g.top},h._rect.y=g.top-v.height),p(v.centerY,g.centerY,i)&&(c.xc={show:!0,pos:g.centerY},h._rect.y=g.centerY-v.height/2),p(v.top,g.bottom,i)&&(c.xb={show:!0,pos:g.bottom},h._rect.y=g.bottom),p(v.bottom,g.bottom,i)&&(c.xb={show:!0,pos:g.bottom},h._rect.y=g.bottom-v.height),p(v.left,g.left,i)&&(c.yl={show:!0,pos:g.left},h._rect.x=g.left),p(v.right,g.left,i)&&(c.yl={show:!0,pos:g.left},h._rect.x=g.left-v.width),p(v.centerX,g.centerX,i)&&(c.yc={show:!0,pos:g.centerX},h._rect.x=g.centerX-v.width/2),p(v.left,g.right,i)&&(c.yr={show:!0,pos:g.right},h._rect.x=g.right),p(v.right,g.right,i)&&(c.yr={show:!0,pos:g.right},h._rect.x=g.right-v.width)}))};e==null||e.on("move",y),e==null||e.on("moveup",d),_e(()=>{e==null||e.off("move"),e==null||e.off("moveup")});function d(){c.xt.show=!1,c.xc.show=!1,c.xb.show=!1,c.yl.show=!1,c.yc.show=!1,c.yr.show=!1}function l(o){return{deltaX:o.deltaX,deltaY:o.deltaY,top:o.y,bottom:o.y+o.height,left:o.x,right:o.x+o.width,width:o.width,height:o.height,centerX:o.x+o.width/2,centerY:o.y+o.height/2}}function p(o,i,h){const k=h?0:t.value;return Math.abs(o-i)<=k}return{lines:a,diff:t,lineStatus:c}},render(){const e=(t,n)=>K("div",{style:{[t.includes("x")?"top":"left"]:n.pos+"px"},class:[t.includes("x")?"vv-free-dom--xline":"vv-free-dom--yline","vv-free-dom--line"]}),a=this.showLine?this.lines.filter(t=>this.lineStatus[t].show).map(t=>e(t,this.lineStatus[t])):[];return K("div",{class:"vv-free-dom--markline"},a)}});function re(){const e=Ke(),a=typeof e.default=="function"?e.default():e.default,t=a==null?void 0:a[0];return{slots:a,only:t}}function ot(e){const a=z(NaN),t=z(NaN);function n(f,c){const y=isNaN(a.value),d=qe(e);if(!d)throw new Error("drag node does not exist");return y?{node:d,deltaX:0,deltaY:0,lastX:f,lastY:c,x:f,y:c}:{node:d,deltaX:f-a.value,deltaY:c-t.value,lastX:a.value,lastY:t.value,x:f,y:c}}return{lastX:a,lastY:t,create:n}}function rt(e){const a=z(e.x||e.modelValue.x||0),t=z(e.y||e.modelValue.y||0),n=z(0),f=z(0),c=z();Z(()=>{a.value=e.x||e.modelValue.x||0}),Z(()=>{t.value=e.y||e.modelValue.y||0});const y=(o,i)=>{e.dragStartFn(o,i)},d=(o,i)=>{a.value=i.x,t.value=i.y,n.value=i.deltaX,f.value=i.deltaY,e.dragFn(o,i)},l=(o,i)=>{const h=c.value=p(i);e.dragStopFn(o,h)};function p(o){return{node:o.node,x:a.value+o.deltaX,y:t.value+o.deltaY,deltaX:o.deltaX,deltaY:o.deltaY,lastX:a.value,lastY:t.value}}return{x:a,y:t,deltaX:n,deltaY:f,create:p,handleDragStart:y,handleDrag:d,handleDragStop:l}}let lt=0;function st(e,a,t){const n=ye(pe,void 0),f=lt++,c=S(()=>(n==null?void 0:n.handle)||t.handle),y=S(()=>(n==null?void 0:n.lockAspectRatio)||t.lockAspectRatio),d=S(()=>(n==null?void 0:n.minWidth)||t.minWidth),l=S(()=>(n==null?void 0:n.minHeight)||t.minHeight),p=S(()=>(n==null?void 0:n.disabledDrag)||t.disabledDrag),o=S(()=>(n==null?void 0:n.disabledResize)||t.disabledResize),i=S(()=>(n==null?void 0:n.disabledSelect)||t.disabledSelect),h=S(()=>(n==null?void 0:n.scale)||t.scale),k=S(()=>(n==null?void 0:n.transformScale)||t.transformScale),N=S(()=>(n==null?void 0:n.fixNonMonospaced)||t.fixNonMonospaced),v=S(()=>(n==null?void 0:n.keyboard)||t.keyboard),g=S(()=>n==null?void 0:n.manualDiff),R=S(()=>t.mask!=null?t.mask:(n==null?void 0:n.mask)==null?!0:n.mask);Q(()=>{const r=e.value;if(!r){console.warn("[free-dom] mounted failed: element not found");return}n==null||n.register(r.$el,f,a)}),Me(()=>{n==null||n.remove(f)});function b(r){return n?n.checkValid(r):!0}function m(r){return n?n.correct(r):r}return{emit:(r,F)=>{n==null||n.emit(r,f,F)},check:b,correct:m,clearSelectState:n==null?void 0:n.clearSelectState,width:n==null?void 0:n.width,height:n==null?void 0:n.height,history:n==null?void 0:n.history,scale:h,handle:c,lockAspectRatio:y,minWidth:d,minHeight:l,disabledDrag:p,disabledResize:o,disabledSelect:i,fixNonMonospaced:N,transformScale:k,keyboard:v,manualDiff:g,mask:R}}const q=z({});function we(){return{on:(n,f)=>{q.value[n]?q.value[n].push(f):q.value[n]=[f]},off:n=>{q.value[n].length=0},emit:(n,...f)=>{(q.value[n]||[]).forEach(y=>y(...f))}}}function it(e,a){const t=z(f()),n=z(c());Z(()=>{t.value=f()}),Z(()=>{n.value=c()});function f(){return e.w||e.modelValue.w||(e.autoSize?void 0:e.minWidth)}function c(){return e.h||e.modelValue.h||(e.autoSize?void 0:e.minHeight)}async function y(d,l,p){if(e.w&&e.h||e.modelValue.w&&e.modelValue.h)return;if(!a.value)return[0,0];d&&await document.fonts.ready;const{width:o,height:i}=window.getComputedStyle(a.value.$el);t.value=Math.max(Math.ceil(parseFloat(o)),l),n.value=Math.max(Math.ceil(parseFloat(i)),p)}return{width:t,height:n,syncSize:y}}function ut(e){const a=ae(e.modelValue);oe(()=>e.modelValue,()=>{a.value=e.modelValue},{deep:!0});const t=S(()=>{var u;return(e.width-c.value[0]*(n.value-1)-(((u=d.value)==null?void 0:u[0])||c.value[0])*2)/e.cols}),n=S(()=>e.cols),f=S(()=>e.rowHeight),c=S(()=>e.margin),y=S(()=>e.maxRows),d=S(()=>e.containerPadding),l=S(()=>e.minW),p=S(()=>e.minH);function o(u){return a.value.find(s=>s.i===u)}function i(){return a.value}function h(u){a.value=u}function k(u,s,w,M,E,P){if(s.static||s.y===M&&s.x===w)return u;ue(`Moving element ${s.i} to [${String(w)},${String(M)}] from [${s.x},${s.y}]`);const x=s.x,B=s.y;typeof w=="number"&&(s.x=w),typeof M=="number"&&(s.y=M),s.moved=!0;const X=R(u).filter(L=>b(L,s));return X.length>0&&P?(s.x=x,s.y=B,s.moved=!1,u):(X.forEach(L=>{ue(`Resolving collision between ${s.i} at [${s.x},${s.y}] and ${L.i} at [${L.x},${L.y}]`,L.moved,L.i),!L.moved&&(L.static?u=N(u,L,s,E):u=N(u,s,L,E))}),u)}function N(u,s,w,M){const E=s.static;if(M){M=!1;const P={x:w.x,y:Math.max(s.y-w.h,0),w:w.w,h:w.h,i:"-1"};if(!m(u,P))return ue(`Doing reverse collision on ${w.i} up to [${P.x},${P.y}].`),k(u,w,void 0,P.y,M,E)}return k(u,w,void 0,w.y+1,M,E)}function v(u,s,w){const E=k(a.value,u,s,w,!0,!e.collision);return a.value=r(E),a.value}function g(u,s,w){let M=!1;if(!e.collision){const E=a.value.filter(P=>b(P,{...u,w:s,h:w}));if(M=E.length>0,M){let P=1/0,x=1/0;E.forEach(B=>{B.x>u.x&&(P=Math.min(B.x,P)),B.y>u.y&&(x=Math.min(B.y,x))}),Number.isFinite(P)&&(u.w=P-u.x),Number.isFinite(x)&&(u.h=x-u.y)}}return M||(u.w=s,u.h=w),a.value=r([...a.value]),a.value}function R(u){return u.slice(0).sort((s,w)=>s.y>w.y||s.y===w.y&&s.x>w.x?1:s.y===w.y&&s.x===w.x?0:-1)}function b(u,s){return u.i===s.i||u.x+u.w<=s.x||u.x>=s.x+s.w||u.y+u.h<=s.y?!1:!(u.y>=s.y+s.h)}function m(u,s){for(let w=0;w<u.length;++w)if(b(u[w],s))return u[w]}function r(u){const s=u.filter(E=>E.static),w=R(u),M=new Array(u.length);return w.forEach((E,P)=>{let x=JSON.parse(JSON.stringify(E));x.static||(x=F(s,x,w),s.push(x)),M[u.indexOf(w[P])]=x,x.moved=!1}),M}function F(u,s,w){if(e.collision)for(s.y=Math.min(C(u),s.y);s.y>0&&!m(u,s);)--s.y;let M;for(;(M=m(u,s))&&e.collision;)$(w,s,M.y+M.h,"y");return s}function C(u){let s=0;return u.forEach(w=>{const M=w.y+w.h;M>s&&(s=M)}),s}function _(){var s;if(!e.autoHeight)return;const u=C(a.value);return`${u*e.rowHeight+c.value[1]*(u-1)+(((s=d.value)==null?void 0:s[1])||c.value[1])*2}px`}const I={x:"w",y:"h"};function $(u,s,w,M){const E=I[M];s[M]+=1;const P=u.findIndex(x=>x===s);for(let x=P+1;x<u.length;++x){const B=u[x];if(B.y>s.y+s.h)break;b(s,B)&&$(u,B,w+s[E],M)}s[M]=w}function D(u){a.value=[...a.value,u]}return{cellWidth:t,cols:n,rowHeight:f,margin:c,maxRows:y,containerPadding:d,minW:l,minH:p,updateDroppingItem:D,calContainerHeight:_,moveTo:v,resizeTo:g,getItem:o,getFull:i,setFull:h,normalize:r}}function ct(e,a){const{cellWidth:t,margin:n,rowHeight:f,cols:c,maxRows:y,containerPadding:d}=a,l=z(),p=z(),o=S(()=>d.value||n.value),i=S(()=>l.value?Math.round(l.value.x):Math.round(e.x*(t.value+n.value[0])+o.value[0])),h=S(()=>l.value?Math.round(l.value.y):Math.round(e.y*(f.value+n.value[1])+o.value[1])),k=S(()=>p.value?Math.round(p.value.width):Math.round(t.value*e.width+Math.max(0,e.width-1)*n.value[0])),N=S(()=>p.value?Math.round(p.value.height):Math.round(f.value*e.height+Math.max(0,e.height-1)*n.value[1])),v=S(()=>{const D=a.minW.value;return Math.round(t.value*D+Math.max(0,D-1)*n.value[0])}),g=S(()=>{const D=a.minH.value;return Math.round(f.value*D+Math.max(0,D-1)*n.value[1])}),R=S(()=>({position:"absolute",width:`${k.value}px`,height:`${N.value}px`,transform:`translate(${i.value}px, ${h.value}px)`})),b=(D,{node:u})=>{const s=u.offsetParent.getBoundingClientRect(),w=u.getBoundingClientRect();l.value={x:w.left-s.left+u.offsetParent.scrollLeft,y:w.top-s.top+u.offsetParent.scrollTop}},m=(D,u)=>{if(!l.value)throw new Error("onDrag called before onDragStart");const{deltaX:s,deltaY:w}=u,M=l.value.x+s,E=l.value.y+w;l.value={x:M,y:E};const{x:P,y:x}=I(M,E);e.dragFn(D,{x:P,y:x})},r=D=>{if(!l.value)throw new Error("onDragStop called before onDratStart");const{x:u,y:s}=l.value,{x:w,y:M}=I(u,s);l.value=void 0,e.dragEndFn(D,{x:w,y:M})},F=(D,{width:u,height:s})=>{p.value={width:u,height:s}},C=(D,u)=>{const{width:s,height:w}=u,{w:M,h:E}=$(s,w);p.value={width:s,height:w},e.resizeFn(D,{w:M,h:E})},_=(D,u)=>{p.value=void 0;const{width:s,height:w}=u,{w:M,h:E}=$(s,w);e.resizeStopFn(D,{w:M,h:E})};function I(D,u){let s=Math.round((D-n.value[0])/(t.value+n.value[0])),w=Math.round((u-n.value[1])/(f.value+n.value[1]));return s=W(s,0,c.value-e.width),w=W(w,0,y.value-e.height),{x:s,y:w}}function $(D,u){let s=Math.round((D+n.value[0])/(t.value+n.value[0])),w=Math.round((u+n.value[1])/(f.value+n.value[1]));return s=W(s,0,c.value-e.x),w=W(w,0,y.value-e.y),{w:s,h:w}}return{x:i,y:h,width:k,height:N,dragging:l,resizing:p,style:R,minWidth:v,minHeight:g,onDragStart:b,onDrag:m,onDragStop:r,onResizeStart:F,onResize:C,onResizeStop:_}}var Bt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function dt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ht(e){if(e.__esModule)return e;var a=e.default;if(typeof a=="function"){var t=function n(){if(this instanceof n){var f=[null];f.push.apply(f,arguments);var c=Function.bind.apply(a,f);return new c}return a.apply(this,arguments)};t.prototype=a.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var f=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,f.get?f:{enumerable:!0,get:function(){return e[n]}})}),t}var me={exports:{}},ce,Ce;function ft(){if(Ce)return ce;Ce=1;var e=1e3,a=e*60,t=a*60,n=t*24,f=n*7,c=n*365.25;ce=function(o,i){i=i||{};var h=typeof o;if(h==="string"&&o.length>0)return y(o);if(h==="number"&&isFinite(o))return i.long?l(o):d(o);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(o))};function y(o){if(o=String(o),!(o.length>100)){var i=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o);if(i){var h=parseFloat(i[1]),k=(i[2]||"ms").toLowerCase();switch(k){case"years":case"year":case"yrs":case"yr":case"y":return h*c;case"weeks":case"week":case"w":return h*f;case"days":case"day":case"d":return h*n;case"hours":case"hour":case"hrs":case"hr":case"h":return h*t;case"minutes":case"minute":case"mins":case"min":case"m":return h*a;case"seconds":case"second":case"secs":case"sec":case"s":return h*e;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return h;default:return}}}}function d(o){var i=Math.abs(o);return i>=n?Math.round(o/n)+"d":i>=t?Math.round(o/t)+"h":i>=a?Math.round(o/a)+"m":i>=e?Math.round(o/e)+"s":o+"ms"}function l(o){var i=Math.abs(o);return i>=n?p(o,i,n,"day"):i>=t?p(o,i,t,"hour"):i>=a?p(o,i,a,"minute"):i>=e?p(o,i,e,"second"):o+" ms"}function p(o,i,h,k){var N=i>=h*1.5;return Math.round(o/h)+" "+k+(N?"s":"")}return ce}function ht(e){t.debug=t,t.default=t,t.coerce=l,t.disable=c,t.enable=f,t.enabled=y,t.humanize=ft(),t.destroy=p,Object.keys(e).forEach(o=>{t[o]=e[o]}),t.names=[],t.skips=[],t.formatters={};function a(o){let i=0;for(let h=0;h<o.length;h++)i=(i<<5)-i+o.charCodeAt(h),i|=0;return t.colors[Math.abs(i)%t.colors.length]}t.selectColor=a;function t(o){let i,h=null,k,N;function v(...g){if(!v.enabled)return;const R=v,b=Number(new Date),m=b-(i||b);R.diff=m,R.prev=i,R.curr=b,i=b,g[0]=t.coerce(g[0]),typeof g[0]!="string"&&g.unshift("%O");let r=0;g[0]=g[0].replace(/%([a-zA-Z%])/g,(C,_)=>{if(C==="%%")return"%";r++;const I=t.formatters[_];if(typeof I=="function"){const $=g[r];C=I.call(R,$),g.splice(r,1),r--}return C}),t.formatArgs.call(R,g),(R.log||t.log).apply(R,g)}return v.namespace=o,v.useColors=t.useColors(),v.color=t.selectColor(o),v.extend=n,v.destroy=t.destroy,Object.defineProperty(v,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(k!==t.namespaces&&(k=t.namespaces,N=t.enabled(o)),N),set:g=>{h=g}}),typeof t.init=="function"&&t.init(v),v}function n(o,i){const h=t(this.namespace+(typeof i>"u"?":":i)+o);return h.log=this.log,h}function f(o){t.save(o),t.namespaces=o,t.names=[],t.skips=[];let i;const h=(typeof o=="string"?o:"").split(/[\s,]+/),k=h.length;for(i=0;i<k;i++)h[i]&&(o=h[i].replace(/\*/g,".*?"),o[0]==="-"?t.skips.push(new RegExp("^"+o.slice(1)+"$")):t.names.push(new RegExp("^"+o+"$")))}function c(){const o=[...t.names.map(d),...t.skips.map(d).map(i=>"-"+i)].join(",");return t.enable(""),o}function y(o){if(o[o.length-1]==="*")return!0;let i,h;for(i=0,h=t.skips.length;i<h;i++)if(t.skips[i].test(o))return!1;for(i=0,h=t.names.length;i<h;i++)if(t.names[i].test(o))return!0;return!1}function d(o){return o.toString().substring(2,o.toString().length-2).replace(/\.\*\?$/,"*")}function l(o){return o instanceof Error?o.stack||o.message:o}function p(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return t.enable(t.load()),t}var vt=ht;(function(e,a){a.formatArgs=n,a.save=f,a.load=c,a.useColors=t,a.storage=y(),a.destroy=(()=>{let l=!1;return()=>{l||(l=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),a.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function t(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let l;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(l=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(l[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function n(l){if(l[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+l[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const p="color: "+this.color;l.splice(1,0,p,"color: inherit");let o=0,i=0;l[0].replace(/%[a-zA-Z%]/g,h=>{h!=="%%"&&(o++,h==="%c"&&(i=o))}),l.splice(i,0,p)}a.log=console.debug||console.log||(()=>{});function f(l){try{l?a.storage.setItem("debug",l):a.storage.removeItem("debug")}catch{}}function c(){let l;try{l=a.storage.getItem("debug")}catch{}return!l&&typeof process<"u"&&"env"in process&&(l={}.DEBUG),l}function y(){try{return localStorage}catch{}}e.exports=vt(a);const{formatters:d}=e.exports;d.j=function(l){try{return JSON.stringify(l)}catch(p){return"[UnexpectedJSONParseError]: "+p.message}}})(me,me.exports);var mt=me.exports;const gt=dt(mt),te=gt("freeDom:use-mask");function yt(e,a,t,n){const f=we(),c=z(0),y=z(0),d=z(0),l=z(0),p=Ne(t),o=z(!1),i=S(()=>{const D=d.value-c.value,u=l.value-y.value;return{visibility:h.value?"visible":"hidden",border:"2px solid rgb(0,120,215)",background:"rgb(0,120,215,0.3)",position:"absolute",top:y.value+(u<0?u:0)+"px",left:c.value+(D<0?D:0)+"px",width:Math.abs(D)+"px",height:Math.abs(u)+"px",zIndex:1}}),h=z(!1),k=z(!1),N=Pe(e),v=S(()=>{var D;return(D=Ie(e))==null?void 0:D.ownerDocument}),g=S(()=>t.value.filter(D=>!(a.disabledSelect||D.node.disabledSelect)));function R(){let D;g.value.forEach(u=>{const s=u.node._rect;if(s.x==null||s.y==null||s.width==null||s.height==null)return!1;const w=s.x,M=s.y,E=w+s.width,P=M+s.height,x=b(w,M,E,P);u.node.selected=x,x&&(D=u)}),D==null||D.el.focus()}function b(D,u,s,w){const M=Math.min(c.value,d.value),E=Math.min(y.value,l.value),P=Math.max(c.value,d.value),x=Math.max(y.value,l.value);te("is selected",c.value,y.value,d.value,l.value);const B=m(M,P,D,s,Math.abs(D-s)/5),H=m(E,x,u,w,Math.abs(u-w)/5);return B&&H}function m(D,u,s,w,M){return Math.max(D,s)-Math.min(u,w)<=-M}function r(D){const u=(D.clientX-N.x.value)/a.transformScale,s=(D.clientY-N.y.value)/a.transformScale;return{x:u,y:s}}function F(D){if(a.disabledBatch)return;ze(v.value);const{x:u,y:s}=r(D);k.value=!0,c.value=u,y.value=s,d.value=u,l.value=s,document.addEventListener("mouseup",_)}function C(D){if(!k.value)return;o.value||(f.emit("batch-select","start"),o.value=!0);const{x:u,y:s}=r(D);te(d.value,u,l.value,s),!(d.value===u&&l.value===s)&&(h.value=!0,te("cal",u,0,n.width.value),d.value=W(u,0,n.width.value),l.value=W(s,0,n.height.value),te("update last",d.value,l.value),$())}function _(){ve(v.value),k.value=!1,h.value=!1,o.value=!1,d.value===c.value&&l.value===y.value||(p.push({type:"batch-select"}),setTimeout(()=>{f.emit("batch-select","end",{lastX:d.value,lastY:l.value,startX:c.value,startY:y.value}),d.value=0,l.value=0,c.value=0,y.value=0})),document.removeEventListener("mouseup",_)}function I(){return K("div",{id:"mask",style:i.value})}async function $(){R()}return{selecting:h,renderMask:I,handleMousedown:F,handleMousemove:C}}const de=z([]),pt=z({canClear:!1});function Ne(e){const a=S(()=>{var n;return(n=de.value.slice(-1)[0])==null?void 0:n.type});function t(n){de.value.push({...n,data:e})}return{state:pt,records:de,lastOperate:a,push:t}}function fe(){}const wt={userSelectHack:{type:Boolean,default:!0},startFn:{type:Function,default:fe},stopFn:{type:Function,default:fe},dragFn:{type:Function,default:fe},disabled:Boolean,scale:{type:Number,default:1}},be=V({name:"FreeDomCore",props:wt,setup(e){const a=z(!1),t=z(),n=S(()=>{var b;return((b=t.value)==null?void 0:b.$el)||t.value}),f=S(()=>{var b;return(b=n.value)==null?void 0:b.ownerDocument}),{lastX:c,lastY:y,create:d}=ot(n),l=z(NaN),p=z(NaN);let o,i;Me(()=>{f.value&&(e.userSelectHack&&ve(f.value),f.value.removeEventListener("mousemove",g),f.value.removeEventListener("mouseup",v))});function h(b){return N(b)}function k(b){v(b)}function N(b){var C,_;if(e.disabled||!b.target||!(b.target instanceof n.value.ownerDocument.defaultView.Node))return;const{x:m,y:r}=R(b),F=d(m,r);e.startFn(b,F),l.value=m,p.value=r,c.value=m,y.value=r,a.value=!0,e.userSelectHack&&ze(f.value),(C=f.value)==null||C.addEventListener("mousemove",g),(_=f.value)==null||_.addEventListener("mouseup",v)}function v(b){var m,r;if(a.value){if(!(l.value===c.value&&p.value===y.value)){const{x:F,y:C}=R(b),_=d(F,C);e.stopFn(b,_)}e.userSelectHack&&ve(f.value),a.value=!1,c.value=NaN,y.value=NaN,(m=f.value)==null||m.removeEventListener("mousemove",g),(r=f.value)==null||r.removeEventListener("mouseup",v)}}function g(b){const{x:m,y:r}=R(b),F=d(m,r);e.dragFn(b,F),c.value=m,y.value=r}function R(b){var _;const m=((_=n.value)==null?void 0:_.offsetParent)||f.value.body,r=m===m.ownerDocument.body;(!o||o!==m)&&(o=m,i=r?{left:0,top:0}:m.getBoundingClientRect());const F=(b.clientX+m.scrollLeft-i.left)/e.scale,C=(b.clientY+m.scrollTop-i.top)/e.scale;return{x:F,y:C}}return{coreRef:t,mousedownFn:h,mouseupFn:k}},render(){const{only:e}=re(),a=Y(e,{ref:t=>{this.coreRef=t}},{},{onMousedown:t=>{t.stopPropagation(),t.button===0&&this.mousedownFn(t)},onMouseup:this.mouseupFn});return typeof a=="function"?a():a}}),bt=["t","r","l","b","lt","lb","rt","rb"];function he(){}const J={dragOpts:{type:Object,default:()=>({})},width:{type:Number,default:0},height:{type:Number,default:0},scale:{type:[Boolean,Array],default:void 0},startFn:{type:Function,default:he},stopFn:{type:Function,default:he},resizeFn:{type:Function,default:he},minWidth:{type:Number,default:50},minHeight:{type:Number,default:50},lockAspectRatio:Boolean},Re=V({name:"ResizeDomCore",props:J,setup(e,{slots:a}){const t=S(()=>{const d=e.scale;return Array.isArray(d)?d:bt}),n=ae();function f(d,l,p){const{lockAspectRatio:o}=e;if(!e.minHeight&&!e.minWidth&&!o)return[d,l];if(o&&p.length===2){const i=e.width/e.height;i>1?(l=Math.max(l,e.minHeight),d=l*i):(d=Math.max(d,e.minWidth),l=d/i)}else d=Math.max(d,e.minWidth),l=Math.max(l,e.minHeight);return[d,l]}function c(d,l){return(p,{node:o,deltaX:i,deltaY:h})=>{d==="start"&&(n.value=void 0);const k=l!=="t"&&l!=="b",N=l!=="l"&&l!=="r",v=l[0],g=l[l.length-1],R=o.getBoundingClientRect();n.value=R,v==="l"&&(i=-i),g==="t"&&(h=-h);let b=e.width+(k?i:0),m=e.height+(N?h:0);p.shiftKey||([b,m]=f(b,m,l));const r=b!==e.width||m!==e.height,F=`${d}Fn`,C=typeof e[F]=="function"?e[F]:null;C&&!(d==="resize"&&!r)&&C(p,{node:o,width:b,height:m,handle:l}),d==="stop"&&(n.value=void 0)}}function y(d){return a.handler?()=>{var l;return(l=a.handler)==null?void 0:l.call(a,d)}:()=>K("i",{dataType:"handler",class:["vv-resize-dom--handler",`vv-resize-dom--handler__${d}`]})}return{dots:t,handleResize:c,renderResizehandler:y}},render(){const{slots:e}=re(),a=[...e||[],this.dots.map(t=>Y(be,{class:[this.dragOpts.disabled&&"vv-resize-dom--disabled"]},{...this.dragOpts,stopFn:this.handleResize("stop",t),startFn:this.handleResize("start",t),dragFn:this.handleResize("resize",t)})(this.renderResizehandler(t)))];return Y("div",{class:"vv-resize-dom--box"})(a)}});function T(){}const O={w:{type:Number,default:void 0},h:{type:Number,default:void 0},x:{type:Number,default:void 0},y:{type:Number,default:void 0},mask:{type:Boolean,default:void 0},modelValue:{type:Object,default:()=>({})},active:{type:Boolean,default:void 0},keyboard:Boolean,handle:{type:String,default:void 0},lockAspectRatio:Boolean,dragStartFn:{type:Function,default:T},dragStopFn:{type:Function,default:T},dragFn:{type:Function,default:T},resizeStartFn:{type:Function,default:T},resizeFn:{type:Function,default:T},resizeStopFn:{type:Function,default:T},autoSize:{type:Boolean,default:!0},minWidth:J.minWidth,minHeight:J.minHeight,disabledDrag:Boolean,disabledResize:Boolean,disabledSelect:Boolean,scale:J.scale,transformScale:{type:Number,default:1},fixNonMonospaced:Boolean},Ft=V({name:"FreeDom",props:O,emits:["update:w","update:h","update:x","update:y","update:modelValue","select"],setup(e,{emit:a,expose:t,slots:n}){const f=z(),c=z(!1);we().on("batch-select",x=>{c.value=x==="start"});const{x:d,y:l,deltaX:p,deltaY:o,create:i,handleDragStart:h,handleDrag:k,handleDragStop:N}=rt(e),{width:v,height:g,syncSize:R}=it(e,f),b=z(!1);oe(()=>e.active,x=>{typeof x=="boolean"&&(b.value=x)},{immediate:!0}),Z(()=>{a("select",b.value)});const m=U({disabledSelect:Je(e,"disabledSelect"),selected:b,_rect:U({x:d,y:l,width:v,height:g,deltaX:p,deltaY:o}),trigger:x=>{a("update:modelValue",x)},props:e}),r=st(f,m,e);$e(f,()=>{!b.value||c.value||(b.value=!1)},{ignore:[r.clearSelectState&&".vv-free-dom--draggable"]});const F=()=>{R(r.fixNonMonospaced.value,r.minWidth.value,r.minHeight.value)},C=z(!1);Q(()=>{e.autoSize&&F()});const _=S(()=>({width:`${v.value}px`,height:`${g.value}px`,transform:`translate(${d.value}px, ${l.value}px)`})),I=(x,B)=>{var L;if(!C.value)return;const H=i(B),X={x:H.x,y:H.y,width:v.value,height:g.value};(L=r.check)!=null&&L.call(r,X)&&(k(x,H),r.emit("move",r.manualDiff.value?!x.shiftKey:x.shiftKey))},$=(x,B)=>{var ee,j;if(!C.value)return;const H={x:d.value,y:l.value,width:v.value,height:g.value};((ee=r.check)==null?void 0:ee.call(r,H))||(d.value=W(d.value,0,r.width),l.value=W(l.value,0,r.height)),N(x,B),r.emit("moveup");const A=Math.round(d.value),L=Math.round(l.value),le=Math.round(v.value||0),se=Math.round(g.value||0);a("update:x",A),a("update:y",L),a("update:modelValue",{x:A,y:L,w:le,h:se}),(j=r.history)==null||j.push({type:"move-end"})},D=(x,B)=>{const H=r.handle.value;H?H.startsWith(".")?C.value=x.target.classList.contains(H.slice(1)):H.startsWith("#")?C.value=x.target.id===H.slice(1):(console.warn(`[free-dom] can not find element with ${H}`),C.value=!0):C.value=!0,C.value&&h(x,B)},u=(x,{node:B,width:H,height:X,handle:A})=>{var Fe;const L=-(H-(v.value||0)),le=-(X-(g.value||0)),se=A[0],ee=A[A.length-1];let j=d.value,ie=l.value;se==="l"&&(j+=L),ee==="t"&&(ie+=le),(Fe=r.check)!=null&&Fe.call(r,{x:j,y:ie,width:H,height:X})&&(v.value=Math.round(H),g.value=Math.round(X),d.value=Math.round(j),l.value=Math.round(ie),e.resizeFn(x,{node:B,width:H,height:X,handle:A}),r.emit("move",r.manualDiff.value?!x.shiftKey:x.shiftKey))},s=(x,B)=>{var X,A;((X=r.check)==null?void 0:X.call(r,{x:d.value,y:l.value,width:v.value,height:g.value}))||(d.value=W(d.value,0,r.width),l.value=W(l.value,0,r.height)),e.resizeStopFn(x,B),a("update:w",v.value),a("update:h",g.value),a("update:modelValue",{x:d.value,y:l.value,w:v.value,h:g.value}),r.emit("moveup"),(A=r.history)==null||A.push({type:"resize-end"})},w=(x,B)=>{var H;(H=r.clearSelectState)==null||H.call(r),b.value=!0,e.resizeStartFn(x,B)},M=()=>{const x={width:v.value,height:g.value,lockAspectRatio:r.lockAspectRatio.value,dragOpts:{disabled:r.disabledResize.value,scale:r.transformScale.value},startFn:w,resizeFn:u,stopFn:s,minHeight:r.minHeight.value,minWidth:r.minWidth.value,scale:r.scale.value};return Y(Re,{},x)(n)};function E(x){var B,H,X;r.disabledSelect.value||(x.ctrlKey?(b.value=!b.value,(B=r.history)==null||B.push({type:"select"})):b.value||((H=r.clearSelectState)==null||H.call(r),b.value=!0,(X=r.history)==null||X.push({type:"select"})))}function P(x){var X;if(r.disabledDrag.value||!r.keyboard.value)return;switch(x.preventDefault(),x.key){case"ArrowUp":o.value=-1,p.value=0;break;case"ArrowDown":o.value=1,p.value=0;break;case"ArrowLeft":p.value=-1,o.value=0;break;case"ArrowRight":p.value=1,o.value=0;break;default:p.value=0,o.value=0}d.value+=p.value,l.value+=o.value;const B={x:d.value,y:l.value,width:v.value,height:g.value};((X=r.check)==null?void 0:X.call(r,B))||(d.value=W(d.value,0,(r.width||0)-(v.value||0)),l.value=W(l.value,0,(r.height||0)-(g.value||0))),a("update:x",d.value),a("update:y",l.value),a("update:modelValue",{x:d.value,y:l.value,w:v.value,h:g.value}),r.emit("move",!0)}return t==null||t({syncSize:F}),{itemMask:r.mask,selected:b,domRef:f,style:_,reset(){r.emit("moveup")},onDragStop:$,onDrag:I,onDragStart:D,resizeNode:M,handleKeyboard:P,handleSelect:E,disabled:r.disabledDrag,scale:r.transformScale}},render(){var t;const e={startFn:this.onDragStart,stopFn:this.onDragStop,dragFn:this.onDrag,disabled:this.disabled,scale:this.scale},a=()=>this.resizeNode();return(t=Y(be,{ref:"domRef",tabindex:-1,class:["vv-free-dom--draggable",this.disabled&&"vv-free-dom--draggable__disabled",(this.active||this.selected)&&"vv-free-dom--draggable__selected",this.itemMask&&"vv-free-dom--draggable__mask"],style:this.style},e,{nativeOnMousedown:this.handleSelect,nativeOnKeydown:this.handleKeyboard,nativeOnKeyup:this.reset,onBlur:this.reset}))==null?void 0:t(a)}}),xt={diff:{type:Number,default:2},mask:O.mask,autoExpand:[Number,Boolean,Object],manualDiff:Boolean,showLine:{type:Boolean,default:!0},transformScale:{type:Number,default:1},keyboard:Boolean,disabledBatch:Boolean,handle:O.handle,width:{type:Number,default:void 0},height:{type:Number,default:void 0},minWidth:{type:Number,default:void 0},minHeight:{type:Number,default:void 0},lockAspectRatio:O.lockAspectRatio,disabledDrag:O.disabledDrag,disabledResize:O.disabledResize,disabledSelect:O.disabledSelect,scale:O.scale,fixNonMonospaced:O.fixNonMonospaced},Ct=V({name:"FreeDomWrap",props:xt,emits:["batch-select","drop","update:width","update:height"],setup(e,{emit:a}){const t=we(),n=z([]),f=Ne(n),c=z(),y=z(),d=ae(),l=S(()=>({height:y.value+"px",width:c.value+"px"}));Q(()=>{if(d.value){const{width:m,height:r}=window.getComputedStyle(d.value);c.value=e.width||Math.round(parseFloat(m))||0,y.value=e.height||Math.round(parseFloat(r))||0}}),oe([c,y,()=>n.value.length],()=>{k()});const p=S(()=>n.value.filter(m=>m.node.selected)),o=m=>{let r=e.autoExpand,F=e.autoExpand;if(typeof e.autoExpand=="object"&&(r=e.autoExpand.width,F=e.autoExpand.height),!r&&!F)return;const C=typeof r=="number"?r:10,_=typeof F=="number"?F:10,{x:I=0,width:$=0,y:D=0,height:u=0}=m.node._rect;r&&c.value&&I+$>=c.value&&(c.value+=C),F&&y.value&&D+u>=y.value&&(y.value+=_)};t.on("move",m=>{const r=p.value.find(_=>_.uuid===m);if(!r)return;e.autoExpand&&o(r);const{deltaX:F,deltaY:C}=r.node._rect;p.value.forEach(_=>{_.uuid!==m&&(_.node._rect.x+=F||0,_.node._rect.y+=C||0)})}),t.on("batch-select",(m,r)=>{m==="end"&&a("batch-select",r)});const i=z(!1),h=yt(d,e,n,{width:c,height:y});function k(){n.value.forEach(m=>{const r=e.minWidth||m.node.props.minWidth,F=e.minHeight||m.node.props.minHeight,{x:C,y:_,width:I,height:$}=R(m.node._rect,r,F);m.node._rect.x=C,m.node._rect.y=_,m.node._rect.width=I,m.node._rect.height=$,m.node.trigger({x:C,y:_,w:I,h:$})})}function N(m,r,F){n.value.push({el:m,uuid:r,node:F})}function v(m){const r=n.value.findIndex(F=>F.uuid===m);n.value.splice(r,1)}function g(m){if(!c.value||!y.value)return!1;const{x:r,y:F,width:C,height:_}=m;return r>=0&&r+C<=c.value&&F>=0&&F+_<=y.value}function R(m,r,F){let C=Math.max(m.x,0),_=Math.max(m.y,0),I=m.width,$=m.height;const D=c.value||0,u=y.value||0;return m.x+m.width>D&&(C=D-m.width,C<0&&(I=Math.max(D,r),C=0)),m.y+m.height>u&&(_=u-m.height,_<0&&($=Math.max(u,F),_=0)),{x:C,y:_,width:I,height:$}}function b(){p.value.forEach(m=>{m.node.selected=!1})}return ke(pe,U({...Se(e),nodes:n,width:c,height:y,history:f,clearSelectState:b,register:N,remove:v,checkValid:g,correct:R,on:t.on,off:t.off,emit:t.emit})),{rectRef:d,selecting:i,mask:h,history:f,wrapStyle:l}},render(){const{slots:e}=re(),a=Y(at,{},{showLine:this.showLine})(),t=[this.mask.selecting&&this.mask.renderMask(),e,a],n=Y("section",{class:"vv-free-dom--scene",style:this.wrapStyle})(t);return(c=>Y("section",{ref:"rectRef",style:"overflow: hidden;"},{},{onMousedown:this.mask.handleMousedown,onMousemove:this.mask.handleMousemove,ondrop:y=>{this.$emit("drop",y)},ondragover:y=>{y.preventDefault()}})(c))(n)}}),Ee=Symbol("gridLayoutContext"),G=()=>{},Dt={x:{type:Number,required:!0},y:{type:Number,required:!0},width:{type:Number,required:!0},height:{type:Number,required:!0},dragStartFn:{type:Function,default:G},dragFn:{type:Function,default:G},dragEndFn:{type:Function,default:G},resizeStartFn:{type:Function,default:G},resizeFn:{type:Function,default:G},resizeStopFn:{type:Function,default:G},isDraggable:Boolean,isResizable:Boolean,scale:{type:J.scale.type,default:()=>["rb"]},droppingPosition:{type:Object,default:void 0}},_t=["dragMove"],De=V({name:"GridItem",props:Dt,emits:_t,setup(e){const a=z(),t=ye(Ee);if(!t)throw new Error("TODO");Q(()=>{n()}),oe(()=>e.droppingPosition,(r,F)=>{n(F)},{deep:!0});function n(r){var I;if(!e.droppingPosition)return;const F=(I=a.value)==null?void 0:I.$el;if(!F)return;const C=r||{left:0,top:0},_=l.value&&e.droppingPosition.left!==C.left||e.droppingPosition.top!==C.top;if(!l.value)h(e.droppingPosition.evt,{node:F,deltaX:e.droppingPosition.left,deltaY:e.droppingPosition.top,x:0,y:0,lastX:0,lastY:0});else if(_){const $=e.droppingPosition.left-C.left,D=e.droppingPosition.top-C.top;k(e.droppingPosition.evt,{node:F,deltaX:$,deltaY:D,x:0,y:0,lastX:0,lastY:0})}}const{x:f,y:c,width:y,height:d,dragging:l,style:p,minWidth:o,minHeight:i,onDragStart:h,onDrag:k,onDragStop:N,onResizeStart:v,onResize:g,onResizeStop:R}=ct(e,t),b=r=>{const F={width:y.value,height:d.value,scale:e.scale,dragOpts:{disabled:!e.isResizable},minWidth:o.value,minHeight:i.value,startFn:v,resizeFn:g,stopFn:R};return Y(Re,{},F)(()=>r)};return{x:f,y:c,width:y,height:d,style:p,dragging:l,onDragStart:h,onDrag:k,onDragStop:N,onResizeStart:v,onResize:g,onResizeStop:R,dragNode:r=>{const F={class:[l.value&&"vv-grid-layout--item__draggable","vv-grid-layout--item",!e.isDraggable&&"vv-grid-layout--item__disabled"],style:p.value,ref:a},C={disabled:!e.isDraggable,startFn:h,stopFn:N,dragFn:k};return Y(be,F,C)(()=>b(r))}}},render(){const{slots:e}=re(),a=e;return this.dragNode(a)}});function Mt(e,a){const t=z(),n=z();function f(c){c.preventDefault(),c.stopPropagation();const y=c.currentTarget.getBoundingClientRect(),d=c.clientX-y.left,l=c.clientY-y.top,p={left:d,top:l,evt:c};if(t.value){if(n.value){const{left:o,top:i}=n.value;o!==d&&i!==l&&(n.value=p)}}else{t.value=Y("div",{key:a.droppingItem.i}),n.value=p;const o={cols:a.cols,margin:a.margin,maxRows:a.maxRows,rowHeight:a.rowHeight,width:a.width,containerPadding:a.containerPadding||a.margin},i=et(o,d,l,a.droppingItem.w,a.droppingItem.h);e.updateDroppingItem({...a.droppingItem,x:i.x,y:i.y,static:!1,isDraggable:!0})}}return{onDropover:f,droppingNode:t,position:n}}const kt={droppable:Boolean,droppingItem:{type:Object,default:()=>({i:"__dropping-elem__",w:1,h:1})},modelValue:{type:Array,required:!0,default:()=>[]},autoHeight:{type:Boolean,default:!0},cols:{type:Number,default:12},maxRows:{type:Number,default:1/0},minW:{type:Number,default:1},minH:{type:Number,default:1},rowHeight:{type:Number,default:150},width:{type:Number,default:1200},margin:{type:Array,default:()=>[10,10]},containerPadding:{type:Array,default:void 0},disabledDrag:Boolean,disabledResize:Boolean,collision:Boolean},St=V({name:"GridLayout",inheritAttrs:!1,props:kt,emits:["update:modelValue","dropItem"],setup(e,{emit:a}){const t=ut(U(Se(e))),n=Mt(t,e);ke(Ee,t);const f=z(null);function c(h,k=!1){const N=h.key;if(!N)return;const v=t.getItem(String(N));if(!v)return;const g=!v.static&&!e.disabledDrag,R=!v.static&&!e.disabledResize,b={x:v.x,y:v.y,width:v.w,height:v.h,isDraggable:g,isResizable:R,scale:v.scale,droppingPosition:k?n.position.value:void 0,dragEndFn:(m,r)=>{const{x:F,y:C}=r,_=t.moveTo(v,F,C);a("update:modelValue",_),f.value=null},dragStartFn:()=>{},dragFn:(m,r)=>{if(!v)return;const F={x:v.x,y:v.y,width:v.w,height:v.h},{x:C,y:_}=r;t.moveTo(v,C,_),f.value=F},resizeFn:(m,r)=>{const F={x:v.x,y:v.y,width:v.w,height:v.h};f.value=F;const{w:C,h:_}=r;t.resizeTo(v,C,_)},resizeStopFn:(m,r)=>{const{w:F,h:C}=r,_=t.resizeTo(v,F,C);a("update:modelValue",_),f.value=null}};return Y(De,{},b)({default:()=>h})}function y(){if(!f.value)return null;const{x:h,y:k,width:N,height:v}=f.value;return Y(De,{class:"vv-grid-layout--placeholder"},{x:h,y:k,width:N,height:v,move:!1})()}function d(){const h=t.getFull(),k=t.normalize(h.filter(N=>N.i!==e.droppingItem.i));t.setFull(k)}let l=0;function p(h){h.stopPropagation(),h.preventDefault();const k=t.getItem(e.droppingItem.i);d(),n.droppingNode.value=null,n.position.value=null,f.value=null,l=0,a("dropItem",k)}function o(h){h.stopPropagation(),h.preventDefault(),--l,l===0&&d()}function i(h){h.stopPropagation(),h.preventDefault(),++l}return{processItem:c,placeholder:y,onDrop:p,onDragLeave:o,onDragEnter:i,layout:t,droppingItem:n}},render(){const e={...this.$attrs.style||{},height:this.layout.calContainerHeight()},t=[...(Array.isArray(this.$attrs.class)?this.$attrs.class:[this.$attrs.class])||[],"vv-grid-layout"],n=typeof this.$slots.default=="function"?this.$slots.default():this.$slots.default||[],f=Be(n);return K("div",{class:t,style:e,onDragover:this.droppable?this.droppingItem.onDropover:ne,onDrop:this.droppable?this.onDrop:ne,onDragleave:this.droppable?this.onDragLeave:ne,onDragenter:this.droppable?this.onDragEnter:ne},[f.map(c=>(c.type===ge&&this.processItem(c),this.processItem(c))),this.droppable&&this.droppingItem.droppingNode.value&&this.processItem(this.droppingItem.droppingNode.value(),!0),this.placeholder()])}});function ne(){}function Be(e){const a=[];return e.forEach(t=>{t.type===ge&&Array.isArray(t.children)?a.push(...Be(t.children)):a.push(t)}),a}const Pt=Ct,It=St,$t=Ft;export{$t as F,It as G,Et as _,Pt as a,dt as b,Bt as c,Ht as g};