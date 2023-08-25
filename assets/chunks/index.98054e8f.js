import{u as me}from"./index.df365b42.js";import{h as H,j as q,a2 as ue,d as Y,g as D,E as ge,o as se,c as ye,k as we,J as be,w as xe,b as Fe,L as pe,R as _e,l as de,e as ze,r as De,F as Re,a3 as T,Q as te,H as J,a4 as ne,a1 as Ne,A as I,D as ce,X as he,a5 as Se}from"./framework.28cd1f07.js";function He(e){const a=H(1200);q(()=>{c(),window.addEventListener("resize",t)}),ue(()=>{window.removeEventListener("resize",t)});const t=me(c);function c(){var l;a.value=((l=e.value)==null?void 0:l.getBoundingClientRect().width)||1200}return a}const Ze=Y({__name:"vp-demo",props:{source:{},demos:{},path:{}},setup(e){const a=e,t=H(),c=He(t),l=D(()=>a.path.startsWith("grid-layout")),u=D(()=>({border:"1px solid black",width:l.value?"":"100%",height:l.value?"":"300px"})),v=D(()=>{const F=Object.keys(a.demos);for(const i of F)if(i.replace("../examples/","").replace(".vue","")===a.path)return a.demos[i].default;return!1});return(F,i)=>{const s=ge("ClientOnly");return se(),ye(Re,null,[we("section",{ref_key:"wrapRef",ref:t,style:{width:"100%"}},[be(s,null,{default:xe(()=>[v.value?(se(),Fe(pe(v.value),{key:0,style:_e(u.value),width:de(c)},null,8,["style","width"])):ze("",!0)]),_:1})],512),De(F.$slots,"source")],64)}}});const ae=Symbol("Scene");function B(e,a={},t={},c={}){if(!e)return()=>null;const l={...a,...t};return u=>T(e,l,u)}function X(e,a,t=1/0){return Math.max(Math.min(e,t),a)}function Z(...e){}const ke=["xt","xc","xb","yl","yc","yr"],Me=Y({props:{showLine:Boolean},setup(){const e=te(ae),a=J(ke),t=D(()=>e.diff),c=e.nodes,l=ne({xt:{show:!1,pos:0},xc:{show:!1,pos:0},xb:{show:!1,pos:0},yl:{show:!1,pos:0},yc:{show:!1,pos:0},yr:{show:!1,pos:0}}),u=s=>{var p;const m=((p=c.find(y=>y.uuid===s))==null?void 0:p.node)??{};v(),c.forEach(y=>{if(y.uuid===s)return;const d=F(m._rect),o=F(y.node._rect);i(d.top,o.top)&&(l.xt={show:!0,pos:o.top},m._rect.y=o.top),i(d.bottom,o.top)&&(l.xt={show:!0,pos:o.top},m._rect.y=o.top-d.height),i(d.centerY,o.centerY)&&(l.xc={show:!0,pos:o.centerY},m._rect.y=o.centerY-d.height/2),i(d.top,o.bottom)&&(l.xb={show:!0,pos:o.bottom},m._rect.y=o.bottom),i(d.bottom,o.bottom)&&(l.xb={show:!0,pos:o.bottom},m._rect.y=o.bottom-d.height),i(d.left,o.left)&&(l.yl={show:!0,pos:o.left},m._rect.x=o.left),i(d.right,o.left)&&(l.yl={show:!0,pos:o.left},m._rect.x=o.left-d.width),i(d.centerX,o.centerX)&&(l.yc={show:!0,pos:o.centerX},m._rect.x=o.centerX-d.width/2),i(d.left,o.right)&&(l.yr={show:!0,pos:o.right},m._rect.x=o.right),i(d.right,o.right)&&(l.yr={show:!0,pos:o.right},m._rect.x=o.right-d.width)})};e==null||e.on("move",u),e==null||e.on("moveup",v),ue(()=>{e==null||e.off("move"),e==null||e.off("moveup")});function v(){l.xt.show=!1,l.xc.show=!1,l.xb.show=!1,l.yl.show=!1,l.yc.show=!1,l.yr.show=!1}function F(s){return{deltaX:s.deltaX,deltaY:s.deltaY,top:s.y,bottom:s.y+s.height,left:s.x,right:s.x+s.width,width:s.width,height:s.height,centerX:s.x+s.width/2,centerY:s.y+s.height/2}}function i(s,m){return Math.abs(s-m)<=t.value}return{lines:a,diff:t,lineStatus:l}},render(){const e=(t,c)=>T("div",{style:{[t.includes("x")?"top":"left"]:c.pos+"px"},class:[t.includes("x")?"vv-free-dom--xline":"vv-free-dom--yline","vv-free-dom--line"]}),a=this.showLine?this.lines.filter(t=>this.lineStatus[t].show).map(t=>e(t,this.lineStatus[t])):[];return T("div",{class:"vv-free-dom--markline"},a)}});function U(){const e=Ne(),a=D(()=>typeof e.default=="function"?e.default():e.default),t=D(()=>{var c;return(c=a.value)==null?void 0:c[0]});return{slots:a,only:t}}function $e(e){const a=H(NaN),t=H(NaN);function c(l,u){const v=isNaN(a.value),F=de(e);if(!F)throw new Error("drag node does not exist");return v?{node:F,deltaX:0,deltaY:0,lastX:l,lastY:u,x:l,y:u}:{node:F,deltaX:l-a.value,deltaY:u-t.value,lastX:a.value,lastY:t.value,x:l,y:u}}return{lastX:a,lastY:t,create:c}}function Ee(e){const a=H(e.x||e.modelValue.x||0),t=H(e.y||e.modelValue.y||0),c=H(0),l=H(0),u=H();I(()=>{a.value=e.x||e.modelValue.x||0}),I(()=>{t.value=e.y||e.modelValue.y||0});const v=(m,p)=>{e.dragStartFn(m,p)},F=(m,p)=>{a.value=p.x,t.value=p.y,c.value=p.deltaX,l.value=p.deltaY,e.dragFn(m,p)},i=(m,p)=>{const y=u.value=s(p);e.dragStopFn(m,y)};function s(m){return{node:m.node,x:a.value+m.deltaX,y:t.value+m.deltaY,deltaX:m.deltaX,deltaY:m.deltaY,lastX:a.value,lastY:t.value}}return{x:a,y:t,deltaX:c,deltaY:l,create:s,handleDragStart:v,handleDrag:F,handleDragStop:i}}let We=0;function Ve(e,a){const t=te(ae,void 0),c=We++,l=D(()=>(t==null?void 0:t.handle)||a.handle),u=D(()=>(t==null?void 0:t.lockAspectRatio)||a.lockAspectRatio),v=D(()=>(t==null?void 0:t.minWidth)||a.minWidth),F=D(()=>(t==null?void 0:t.minHeight)||a.minHeight),i=D(()=>(t==null?void 0:t.disabledDrag)||a.disabledDrag),s=D(()=>(t==null?void 0:t.disabledResize)||a.disabledResize),m=D(()=>(t==null?void 0:t.scale)||a.scale),p=D(()=>(t==null?void 0:t.fixNonMonospaced)||a.fixNonMonospaced);q(()=>{t==null||t.register(c,e)}),ce(()=>{t==null||t.remove(c)});function y(o){return t?t.checkValid(o):!0}function d(o){return t?t.correct(o):o}return{emit:o=>t==null?void 0:t.emit(o,c),check:y,correct:d,width:t==null?void 0:t.width,height:t==null?void 0:t.height,scale:m,handle:l,lockAspectRatio:u,minWidth:v,minHeight:F,disabledDrag:i,disabledResize:s,fixNonMonospaced:p}}function Be(){const e=H({});return{on:(l,u)=>{e.value[l]?e.value[l].push(u):e.value[l]=[u]},off:l=>{e.value[l].length=0},emit:(l,u)=>{(e.value[l]||[]).forEach(F=>F(u))}}}function Le(e,a){const t=H(l()),c=H(u());I(()=>{t.value=l()}),I(()=>{c.value=u()});function l(){return e.width||e.modelValue.w}function u(){return e.height||e.modelValue.h}async function v(F,i,s){if(e.width&&e.height||e.modelValue.w&&e.modelValue.h)return;if(!a.value)return[0,0];F&&await document.fonts.ready;const{width:m,height:p}=window.getComputedStyle(a.value.$el);t.value=Math.max(Math.ceil(parseFloat(m)),i),c.value=Math.max(Math.ceil(parseFloat(p)),s)}return{width:t,height:c,syncSize:v}}function Xe(e){const a=J(e.modelValue);I(()=>{a.value=e.modelValue});const t=D(()=>{var h;return(e.width-u.value[0]*(c.value-1)-(((h=F.value)==null?void 0:h[0])||u.value[0])*2)/e.cols}),c=D(()=>e.cols),l=D(()=>e.rowHeight),u=D(()=>e.margin),v=D(()=>e.maxRows),F=D(()=>e.containerPadding),i=D(()=>e.minW),s=D(()=>e.minH);function m(h){return a.value.find(n=>n.i===h)}function p(){return a.value}function y(h,n,f,r,b,x){if(n.static||n.y===r&&n.x===f)return h;Z(`Moving element ${n.i} to [${String(f)},${String(r)}] from [${n.x},${n.y}]`);const z=n.x,k=n.y;typeof f=="number"&&(n.x=f),typeof r=="number"&&(n.y=r),n.moved=!0;const j=R(h).filter(V=>w(V,n));return j.length>0&&x?(n.x=z,n.y=k,n.moved=!1,h):(j.forEach(V=>{Z(`Resolving collision between ${n.i} at [${n.x},${n.y}] and ${V.i} at [${V.x},${V.y}]`,V.moved,V.i),!V.moved&&(V.static?h=d(h,V,n,b):h=d(h,n,V,b))}),h)}function d(h,n,f,r){const b=n.static;if(r){r=!1;const x={x:f.x,y:Math.max(n.y-f.h,0),w:f.w,h:f.h,i:"-1"};if(!M(h,x))return Z(`Doing reverse collision on ${f.i} up to [${x.x},${x.y}].`),y(h,f,void 0,x.y,r,b)}return y(h,f,void 0,f.y+1,r,b)}function o(h,n,f){const b=y(a.value,h,n,f,!0,!e.collision);return a.value=g(b),a.value}function N(h,n,f){let r=!1;if(!e.collision){const b=a.value.filter(x=>w(x,{...h,w:n,h:f}));if(r=b.length>0,r){let x=1/0,z=1/0;b.forEach(k=>{k.x>h.x&&(x=Math.min(k.x,x)),k.y>h.y&&(z=Math.min(k.y,z))}),Number.isFinite(x)&&(h.w=x-h.x),Number.isFinite(z)&&(h.h=z-h.y)}}r||(h.w=n,h.h=f),a.value=g([...a.value])}function R(h){return h.slice(0).sort((n,f)=>n.y>f.y||n.y===f.y&&n.x>f.x?1:n.y===f.y&&n.x===f.x?0:-1)}function w(h,n){return h.i===n.i||h.x+h.w<=n.x||h.x>=n.x+n.w||h.y+h.h<=n.y?!1:!(h.y>=n.y+n.h)}function M(h,n){for(let f=0;f<h.length;++f)if(w(h[f],n))return h[f]}function g(h){const n=h.filter(b=>b.static),f=R(h),r=new Array(h.length);return f.forEach((b,x)=>{let z=JSON.parse(JSON.stringify(b));z.static||(z=_(n,z,f),n.push(z)),r[h.indexOf(f[x])]=z,z.moved=!1}),r}function _(h,n,f){if(e.collision)for(n.y=Math.min(S(h),n.y);n.y>0&&!M(h,n);)--n.y;let r;for(;(r=M(h,n))&&e.collision;)E(f,n,r.y+r.h,"y");return n}function S(h){let n=0;return h.forEach(f=>{const r=f.y+f.h;r>n&&(n=r)}),n}function $(){var n;if(!e.autoHeight)return;const h=S(a.value);return`${h*e.rowHeight+u.value[1]*(h-1)+(((n=F.value)==null?void 0:n[1])||u.value[1])*2}px`}const W={x:"w",y:"h"};function E(h,n,f,r){const b=W[r];n[r]+=1;const x=h.findIndex(z=>z===n);for(let z=x+1;z<h.length;++z){const k=h[z];if(k.y>n.y+n.h)break;w(n,k)&&E(h,k,f+n[b],r)}n[r]=f}return{cellWidth:t,cols:c,rowHeight:l,margin:u,maxRows:v,containerPadding:F,minW:i,minH:s,calContainerHeight:$,moveTo:o,resizeTo:N,getItem:m,getFull:p}}function Ye(e,a){const{cellWidth:t,margin:c,rowHeight:l,cols:u,maxRows:v,containerPadding:F}=a,i=H(),s=H(),m=D(()=>F.value||c.value),p=D(()=>i.value?Math.round(i.value.x):Math.round(e.x*(t.value+c.value[0])+m.value[0])),y=D(()=>i.value?Math.round(i.value.y):Math.round(e.y*(l.value+c.value[1])+m.value[1])),d=D(()=>s.value?Math.round(s.value.width):Math.round(t.value*e.width+Math.max(0,e.width-1)*c.value[0])),o=D(()=>s.value?Math.round(s.value.height):Math.round(l.value*e.height+Math.max(0,e.height-1)*c.value[1])),N=D(()=>{const n=a.minW.value;return Math.round(t.value*n+Math.max(0,n-1)*c.value[0])}),R=D(()=>{const n=a.minH.value;return Math.round(l.value*n+Math.max(0,n-1)*c.value[1])}),w=D(()=>({position:"absolute",width:`${d.value}px`,height:`${o.value}px`,transform:`translate(${p.value}px, ${y.value}px)`})),M=(n,{node:f})=>{const r=f.offsetParent.getBoundingClientRect(),b=f.getBoundingClientRect();i.value={x:b.left-r.left+f.offsetParent.scrollLeft,y:b.top-r.top+f.offsetParent.scrollTop}},g=(n,f)=>{if(!i.value)throw new Error("onDrag called before onDragStart");const{deltaX:r,deltaY:b}=f,x=i.value.x+r,z=i.value.y+b;i.value={x,y:z};const{x:k,y:P}=E(x,z);e.dragFn(n,{x:k,y:P})},_=n=>{if(!i.value)throw new Error("onDragStop called before onDratStart");const{x:f,y:r}=i.value,{x:b,y:x}=E(f,r);i.value=void 0,e.dragEndFn(n,{x:b,y:x})},S=(n,{width:f,height:r})=>{s.value={width:f,height:r}},$=(n,f)=>{const{width:r,height:b}=f,{w:x,h:z}=h(r,b);s.value={width:r,height:b},e.resizeFn(n,{w:x,h:z})},W=(n,f)=>{s.value=void 0;const{width:r,height:b}=f,{w:x,h:z}=h(r,b);e.resizeStopFn(n,{w:x,h:z})};function E(n,f){let r=Math.round((n-c.value[0])/(t.value+c.value[0])),b=Math.round((f-c.value[1])/(l.value+c.value[1]));return r=X(r,0,u.value-e.width),b=X(b,0,v.value-e.height),{x:r,y:b}}function h(n,f){let r=Math.round((n+c.value[0])/(t.value+c.value[0])),b=Math.round((f+c.value[1])/(l.value+c.value[1]));return r=X(r,0,u.value-e.x),b=X(b,0,v.value-e.y),{w:r,h:b}}return{x:p,y,width:d,height:o,dragging:i,resizing:s,style:w,minWidth:N,minHeight:R,onDragStart:M,onDrag:g,onDragStop:_,onResizeStart:S,onResize:$,onResizeStop:W}}function C(){}const Pe={userSelectHack:{type:Boolean,default:!0},startFn:{type:Function,default:C},stopFn:{type:Function,default:C},dragFn:{type:Function,default:C},disabled:Boolean},ie=Y({name:"FreeDomCore",props:Pe,setup(e){const{only:a}=U(),t=H(!1),c=H(),l=D(()=>{var g;return((g=c.value)==null?void 0:g.$el)||c.value}),u=D(()=>{var g;return(g=l.value)==null?void 0:g.ownerDocument}),{lastX:v,lastY:F,create:i}=$e(l);let s,m;ce(()=>{u.value&&(e.userSelectHack&&o(u.value),u.value.removeEventListener("mousemove",w),u.value.removeEventListener("mouseup",R))});function p(g){return N(g)}function y(g){R(g)}function d(g){if(g){if(!g.getElementById("free-dom-style-el")){const _=g.createElement("style");_.id="free-dom-style-el",_.innerHTML=".free-dom-transparent-selection *::selection {all: inherit;}",g.getElementsByTagName("head")[0].appendChild(_)}g.body&&g.body.classList.add("free-dom-transparent-selection")}}function o(g){if(!g)return;g.body&&g.body.classList.remove("free-dom-transparent-selection");const _=g.getSelection();_&&_.removeAllRanges()}function N(g){var W,E;if(e.disabled||!g.target||!(g.target instanceof l.value.ownerDocument.defaultView.Node))return;const{x:_,y:S}=M(g),$=i(_,S);e.startFn(g,$),v.value=_,F.value=S,t.value=!0,e.userSelectHack&&d(u.value),(W=u.value)==null||W.addEventListener("mousemove",w),(E=u.value)==null||E.addEventListener("mouseup",R)}function R(g){var W,E;if(!t.value)return;const{x:_,y:S}=M(g),$=i(_,S);e.stopFn(g,$),e.userSelectHack&&o(u.value),t.value=!1,v.value=NaN,F.value=NaN,(W=u.value)==null||W.removeEventListener("mousemove",w),(E=u.value)==null||E.removeEventListener("mouseup",R)}function w(g){const{x:_,y:S}=M(g),$=i(_,S);e.dragFn(g,$),v.value=_,F.value=S}function M(g){var E;const _=((E=l.value)==null?void 0:E.offsetParent)||u.value.body,S=_===_.ownerDocument.body;(!s||s!==_)&&(s=_,m=S?{left:0,top:0}:_.getBoundingClientRect());const $=g.clientX+_.scrollLeft-m.left,W=g.clientY+_.scrollTop-m.top;return{x:$,y:W}}return{only:a,coreRef:c,mousedownFn:p,mouseupFn:y}},render(){this.mouseupFn;const e={onMousedown:t=>{t.stopPropagation(),this.mousedownFn(t)},onMouseup:this.mouseupFn},a=B(this.only,{ref:t=>{this.coreRef=t}},e,{});return typeof a=="function"?a():a}}),Ie=["t","r","l","b","lt","lb","rt","rb"];function ee(){}const G={dragOpts:{type:Object,default:()=>({})},width:{type:Number,default:0},height:{type:Number,default:0},scale:{type:[Boolean,Array],default:void 0},startFn:{type:Function,default:ee},stopFn:{type:Function,default:ee},resizeFn:{type:Function,default:ee},minWidth:{type:Number,default:50},minHeight:{type:Number,default:50},lockAspectRatio:Boolean},fe=Y({name:"ResizeDomCore",props:G,setup(e,{slots:a}){const{slots:t}=U(),c=D(()=>{const i=e.scale;return Array.isArray(i)?i:Ie}),l=J();function u(i,s){const{lockAspectRatio:m}=e;if(!e.minHeight&&!e.minWidth&&!m)return[i,s];if(m){const p=e.width/e.height,y=i-e.width,d=s-e.height;Math.abs(y)>Math.abs(d*p)?s=i/p:i=s*p}return i=Math.max(i,e.minWidth),s=Math.max(s,e.minHeight),[i,s]}function v(i,s){return(m,{node:p,deltaX:y,deltaY:d})=>{i==="start"&&(l.value=void 0);const o=s!=="t"&&s!=="b",N=s!=="l"&&s!=="r",R=s[0],w=s[s.length-1],M=p.getBoundingClientRect();l.value=M,R==="l"&&(y=-y),w==="t"&&(d=-d);let g=e.width+(o?y:0),_=e.height+(N?d:0);[g,_]=u(g,_);const S=g!==e.width||_!==e.height,$=`${i}Fn`,W=typeof e[$]=="function"?e[$]:null;W&&!(i==="resize"&&!S)&&W(m,{node:p,width:g,height:_,handle:s}),i==="stop"&&(l.value=void 0)}}function F(i){return a.handler?()=>{var s;return(s=a.handler)==null?void 0:s.call(a,i)}:()=>T("i",{class:["vv-resize-dom--handler",`vv-resize-dom--handler__${i}`]})}return{dots:c,children:t,handleResize:v,renderResizehandler:F}},render(){const e=[...this.children||[],this.dots.map(a=>B(ie,{class:[this.dragOpts.disabled&&"vv-resize-dom--disabled"]},{...this.dragOpts,stopFn:this.handleResize("stop",a),startFn:this.handleResize("start",a),dragFn:this.handleResize("resize",a)})(this.renderResizehandler(a)))];return B("div",{class:"vv-resize-dom--box"})(e)}});function A(){}const L={modelValue:{type:Object,default:()=>({})},x:{type:Number,default:0},y:{type:Number,default:0},width:{type:Number,default:void 0},height:{type:Number,default:void 0},handle:{type:String,default:void 0},lockAspectRatio:Boolean,dragStartFn:{type:Function,default:A},dragStopFn:{type:Function,default:A},dragFn:{type:Function,default:A},resizeStartFn:{type:Function,default:A},resizeFn:{type:Function,default:A},resizeStopFn:{type:Function,default:A},autoSize:{type:Boolean,default:!0},minWidth:G.minWidth,minHeight:G.minHeight,disabledDrag:Boolean,disabledResize:Boolean,scale:G.scale,fixNonMonospaced:Boolean},Ae=Y({name:"FreeDom",props:L,emits:["update:width","update:height","update:x","update:y","update:modelValue"],setup(e,{emit:a,expose:t,slots:c}){const l=H(),{x:u,y:v,deltaX:F,deltaY:i,create:s,handleDragStart:m,handleDrag:p,handleDragStop:y}=Ee(e),{width:d,height:o,syncSize:N}=Le(e,l),R={_rect:ne({x:u,y:v,width:d,height:o,deltaX:F,deltaY:i}),trigger:r=>{a("update:modelValue",r)}},w=Ve(R,e),M=()=>{N(w.fixNonMonospaced.value,w.minWidth.value,w.minHeight.value)},g=H(!1);q(()=>{e.autoSize&&M();const r=w.correct(R._rect);R.trigger({x:r.x,y:r.y,w:r.width,h:r.height})});const _=D(()=>({position:"absolute",width:`${d.value}px`,height:`${o.value}px`,transform:`translate(${u.value}px, ${v.value}px)`})),S=(r,b)=>{var P;if(!g.value)return;const x=s(b),z={x:x.x,y:x.y,width:d.value,height:o.value};(P=w.check)!=null&&P.call(w,z)&&(p(r,x),w.emit("move"))},$=(r,b)=>{var k;if(!g.value)return;const x={x:u.value,y:v.value,width:d.value,height:o.value};((k=w.check)==null?void 0:k.call(w,x))||(u.value=X(u.value,0,w.width),v.value=X(v.value,0,w.height)),y(r,b),w.emit("moveup"),a("update:x",u.value),a("update:y",v.value),a("update:modelValue",{x:u.value,y:v.value,w:d.value,h:o.value})},W=(r,b)=>{const x=w.handle.value;x?x.startsWith(".")?g.value=r.target.classList.contains(x.slice(1)):x.startsWith("#")?g.value=r.target.id===x.slice(1):(console.warn(`[free-dom] can not find element with ${x}`),g.value=!0):g.value=!0,g.value&&m(r,b)},E=(r,{node:b,width:x,height:z,handle:k})=>{var le;const P=-(x-d.value),j=-(z-o.value),oe=k[0],V=k[k.length-1];let K=u.value,Q=v.value;oe==="l"&&(K+=P),V==="t"&&(Q+=j),(le=w.check)!=null&&le.call(w,{x:K,y:Q,width:x,height:z})&&(d.value=x,o.value=z,u.value=K,v.value=Q,e.resizeFn(r,{node:b,width:x,height:z,handle:k}),w==null||w.emit("move"))},h=(r,b)=>{var z;((z=w.check)==null?void 0:z.call(w,{x:u.value,y:v.value,width:d.value,height:o.value}))||(u.value=X(u.value,0,w.width),v.value=X(v.value,0,w.height)),e.resizeStopFn(r,b),a("update:width",d.value),a("update:height",o.value),a("update:modelValue",{x:u.value,y:v.value,w:d.value,h:o.value}),w.emit("moveup")},n=(r,b)=>{e.resizeStartFn(r,b)},f=()=>{const r={width:d.value,height:o.value,lockAspectRatio:w.lockAspectRatio.value,dragOpts:{disabled:w.disabledResize.value},startFn:n,resizeFn:E,stopFn:h,minHeight:w.minHeight.value,minWidth:w.minWidth.value,scale:w.scale.value};return B(fe,{},r)(c)};return t==null||t({syncSize:M}),{domRef:l,style:_,onDragStop:$,onDrag:S,onDragStart:W,resizeNode:f,disabled:w.disabledDrag}},render(){var t;const e={startFn:this.onDragStart,stopFn:this.onDragStop,dragFn:this.onDrag,disabled:this.disabled},a=()=>this.resizeNode();return(t=B(ie,{ref:"domRef",class:"vv-free-dom--draggable",style:this.style},e))==null?void 0:t(a)}}),Oe={width:{type:Number,default:void 0},height:{type:Number,default:void 0},diff:{type:Number,default:2},showLine:{type:Boolean,default:!0},handle:L.handle,minWidth:L.minWidth,minHeight:L.minHeight,lockAspectRatio:L.lockAspectRatio,disabledDrag:L.disabledDrag,disabledResize:L.disabledResize,scale:L.scale,fixNonMonospaced:L.fixNonMonospaced},Ge=Y({name:"FreeDomWrap",props:Oe,setup(e){const{slots:a}=U(),t=Be(),c=J(),l=H([]),u=H(e.width),v=H(e.height);I(()=>{u.value=e.width}),I(()=>{v.value=e.height}),q(()=>{var y,d;if(!e.width||!e.height){c.value||console.warn("[free-dom] cannot find element, width or height may be set to 0");const o=(y=c.value)==null?void 0:y.clientHeight,N=(d=c.value)==null?void 0:d.clientWidth;e.width||(u.value=N||0),e.height||(v.value=o||0)}l.value.forEach(o=>{const{x:N,y:R,width:w,height:M}=m(o.node._rect);o.node._rect.x=N,o.node._rect.y=R,o.node._rect.width=w,o.node._rect.height=M,o.node.trigger({x:N,y:R,w,h:M})})});function F(y,d){l.value.push({uuid:y,node:d})}function i(y){const d=l.value.findIndex(o=>o.uuid===y);l.value.splice(d,1)}function s(y){const{x:d,y:o,width:N,height:R}=y;return d>=0&&d+N<=u.value&&o>=0&&o+R<=v.value}function m(y){let d=Math.max(y.x,0),o=Math.max(y.y,0),N=y.width,R=y.height;return y.x+y.width>u.value&&(d=u.value-y.width,d<0&&(N=u.value,d=0)),y.y+y.height>v.value&&(o=v.value-y.height,o<0&&(R=v.value,o=0)),{x:d,y:o,width:N,height:R}}he(ae,ne({...Se(e),nodes:l,width:u,height:v,register:F,remove:i,checkValid:s,correct:m,on:t.on,off:t.off,emit:t.emit}));const p=D(()=>({width:`${e.width}px`,height:`${e.height}px`}));return{rectRef:c,style:p,slots:a}},render(){const e=B(Me,{},{showLine:this.showLine})(),a=[this.slots,e];return B("section",{ref:"rectRef",class:"vv-free-dom--scene",style:this.style})(a)}}),ve=Symbol("gridLayoutContext"),O=()=>{},Te={x:{type:Number,required:!0},y:{type:Number,required:!0},width:{type:Number,required:!0},height:{type:Number,required:!0},dragStartFn:{type:Function,default:O},dragFn:{type:Function,default:O},dragEndFn:{type:Function,default:O},resizeStartFn:{type:Function,default:O},resizeFn:{type:Function,default:O},resizeStopFn:{type:Function,default:O},isDraggable:Boolean,isResizable:Boolean,scale:{type:G.scale.type,default:()=>["rb"]}},je=["dragMove"],re=Y({name:"GridItem",props:Te,emits:je,setup(e){const a=te(ve);if(!a)throw new Error("TODO");const{x:t,y:c,width:l,height:u,dragging:v,style:F,minWidth:i,minHeight:s,onDragStart:m,onDrag:p,onDragStop:y,onResizeStart:d,onResize:o,onResizeStop:N}=Ye(e,a),{only:R,slots:w}=U(),M=_=>{const S={width:l.value,height:u.value,scale:e.scale,dragOpts:{disabled:!e.isResizable},minWidth:i.value,minHeight:s.value,startFn:d,resizeFn:o,stopFn:N};return B(fe,{},S)(()=>_)};return{x:t,y:c,width:l,height:u,child:R,slots:w,style:F,dragging:v,onDragStart:m,onDrag:p,onDragStop:y,onResizeStart:d,onResize:o,onResizeStop:N,dragNode:_=>{const S={class:[v.value&&"vv-grid-layout--item__draggable","vv-grid-layout--item",!e.isDraggable&&"vv-grid-layout--item__disabled"],style:F.value},$={disabled:!e.isDraggable,startFn:m,stopFn:y,dragFn:p};return B(ie,S,$)(()=>M(_))}}},render(){const e=this.slots;return this.dragNode(e)}}),qe={modelValue:{type:Array,required:!0,default:()=>[]},autoHeight:{type:Boolean,default:!0},cols:{type:Number,default:12},maxRows:{type:Number,default:1/0},minW:{type:Number,default:1},minH:{type:Number,default:1},rowHeight:{type:Number,default:150},width:{type:Number,default:1200},margin:{type:Array,default:()=>[10,10]},containerPadding:{type:Array,default:void 0},disabledDrag:Boolean,disabledResize:Boolean,collision:Boolean},Je=Y({name:"GridLayout",inheritAttrs:!1,props:qe,emits:["update:modelValue"],setup(e,{emit:a}){const t=Xe(e);he(ve,t);const c=H(null);function l(v){const F=v.key;if(!F)return;const i=t.getItem(String(F));if(!i)return;const s=!i.static&&!e.disabledDrag,m=!i.static&&!e.disabledResize,p={x:i.x,y:i.y,width:i.w,height:i.h,isDraggable:s,isResizable:m,scale:i.scale,dragEndFn:(y,d)=>{const{x:o,y:N}=d,R=t.moveTo(i,o,N);a("update:modelValue",R),c.value=null},dragStartFn:()=>{},dragFn:(y,d)=>{if(!i)return;const o={x:i.x,y:i.y,width:i.w,height:i.h},{x:N,y:R}=d;t.moveTo(i,N,R),c.value=o},resizeFn:(y,d)=>{const o={x:i.x,y:i.y,width:i.w,height:i.h};c.value=o;const{w:N,h:R}=d;t.resizeTo(i,N,R)},resizeStopFn:(y,d)=>{const{w:o,h:N}=d;t.resizeTo(i,o,N),c.value=null}};return B(re,{},p)({default:()=>v})}function u(){if(!c.value)return null;const{x:v,y:F,width:i,height:s}=c.value;return B(re,{class:"vv-grid-layout--placeholder"},{x:v,y:F,width:i,height:s,move:!1})()}return{processItem:l,placeholder:u,layout:t}},render(){const e={...this.$attrs.style||{},height:this.layout.calContainerHeight()},a=typeof this.$slots.default=="function"?this.$slots.default():this.$slots.default||[];return T("div",{class:"vv-grid-layout",style:e},[a.map(this.processItem),this.placeholder()])}}),Ce=Ge,et=Je,tt=Ae;export{tt as F,et as G,Ze as _,Ce as a};
