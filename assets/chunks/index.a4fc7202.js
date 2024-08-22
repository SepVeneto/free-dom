import{u as Be,a as pe,b as He,o as Xe}from"./theme.59733ceb.js";import{r as R,a as C,a1 as we,e as T,c as N,C as Pe,f as ge,h as Ye,x as $e,H as Ie,m as Le,l as Ve,O as We,u as be,J as Ae,p as Oe,i as Te,F as ue,a2 as K,N as de,E as ee,a3 as U,$ as Ge,d as Q,B as xe,w as ce,a4 as je,V as Fe,a5 as De}from"./framework.770d1f77.js";function Ke(e){const a=R(1200);C(()=>{t(),window.addEventListener("resize",n)}),we(()=>{window.removeEventListener("resize",n)});const n=Be(t);function t(){var c;a.value=((c=e.value)==null?void 0:c.getBoundingClientRect().width)||1200}return a}const Ft=T({__name:"vp-demo",props:{source:{},demos:{},path:{}},setup(e){const a=R(),n=Ke(a),t=e,c=N(()=>t.path.startsWith("grid-layout")),u=N(()=>({border:"1px solid black",width:c.value?"":"100%",height:c.value?"":"300px"})),b=N(()=>{const d=Object.keys(t.demos);for(const i of d)if(i.replace("../examples/","").replace(".vue","")===t.path)return t.demos[i].default;return!1});return(d,i)=>{const g=Pe("ClientOnly");return ge(),Ye(ue,null,[$e("section",{ref_key:"wrapRef",ref:a,style:{width:"100%"}},[Ie(g,null,{default:Le(()=>[b.value?(ge(),Ve(Ae(b.value),{key:0,style:We(u.value),width:be(n)},null,8,["style","width"])):Oe("",!0)]),_:1})],512),Te(d.$slots,"source")],64)}}});const he=Symbol("Scene");function A(e,a={},n={},t={}){if(!e)return()=>null;const c=Je(t),u={...a,...n,...c};return b=>K(e,u,b)}const qe=/^nativeOn([A-Z]\S*)/;function Je(e){const a={};let n=!1;Object.entries(e).forEach(([c,u])=>{{n=!0;const b=c.replace(qe,(d,i)=>`on${i}`);a[b]=u}});const t={};return n&&(t.on=a),t.on}function V(e,a,n=1/0){return Math.max(Math.min(e,n),a)}function le(...e){}function _e(e){if(e){if(!e.getElementById("free-dom-style-el")){const a=e.createElement("style");a.id="free-dom-style-el",a.innerHTML=".free-dom-transparent-selection *::selection {all: inherit;}",e.getElementsByTagName("head")[0].appendChild(a)}e.body&&e.body.classList.add("free-dom-transparent-selection")}}function re(e){if(!e)return;e.body&&e.body.classList.remove("free-dom-transparent-selection");const a=e.getSelection();a&&a.removeAllRanges()}function Ue(e,a,n,t,c){const{margin:u,cols:b,rowHeight:d,maxRows:i}=e,g=Ze(e);let h=Math.round((a-u[0])/(g+u[0])),y=Math.round(n-u[1]/(d+u[1]));return h=V(h,0,b-t),y=V(y,0,i-c),{x:h,y}}function Ze(e){const{margin:a,containerPadding:n,width:t,cols:c}=e;return(t-a[0]*(c-1)-n[0]*2)/c}const Qe=["xt","xc","xb","yl","yc","yr"],Ce=T({props:{showLine:Boolean},setup(){const e=de(he),a=ee(Qe),n=N(()=>e.diff/e.transformScale),t=e.nodes,c=N(()=>t.filter(h=>!h.node.selected)),u=U({xt:{show:!1,pos:0},xc:{show:!1,pos:0},xb:{show:!1,pos:0},yl:{show:!1,pos:0},yc:{show:!1,pos:0},yr:{show:!1,pos:0}}),b=(h,y)=>{var S;const p=(S=t.find(M=>M.uuid===h))==null?void 0:S.node;p&&(d(),c.value.forEach(M=>{if(M.uuid===h)return;const f=i(p._rect),m=i(M.node._rect);g(f.top,m.top,y)&&(u.xt={show:!0,pos:m.top},p._rect.y=m.top),g(f.bottom,m.top,y)&&(u.xt={show:!0,pos:m.top},p._rect.y=m.top-f.height),g(f.centerY,m.centerY,y)&&(u.xc={show:!0,pos:m.centerY},p._rect.y=m.centerY-f.height/2),g(f.top,m.bottom,y)&&(u.xb={show:!0,pos:m.bottom},p._rect.y=m.bottom),g(f.bottom,m.bottom,y)&&(u.xb={show:!0,pos:m.bottom},p._rect.y=m.bottom-f.height),g(f.left,m.left,y)&&(u.yl={show:!0,pos:m.left},p._rect.x=m.left),g(f.right,m.left,y)&&(u.yl={show:!0,pos:m.left},p._rect.x=m.left-f.width),g(f.centerX,m.centerX,y)&&(u.yc={show:!0,pos:m.centerX},p._rect.x=m.centerX-f.width/2),g(f.left,m.right,y)&&(u.yr={show:!0,pos:m.right},p._rect.x=m.right),g(f.right,m.right,y)&&(u.yr={show:!0,pos:m.right},p._rect.x=m.right-f.width)}))};e==null||e.on("move",b),e==null||e.on("moveup",d),we(()=>{e==null||e.off("move"),e==null||e.off("moveup")});function d(){u.xt.show=!1,u.xc.show=!1,u.xb.show=!1,u.yl.show=!1,u.yc.show=!1,u.yr.show=!1}function i(h){return{deltaX:h.deltaX,deltaY:h.deltaY,top:h.y,bottom:h.y+h.height,left:h.x,right:h.x+h.width,width:h.width,height:h.height,centerX:h.x+h.width/2,centerY:h.y+h.height/2}}function g(h,y,p){const S=p?0:n.value;return Math.abs(h-y)<=S}return{lines:a,diff:n,lineStatus:u}},render(){const e=(n,t)=>K("div",{style:{[n.includes("x")?"top":"left"]:t.pos+"px"},class:[n.includes("x")?"vv-free-dom--xline":"vv-free-dom--yline","vv-free-dom--line"]}),a=this.showLine?this.lines.filter(n=>this.lineStatus[n].show).map(n=>e(n,this.lineStatus[n])):[];return K("div",{class:"vv-free-dom--markline"},a)}});function te(){const e=Ge(),a=typeof e.default=="function"?e.default():e.default,n=a==null?void 0:a[0];return{slots:a,only:n}}function et(e){const a=R(NaN),n=R(NaN);function t(c,u){const b=isNaN(a.value),d=be(e);if(!d)throw new Error("drag node does not exist");return b?{node:d,deltaX:0,deltaY:0,lastX:c,lastY:u,x:c,y:u}:{node:d,deltaX:c-a.value,deltaY:u-n.value,lastX:a.value,lastY:n.value,x:c,y:u}}return{lastX:a,lastY:n,create:t}}function tt(e){const a=R(e.x||e.modelValue.x||0),n=R(e.y||e.modelValue.y||0),t=R(0),c=R(0),u=R();Q(()=>{a.value=e.x||e.modelValue.x||0}),Q(()=>{n.value=e.y||e.modelValue.y||0});const b=(h,y)=>{e.dragStartFn(h,y)},d=(h,y)=>{a.value=Number(y.x.toFixed(2)),n.value=Number(y.y.toFixed(2)),t.value=y.deltaX,c.value=y.deltaY,e.dragFn(h,y)},i=(h,y)=>{const p=u.value=g(y);e.dragStopFn(h,p)};function g(h){return{node:h.node,x:a.value+h.deltaX,y:n.value+h.deltaY,deltaX:h.deltaX,deltaY:h.deltaY,lastX:a.value,lastY:n.value}}return{x:a,y:n,deltaX:t,deltaY:c,create:g,handleDragStart:b,handleDrag:d,handleDragStop:i}}let at=0;function nt(e,a,n){const t=de(he,void 0),c=at++,u=N(()=>(t==null?void 0:t.handle)||n.handle),b=N(()=>(t==null?void 0:t.lockAspectRatio)||n.lockAspectRatio),d=N(()=>(t==null?void 0:t.minWidth)||n.minWidth),i=N(()=>(t==null?void 0:t.minHeight)||n.minHeight),g=N(()=>(t==null?void 0:t.disabledDrag)||n.disabledDrag),h=N(()=>(t==null?void 0:t.disabledResize)||n.disabledResize),y=N(()=>(t==null?void 0:t.disabledSelect)||n.disabledSelect),p=N(()=>(t==null?void 0:t.scale)||n.scale),S=N(()=>(t==null?void 0:t.transformScale)||n.transformScale),M=N(()=>(t==null?void 0:t.fixNonMonospaced)||n.fixNonMonospaced),f=N(()=>(t==null?void 0:t.keyboard)||n.keyboard);C(()=>{const r=e.value;if(!r){console.warn("[free-dom] mounted failed: element not found");return}t==null||t.register(r.$el,c,a)}),xe(()=>{t==null||t.remove(c)});function m(r){return t?t.checkValid(r):!0}function P(r){return t?t.correct(r):r}return{emit:(r,w)=>{t==null||t.emit(r,c,w)},check:m,correct:P,clearSelectState:t==null?void 0:t.clearSelectState,width:t==null?void 0:t.width,height:t==null?void 0:t.height,history:t==null?void 0:t.history,scale:p,handle:u,lockAspectRatio:b,minWidth:d,minHeight:i,disabledDrag:g,disabledResize:h,disabledSelect:y,fixNonMonospaced:M,transformScale:S,keyboard:f}}const q=R({});function fe(){return{on:(t,c)=>{q.value[t]?q.value[t].push(c):q.value[t]=[c]},off:t=>{q.value[t].length=0},emit:(t,...c)=>{(q.value[t]||[]).forEach(b=>b(...c))}}}function lt(e,a){const n=R(c()),t=R(u());Q(()=>{n.value=c()}),Q(()=>{t.value=u()});function c(){return e.width||e.modelValue.w}function u(){return e.height||e.modelValue.h}async function b(d,i,g){if(e.width&&e.height||e.modelValue.w&&e.modelValue.h)return;if(!a.value)return[0,0];d&&await document.fonts.ready;const{width:h,height:y}=window.getComputedStyle(a.value.$el);n.value=Math.max(Math.ceil(parseFloat(h)),i),t.value=Math.max(Math.ceil(parseFloat(y)),g)}return{width:n,height:t,syncSize:b}}function ot(e){const a=ee(e.modelValue);ce(()=>e.modelValue,()=>{a.value=e.modelValue},{deep:!0});const n=N(()=>{var l;return(e.width-u.value[0]*(t.value-1)-(((l=d.value)==null?void 0:l[0])||u.value[0])*2)/e.cols}),t=N(()=>e.cols),c=N(()=>e.rowHeight),u=N(()=>e.margin),b=N(()=>e.maxRows),d=N(()=>e.containerPadding),i=N(()=>e.minW),g=N(()=>e.minH);function h(l){return a.value.find(o=>o.i===l)}function y(){return a.value}function p(l){a.value=l}function S(l,o,v,z,B,X){if(o.static||o.y===z&&o.x===v)return l;le(`Moving element ${o.i} to [${String(v)},${String(z)}] from [${o.x},${o.y}]`);const D=o.x,H=o.y;typeof v=="number"&&(o.x=v),typeof z=="number"&&(o.y=z),o.moved=!0;const $=P(l).filter(I=>r(I,o));return $.length>0&&X?(o.x=D,o.y=H,o.moved=!1,l):($.forEach(I=>{le(`Resolving collision between ${o.i} at [${o.x},${o.y}] and ${I.i} at [${I.x},${I.y}]`,I.moved,I.i),!I.moved&&(I.static?l=M(l,I,o,B):l=M(l,o,I,B))}),l)}function M(l,o,v,z){const B=o.static;if(z){z=!1;const X={x:v.x,y:Math.max(o.y-v.h,0),w:v.w,h:v.h,i:"-1"};if(!w(l,X))return le(`Doing reverse collision on ${v.i} up to [${X.x},${X.y}].`),S(l,v,void 0,X.y,z,B)}return S(l,v,void 0,v.y+1,z,B)}function f(l,o,v){const B=S(a.value,l,o,v,!0,!e.collision);return a.value=s(B),a.value}function m(l,o,v){let z=!1;if(!e.collision){const B=a.value.filter(X=>r(X,{...l,w:o,h:v}));if(z=B.length>0,z){let X=1/0,D=1/0;B.forEach(H=>{H.x>l.x&&(X=Math.min(H.x,X)),H.y>l.y&&(D=Math.min(H.y,D))}),Number.isFinite(X)&&(l.w=X-l.x),Number.isFinite(D)&&(l.h=D-l.y)}}return z||(l.w=o,l.h=v),a.value=s([...a.value]),a.value}function P(l){return l.slice(0).sort((o,v)=>o.y>v.y||o.y===v.y&&o.x>v.x?1:o.y===v.y&&o.x===v.x?0:-1)}function r(l,o){return l.i===o.i||l.x+l.w<=o.x||l.x>=o.x+o.w||l.y+l.h<=o.y?!1:!(l.y>=o.y+o.h)}function w(l,o){for(let v=0;v<l.length;++v)if(r(l[v],o))return l[v]}function s(l){const o=l.filter(B=>B.static),v=P(l),z=new Array(l.length);return v.forEach((B,X)=>{let D=JSON.parse(JSON.stringify(B));D.static||(D=F(o,D,v),o.push(D)),z[l.indexOf(v[X])]=D,D.moved=!1}),z}function F(l,o,v){if(e.collision)for(o.y=Math.min(x(l),o.y);o.y>0&&!w(l,o);)--o.y;let z;for(;(z=w(l,o))&&e.collision;)k(v,o,z.y+z.h,"y");return o}function x(l){let o=0;return l.forEach(v=>{const z=v.y+v.h;z>o&&(o=z)}),o}function E(){var o;if(!e.autoHeight)return;const l=x(a.value);return`${l*e.rowHeight+u.value[1]*(l-1)+(((o=d.value)==null?void 0:o[1])||u.value[1])*2}px`}const L={x:"w",y:"h"};function k(l,o,v,z){const B=L[z];o[z]+=1;const X=l.findIndex(D=>D===o);for(let D=X+1;D<l.length;++D){const H=l[D];if(H.y>o.y+o.h)break;r(o,H)&&k(l,H,v+o[B],z)}o[z]=v}function _(l){a.value=[...a.value,l]}return{cellWidth:n,cols:t,rowHeight:c,margin:u,maxRows:b,containerPadding:d,minW:i,minH:g,updateDroppingItem:_,calContainerHeight:E,moveTo:f,resizeTo:m,getItem:h,getFull:y,setFull:p,normalize:s}}function it(e,a){const{cellWidth:n,margin:t,rowHeight:c,cols:u,maxRows:b,containerPadding:d}=a,i=R(),g=R(),h=N(()=>d.value||t.value),y=N(()=>i.value?Math.round(i.value.x):Math.round(e.x*(n.value+t.value[0])+h.value[0])),p=N(()=>i.value?Math.round(i.value.y):Math.round(e.y*(c.value+t.value[1])+h.value[1])),S=N(()=>g.value?Math.round(g.value.width):Math.round(n.value*e.width+Math.max(0,e.width-1)*t.value[0])),M=N(()=>g.value?Math.round(g.value.height):Math.round(c.value*e.height+Math.max(0,e.height-1)*t.value[1])),f=N(()=>{const _=a.minW.value;return Math.round(n.value*_+Math.max(0,_-1)*t.value[0])}),m=N(()=>{const _=a.minH.value;return Math.round(c.value*_+Math.max(0,_-1)*t.value[1])}),P=N(()=>({position:"absolute",width:`${S.value}px`,height:`${M.value}px`,transform:`translate(${y.value}px, ${p.value}px)`})),r=(_,{node:l})=>{const o=l.offsetParent.getBoundingClientRect(),v=l.getBoundingClientRect();i.value={x:v.left-o.left+l.offsetParent.scrollLeft,y:v.top-o.top+l.offsetParent.scrollTop}},w=(_,l)=>{if(!i.value)throw new Error("onDrag called before onDragStart");const{deltaX:o,deltaY:v}=l,z=i.value.x+o,B=i.value.y+v;i.value={x:z,y:B};const{x:X,y:D}=L(z,B);e.dragFn(_,{x:X,y:D})},s=_=>{if(!i.value)throw new Error("onDragStop called before onDratStart");const{x:l,y:o}=i.value,{x:v,y:z}=L(l,o);i.value=void 0,e.dragEndFn(_,{x:v,y:z})},F=(_,{width:l,height:o})=>{g.value={width:l,height:o}},x=(_,l)=>{const{width:o,height:v}=l,{w:z,h:B}=k(o,v);g.value={width:o,height:v},e.resizeFn(_,{w:z,h:B})},E=(_,l)=>{g.value=void 0;const{width:o,height:v}=l,{w:z,h:B}=k(o,v);e.resizeStopFn(_,{w:z,h:B})};function L(_,l){let o=Math.round((_-t.value[0])/(n.value+t.value[0])),v=Math.round((l-t.value[1])/(c.value+t.value[1]));return o=V(o,0,u.value-e.width),v=V(v,0,b.value-e.height),{x:o,y:v}}function k(_,l){let o=Math.round((_+t.value[0])/(n.value+t.value[0])),v=Math.round((l+t.value[1])/(c.value+t.value[1]));return o=V(o,0,u.value-e.x),v=V(v,0,b.value-e.y),{w:o,h:v}}return{x:y,y:p,width:S,height:M,dragging:i,resizing:g,style:P,minWidth:f,minHeight:m,onDragStart:r,onDrag:w,onDragStop:s,onResizeStart:F,onResize:x,onResizeStop:E}}function st(e,a,n,t){const c=fe(),u=R(0),b=R(0),d=R(0),i=R(0),g=ze(n),h=R(!1),y=N(()=>{const k=d.value-u.value,_=i.value-b.value;return{visibility:p.value?"visible":"hidden",border:"2px solid rgb(0,120,215)",background:"rgb(0,120,215,0.3)",position:"absolute",top:b.value+(_<0?_:0)+"px",left:u.value+(k<0?k:0)+"px",width:Math.abs(k)+"px",height:Math.abs(_)+"px",zIndex:1}}),p=R(!1),S=pe(e),M=N(()=>{var k;return(k=He(e))==null?void 0:k.ownerDocument}),f=N(()=>n.value.filter(k=>!(a.disabledSelect||k.node.disabledSelect)));function m(){let k;f.value.forEach(_=>{const l=_.node._rect;if(l.x==null||l.y==null||l.width==null||l.height==null)return!1;const o=l.x,v=l.y,z=o+l.width,B=v+l.height,X=P(o,v,z,B);_.node.selected=X,X&&(k=_)}),k==null||k.el.focus()}function P(k,_,l,o){const v=Math.min(u.value,d.value),z=Math.min(b.value,i.value),B=Math.max(u.value,d.value),X=Math.max(b.value,i.value),D=r(v,B,k,l,Math.abs(k-l)/5),H=r(z,X,_,o,Math.abs(_-o)/5);return D&&H}function r(k,_,l,o,v){return Math.max(k,l)-Math.min(_,o)<=-v}function w(k){const _=k.clientX-S.x.value,l=k.clientY-S.y.value;return{x:_,y:l}}function s(k){if(a.disabledBatch)return;_e(M.value);const{x:_,y:l}=w(k);p.value=!0,u.value=_,b.value=l,d.value=_,i.value=l,document.addEventListener("mouseup",x)}function F(k){if(!p.value)return;h.value||(c.emit("batch-select","start"),h.value=!0);const{x:_,y:l}=w(k);d.value===_&&i.value===l||(d.value=V(_,0,t.width.value),i.value=V(l,0,t.height.value),L())}function x(){re(M.value),p.value=!1,h.value=!1,d.value===u.value&&i.value===b.value||(g.push({type:"batch-select"}),setTimeout(()=>{c.emit("batch-select","end",{lastX:d.value,lastY:i.value,startX:u.value,startY:b.value}),d.value=0,i.value=0,u.value=0,b.value=0})),document.removeEventListener("mouseup",x)}function E(){return K("div",{id:"mask",style:y.value})}async function L(){m()}return{selecting:p,renderMask:E,handleMousedown:s,handleMousemove:F}}const oe=R([]),rt=R({canClear:!1});function ze(e){const a=N(()=>{var t;return(t=oe.value.slice(-1)[0])==null?void 0:t.type});function n(t){oe.value.push({...t,data:e})}return{state:rt,records:oe,lastOperate:a,push:n}}function ie(){}const ut={userSelectHack:{type:Boolean,default:!0},startFn:{type:Function,default:ie},stopFn:{type:Function,default:ie},dragFn:{type:Function,default:ie},disabled:Boolean,scale:{type:Number,default:1}},ve=T({name:"FreeDomCore",props:ut,setup(e){const a=R(!1),n=R(),t=N(()=>{var r;return((r=n.value)==null?void 0:r.$el)||n.value}),c=N(()=>{var r;return(r=t.value)==null?void 0:r.ownerDocument}),{lastX:u,lastY:b,create:d}=et(t),i=R(NaN),g=R(NaN);let h,y;xe(()=>{c.value&&(e.userSelectHack&&re(c.value),c.value.removeEventListener("mousemove",m),c.value.removeEventListener("mouseup",f))});function p(r){return M(r)}function S(r){f(r)}function M(r){var x,E;if(e.disabled||!r.target||!(r.target instanceof t.value.ownerDocument.defaultView.Node))return;const{x:w,y:s}=P(r),F=d(w,s);e.startFn(r,F),i.value=w,g.value=s,u.value=w,b.value=s,a.value=!0,e.userSelectHack&&_e(c.value),(x=c.value)==null||x.addEventListener("mousemove",m),(E=c.value)==null||E.addEventListener("mouseup",f)}function f(r){var w,s;if(a.value){if(!(i.value===u.value&&g.value===b.value)){const{x:F,y:x}=P(r),E=d(F,x);e.stopFn(r,E)}e.userSelectHack&&re(c.value),a.value=!1,u.value=NaN,b.value=NaN,(w=c.value)==null||w.removeEventListener("mousemove",m),(s=c.value)==null||s.removeEventListener("mouseup",f)}}function m(r){const{x:w,y:s}=P(r),F=d(w,s);e.dragFn(r,F),u.value=w,b.value=s}function P(r){var E;const w=((E=t.value)==null?void 0:E.offsetParent)||c.value.body,s=w===w.ownerDocument.body;(!h||h!==w)&&(h=w,y=s?{left:0,top:0}:w.getBoundingClientRect());const F=(r.clientX+w.scrollLeft-y.left)/e.scale,x=(r.clientY+w.scrollTop-y.top)/e.scale;return{x:F,y:x}}return{coreRef:n,mousedownFn:p,mouseupFn:S}},render(){const{only:e}=te(),a=A(e,{ref:n=>{this.coreRef=n}},{},{onMousedown:n=>{n.stopPropagation(),this.mousedownFn(n)},onMouseup:this.mouseupFn});return typeof a=="function"?a():a}}),dt=["t","r","l","b","lt","lb","rt","rb"];function se(){}const J={dragOpts:{type:Object,default:()=>({})},width:{type:Number,default:0},height:{type:Number,default:0},scale:{type:[Boolean,Array],default:void 0},startFn:{type:Function,default:se},stopFn:{type:Function,default:se},resizeFn:{type:Function,default:se},minWidth:{type:Number,default:50},minHeight:{type:Number,default:50},lockAspectRatio:Boolean},Ne=T({name:"ResizeDomCore",props:J,setup(e,{slots:a}){const n=N(()=>{const d=e.scale;return Array.isArray(d)?d:dt}),t=ee();function c(d,i,g){const{lockAspectRatio:h}=e;if(!e.minHeight&&!e.minWidth&&!h)return[d,i];if(h&&g.length===2){const y=e.width/e.height;y>1?(i=Math.max(i,e.minHeight),d=i*y):(d=Math.max(d,e.minWidth),i=d/y)}else d=Math.max(d,e.minWidth),i=Math.max(i,e.minHeight);return[d,i]}function u(d,i){return(g,{node:h,deltaX:y,deltaY:p})=>{d==="start"&&(t.value=void 0);const S=i!=="t"&&i!=="b",M=i!=="l"&&i!=="r",f=i[0],m=i[i.length-1],P=h.getBoundingClientRect();t.value=P,f==="l"&&(y=-y),m==="t"&&(p=-p);let r=e.width+(S?y:0),w=e.height+(M?p:0);g.shiftKey||([r,w]=c(r,w,i));const s=r!==e.width||w!==e.height,F=`${d}Fn`,x=typeof e[F]=="function"?e[F]:null;x&&!(d==="resize"&&!s)&&x(g,{node:h,width:r,height:w,handle:i}),d==="stop"&&(t.value=void 0)}}function b(d){return a.handler?()=>{var i;return(i=a.handler)==null?void 0:i.call(a,d)}:()=>K("i",{dataType:"handler",class:["vv-resize-dom--handler",`vv-resize-dom--handler__${d}`]})}return{dots:n,handleResize:u,renderResizehandler:b}},render(){const{slots:e}=te(),a=[...e||[],this.dots.map(n=>A(ve,{class:[this.dragOpts.disabled&&"vv-resize-dom--disabled"]},{...this.dragOpts,stopFn:this.handleResize("stop",n),startFn:this.handleResize("start",n),dragFn:this.handleResize("resize",n)})(this.renderResizehandler(n)))];return A("div",{class:"vv-resize-dom--box"})(a)}});function G(){}const O={modelValue:{type:Object,default:()=>({})},keyboard:Boolean,x:{type:Number,default:0},y:{type:Number,default:0},width:{type:Number,default:void 0},height:{type:Number,default:void 0},handle:{type:String,default:void 0},lockAspectRatio:Boolean,dragStartFn:{type:Function,default:G},dragStopFn:{type:Function,default:G},dragFn:{type:Function,default:G},resizeStartFn:{type:Function,default:G},resizeFn:{type:Function,default:G},resizeStopFn:{type:Function,default:G},autoSize:{type:Boolean,default:!0},minWidth:J.minWidth,minHeight:J.minHeight,disabledDrag:Boolean,disabledResize:Boolean,disabledSelect:Boolean,scale:J.scale,transformScale:{type:Number,default:1},fixNonMonospaced:Boolean},ct=T({name:"FreeDom",props:O,emits:["update:width","update:height","update:x","update:y","update:modelValue"],setup(e,{emit:a,expose:n,slots:t}){const c=R(),u=R(!1);fe().on("batch-select",D=>{u.value=D==="start"});const{x:d,y:i,deltaX:g,deltaY:h,create:y,handleDragStart:p,handleDrag:S,handleDragStop:M}=tt(e),{width:f,height:m,syncSize:P}=lt(e,c),r=R(!1),w=U({disabledSelect:je(e,"disabledSelect"),selected:r,_rect:U({x:d,y:i,width:f,height:m,deltaX:g,deltaY:h}),trigger:D=>{a("update:modelValue",D)},props:e}),s=nt(c,w,e);Xe(c,()=>{!r.value||u.value||(r.value=!1)},{ignore:[s.clearSelectState&&".vv-free-dom--draggable"]});const F=()=>{P(s.fixNonMonospaced.value,s.minWidth.value,s.minHeight.value)},x=R(!1);C(()=>{e.autoSize&&F()});const E=N(()=>({width:`${f.value}px`,height:`${m.value}px`,transform:`translate(${d.value}px, ${i.value}px)`})),L=(D,H)=>{var I;if(!x.value)return;const Y=y(H),$={x:Y.x,y:Y.y,width:f.value,height:m.value};(I=s.check)!=null&&I.call(s,$)&&(S(D,Y),s.emit("move",D.shiftKey))},k=(D,H)=>{var W,I;if(!x.value)return;const Y={x:d.value,y:i.value,width:f.value,height:m.value};((W=s.check)==null?void 0:W.call(s,Y))||(d.value=V(d.value,0,s.width),i.value=V(i.value,0,s.height)),M(D,H),s.emit("moveup"),a("update:x",d.value),a("update:y",i.value),a("update:modelValue",{x:d.value,y:i.value,w:f.value,h:m.value}),(I=s.history)==null||I.push({type:"move-end"})},_=(D,H)=>{const Y=s.handle.value;Y?Y.startsWith(".")?x.value=D.target.classList.contains(Y.slice(1)):Y.startsWith("#")?x.value=D.target.id===Y.slice(1):(console.warn(`[free-dom] can not find element with ${Y}`),x.value=!0):x.value=!0,x.value&&p(D,H)},l=(D,{node:H,width:Y,height:$,handle:W})=>{var me;const I=-(Y-f.value),ke=-($-m.value),Me=W[0],Ee=W[W.length-1];let ae=d.value,ne=i.value;Me==="l"&&(ae+=I),Ee==="t"&&(ne+=ke),(me=s.check)!=null&&me.call(s,{x:ae,y:ne,width:Y,height:$})&&(f.value=Number(Y.toFixed(2)),m.value=Number($.toFixed(2)),d.value=Number(ae.toFixed(2)),i.value=Number(ne.toFixed(2)),e.resizeFn(D,{node:H,width:Y,height:$,handle:W}),s==null||s.emit("move"))},o=(D,H)=>{var $,W;(($=s.check)==null?void 0:$.call(s,{x:d.value,y:i.value,width:f.value,height:m.value}))||(d.value=V(d.value,0,s.width),i.value=V(i.value,0,s.height)),e.resizeStopFn(D,H),a("update:width",f.value),a("update:height",m.value),a("update:modelValue",{x:d.value,y:i.value,w:f.value,h:m.value}),s.emit("moveup"),(W=s.history)==null||W.push({type:"resize-end"})},v=(D,H)=>{e.resizeStartFn(D,H)},z=()=>{const D={width:f.value,height:m.value,lockAspectRatio:s.lockAspectRatio.value,dragOpts:{disabled:s.disabledResize.value,scale:s.transformScale.value},startFn:v,resizeFn:l,stopFn:o,minHeight:s.minHeight.value,minWidth:s.minWidth.value,scale:s.scale.value};return A(Ne,{},D)(t)};function B(D){var H,Y,$;s.disabledSelect.value||(D.ctrlKey?(r.value=!r.value,(H=s.history)==null||H.push({type:"select"})):r.value||((Y=s.clearSelectState)==null||Y.call(s),r.value=!0,($=s.history)==null||$.push({type:"select"})))}function X(D){var $;if(s.disabledDrag.value||!s.keyboard.value)return;switch(D.preventDefault(),D.key){case"ArrowUp":h.value=-1,g.value=0;break;case"ArrowDown":h.value=1,g.value=0;break;case"ArrowLeft":g.value=-1,h.value=0;break;case"ArrowRight":g.value=1,h.value=0;break;default:g.value=0,h.value=0}d.value+=g.value,i.value+=h.value;const H={x:d.value,y:i.value,width:f.value,height:m.value};(($=s.check)==null?void 0:$.call(s,H))||(d.value=V(d.value,0,(s.width||0)-(f.value||0)),i.value=V(i.value,0,(s.height||0)-(m.value||0))),a("update:x",d.value),a("update:y",i.value),a("update:modelValue",{x:d.value,y:i.value,w:f.value,h:m.value}),s.emit("move",!0)}return n==null||n({syncSize:F}),{selected:r,domRef:c,style:E,onDragStop:k,onDrag:L,onDragStart:_,resizeNode:z,handleKeyboard:X,handleSelect:B,disabled:s.disabledDrag,scale:s.transformScale}},render(){var n;const e={startFn:this.onDragStart,stopFn:this.onDragStop,dragFn:this.onDrag,disabled:this.disabled,scale:this.scale},a=()=>this.resizeNode();return(n=A(ve,{ref:"domRef",tabindex:-1,class:["vv-free-dom--draggable",this.disabled&&"vv-free-dom--draggable__disabled",this.selected&&"vv-free-dom--draggable__selected"],style:this.style},e,{nativeOnClick:this.handleSelect,nativeOnKeydown:this.handleKeyboard}))==null?void 0:n(a)}}),ht={diff:{type:Number,default:2},showLine:{type:Boolean,default:!0},transformScale:{type:Number,default:1},keyboard:Boolean,disabledBatch:Boolean,handle:O.handle,minWidth:{type:Number,default:void 0},minHeight:{type:Number,default:void 0},lockAspectRatio:O.lockAspectRatio,disabledDrag:O.disabledDrag,disabledResize:O.disabledResize,disabledSelect:O.disabledSelect,scale:O.scale,fixNonMonospaced:O.fixNonMonospaced},ft=T({name:"FreeDomWrap",props:ht,emits:["batch-select"],setup(e,{emit:a}){const n=fe(),t=R([]),c=ze(t),u=R(0),b=R(0),d=ee(),i=pe(d);ce([i.width,i.height,()=>t.value.length],([r,w])=>{u.value=r,b.value=w,!(!r||!w)&&p()});const g=N(()=>t.value.filter(r=>r.node.selected));n.on("move",r=>{const w=g.value.find(x=>x.uuid===r);if(!w)return;const{deltaX:s,deltaY:F}=w.node._rect;g.value.forEach(x=>{x.uuid!==r&&(x.node._rect.x+=s||0,x.node._rect.y+=F||0)})}),n.on("batch-select",(r,w)=>{r==="end"&&a("batch-select",w)});const h=R(!1),y=st(d,e,t,{width:u,height:b});function p(){t.value.forEach(r=>{const w=e.minWidth||r.node.props.minWidth,s=e.minHeight||r.node.props.minHeight,{x:F,y:x,width:E,height:L}=m(r.node._rect,w,s);r.node._rect.x=F,r.node._rect.y=x,r.node._rect.width=E,r.node._rect.height=L,r.node.trigger({x:F,y:x,w:E,h:L})})}function S(r,w,s){t.value.push({el:r,uuid:w,node:s})}function M(r){const w=t.value.findIndex(s=>s.uuid===r);t.value.splice(w,1)}function f(r){const{x:w,y:s,width:F,height:x}=r;return w>=0&&w+F<=u.value&&s>=0&&s+x<=b.value}function m(r,w,s){let F=Math.max(r.x,0),x=Math.max(r.y,0),E=r.width,L=r.height;return r.x+r.width>u.value&&(F=u.value-r.width,F<0&&(E=Math.max(u.value,w),F=0)),r.y+r.height>b.value&&(x=b.value-r.height,x<0&&(L=Math.max(b.value,s),x=0)),{x:F,y:x,width:E,height:L}}function P(){g.value.forEach(r=>{r.node.selected=!1})}return Fe(he,U({...De(e),nodes:t,width:u,height:b,history:c,clearSelectState:P,register:S,remove:M,checkValid:f,correct:m,on:n.on,off:n.off,emit:n.emit})),{rectRef:d,selecting:h,mask:y,history:c}},render(){const{slots:e}=te(),a=A(Ce,{},{showLine:this.showLine})(),n=[this.mask.selecting&&this.mask.renderMask(),e,a];return A("section",{ref:"rectRef",class:"vv-free-dom--scene"},{},{onMousedown:this.mask.handleMousedown,onMousemove:this.mask.handleMousemove})(n)}}),Re=Symbol("gridLayoutContext"),j=()=>{},vt={x:{type:Number,required:!0},y:{type:Number,required:!0},width:{type:Number,required:!0},height:{type:Number,required:!0},dragStartFn:{type:Function,default:j},dragFn:{type:Function,default:j},dragEndFn:{type:Function,default:j},resizeStartFn:{type:Function,default:j},resizeFn:{type:Function,default:j},resizeStopFn:{type:Function,default:j},isDraggable:Boolean,isResizable:Boolean,scale:{type:J.scale.type,default:()=>["rb"]},droppingPosition:{type:Object,default:void 0}},mt=["dragMove"],ye=T({name:"GridItem",props:vt,emits:mt,setup(e){const a=R(),n=de(Re);if(!n)throw new Error("TODO");C(()=>{t()}),ce(()=>e.droppingPosition,(s,F)=>{t(F)},{deep:!0});function t(s){var L;if(!e.droppingPosition)return;const F=(L=a.value)==null?void 0:L.$el;if(!F)return;const x=s||{left:0,top:0},E=i.value&&e.droppingPosition.left!==x.left||e.droppingPosition.top!==x.top;if(!i.value)p(e.droppingPosition.evt,{node:F,deltaX:e.droppingPosition.left,deltaY:e.droppingPosition.top,x:0,y:0,lastX:0,lastY:0});else if(E){const k=e.droppingPosition.left-x.left,_=e.droppingPosition.top-x.top;S(e.droppingPosition.evt,{node:F,deltaX:k,deltaY:_,x:0,y:0,lastX:0,lastY:0})}}const{x:c,y:u,width:b,height:d,dragging:i,style:g,minWidth:h,minHeight:y,onDragStart:p,onDrag:S,onDragStop:M,onResizeStart:f,onResize:m,onResizeStop:P}=it(e,n),r=s=>{const F={width:b.value,height:d.value,scale:e.scale,dragOpts:{disabled:!e.isResizable},minWidth:h.value,minHeight:y.value,startFn:f,resizeFn:m,stopFn:P};return A(Ne,{},F)(()=>s)};return{x:c,y:u,width:b,height:d,style:g,dragging:i,onDragStart:p,onDrag:S,onDragStop:M,onResizeStart:f,onResize:m,onResizeStop:P,dragNode:s=>{const F={class:[i.value&&"vv-grid-layout--item__draggable","vv-grid-layout--item",!e.isDraggable&&"vv-grid-layout--item__disabled"],style:g.value,ref:a},x={disabled:!e.isDraggable,startFn:p,stopFn:M,dragFn:S};return A(ve,F,x)(()=>r(s))}}},render(){const{slots:e}=te(),a=e;return this.dragNode(a)}});function gt(e,a){const n=R(),t=R();function c(u){u.preventDefault(),u.stopPropagation();const b=u.currentTarget.getBoundingClientRect(),d=u.clientX-b.left,i=u.clientY-b.top,g={left:d,top:i,evt:u};if(n.value){if(t.value){const{left:h,top:y}=t.value;h!==d&&y!==i&&(t.value=g)}}else{n.value=A("div",{key:a.droppingItem.i}),t.value=g;const h={cols:a.cols,margin:a.margin,maxRows:a.maxRows,rowHeight:a.rowHeight,width:a.width,containerPadding:a.containerPadding||a.margin},y=Ue(h,d,i,a.droppingItem.w,a.droppingItem.h);e.updateDroppingItem({...a.droppingItem,x:y.x,y:y.y,static:!1,isDraggable:!0})}}return{onDropover:c,droppingNode:n,position:t}}const yt={droppable:Boolean,droppingItem:{type:Object,default:()=>({i:"__dropping-elem__",w:1,h:1})},modelValue:{type:Array,required:!0,default:()=>[]},autoHeight:{type:Boolean,default:!0},cols:{type:Number,default:12},maxRows:{type:Number,default:1/0},minW:{type:Number,default:1},minH:{type:Number,default:1},rowHeight:{type:Number,default:150},width:{type:Number,default:1200},margin:{type:Array,default:()=>[10,10]},containerPadding:{type:Array,default:void 0},disabledDrag:Boolean,disabledResize:Boolean,collision:Boolean},pt=T({name:"GridLayout",inheritAttrs:!1,props:yt,emits:["update:modelValue","dropItem"],setup(e,{emit:a}){const n=ot(U(De(e))),t=gt(n,e);Fe(Re,n);const c=R(null);function u(p,S=!1){const M=p.key;if(!M)return;const f=n.getItem(String(M));if(!f)return;const m=!f.static&&!e.disabledDrag,P=!f.static&&!e.disabledResize,r={x:f.x,y:f.y,width:f.w,height:f.h,isDraggable:m,isResizable:P,scale:f.scale,droppingPosition:S?t.position.value:void 0,dragEndFn:(w,s)=>{const{x:F,y:x}=s,E=n.moveTo(f,F,x);a("update:modelValue",E),c.value=null},dragStartFn:()=>{},dragFn:(w,s)=>{if(!f)return;const F={x:f.x,y:f.y,width:f.w,height:f.h},{x,y:E}=s;n.moveTo(f,x,E),c.value=F},resizeFn:(w,s)=>{const F={x:f.x,y:f.y,width:f.w,height:f.h};c.value=F;const{w:x,h:E}=s;n.resizeTo(f,x,E)},resizeStopFn:(w,s)=>{const{w:F,h:x}=s,E=n.resizeTo(f,F,x);a("update:modelValue",E),c.value=null}};return A(ye,{},r)({default:()=>p})}function b(){if(!c.value)return null;const{x:p,y:S,width:M,height:f}=c.value;return A(ye,{class:"vv-grid-layout--placeholder"},{x:p,y:S,width:M,height:f,move:!1})()}function d(){const p=n.getFull(),S=n.normalize(p.filter(M=>M.i!==e.droppingItem.i));n.setFull(S)}let i=0;function g(p){p.stopPropagation(),p.preventDefault();const S=n.getItem(e.droppingItem.i);d(),t.droppingNode.value=null,t.position.value=null,c.value=null,i=0,a("dropItem",S)}function h(p){p.stopPropagation(),p.preventDefault(),--i,i===0&&d()}function y(p){p.stopPropagation(),p.preventDefault(),++i}return{processItem:u,placeholder:b,onDrop:g,onDragLeave:h,onDragEnter:y,layout:n,droppingItem:t}},render(){const e={...this.$attrs.style||{},height:this.layout.calContainerHeight()},n=[...(Array.isArray(this.$attrs.class)?this.$attrs.class:[this.$attrs.class])||[],"vv-grid-layout"],t=typeof this.$slots.default=="function"?this.$slots.default():this.$slots.default||[],c=Se(t);return K("div",{class:n,style:e,onDragover:this.droppable?this.droppingItem.onDropover:Z,onDrop:this.droppable?this.onDrop:Z,onDragleave:this.droppable?this.onDragLeave:Z,onDragenter:this.droppable?this.onDragEnter:Z},[c.map(u=>(u.type===ue&&this.processItem(u),this.processItem(u))),this.droppable&&this.droppingItem.droppingNode.value&&this.processItem(this.droppingItem.droppingNode.value(),!0),this.placeholder()])}});function Z(){}function Se(e){const a=[];return e.forEach(n=>{n.type===ue&&Array.isArray(n.children)?a.push(...Se(n.children)):a.push(n)}),a}const Dt=ft,_t=pt,zt=ct;export{zt as F,_t as G,Ft as _,Dt as a};
