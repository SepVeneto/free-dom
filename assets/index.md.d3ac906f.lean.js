var $e=Object.defineProperty;var Ae=(e,t,n)=>t in e?$e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ce=(e,t,n)=>(Ae(e,typeof t!="symbol"?t+"":t,n),n);import{r as _,w as W,u as C,n as ge,g as Ue,b as H,d as Ce,e as Te,f as M,h as L,s as T,i as F,j as R,k as _e,l as Fe,p as We,t as Me,o as $,c as Q,m as z,q as V,v as le,x as de,F as pe,y as Xe,z as Ye,_ as ze,A as Ve}from"./app.437e78a8.js";function je(e){const t=_({transition:"inherit"});return W(()=>e,n=>{const o=Object.entries(C(n)).reduce((r,h)=>{const[l,a]=h;return typeof a=="number"?r[l]=`${a}px`:r[l]=a,r},{});t.value={...t.value,...o}},{deep:!0}),t}var fe;const A=typeof window<"u",He=e=>typeof e=="string",j=()=>{};A&&((fe=window==null?void 0:window.navigator)==null?void 0:fe.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function Qe(e){return typeof e=="function"?e():C(e)}function qe(e){return e}function xe(e){return Ce()?(Te(e),!0):!1}function be(e,t=!0){Ue()?H(e):t?e():ge(e)}function D(e){var t;const n=Qe(e);return(t=n==null?void 0:n.$el)!=null?t:n}const J=A?window:void 0;A&&window.document;A&&window.navigator;A&&window.location;function B(...e){let t,n,o,r;if(He(e[0])?([n,o,r]=e,t=J):[t,n,o,r]=e,!t)return j;let h=j;const l=W(()=>D(t),i=>{h(),i&&(i.addEventListener(n,o,r),h=()=>{i.removeEventListener(n,o,r),h=j})},{immediate:!0,flush:"post"}),a=()=>{l(),h()};return xe(a),a}function Ge(e,t,n={}){const{window:o=J,ignore:r,capture:h=!0,detectIframe:l=!1}=n;if(!o)return;const a=_(!0);let i;const p=u=>{o.clearTimeout(i);const s=D(e);!s||s===u.target||u.composedPath().includes(s)||!a.value||t(u)},m=u=>r&&r.some(s=>{const g=D(s);return g&&(u.target===g||u.composedPath().includes(g))}),d=[B(o,"click",p,{passive:!0,capture:h}),B(o,"pointerdown",u=>{const s=D(e);a.value=!!s&&!u.composedPath().includes(s)&&!m(u)},{passive:!0}),B(o,"pointerup",u=>{if(u.button===0){const s=u.composedPath();u.composedPath=()=>s,i=o.setTimeout(()=>p(u),50)}},{passive:!0}),l&&B(o,"blur",u=>{var s;const g=D(e);((s=document.activeElement)==null?void 0:s.tagName)==="IFRAME"&&!(g!=null&&g.contains(document.activeElement))&&t(u)})].filter(Boolean);return()=>d.forEach(u=>u())}function Je(e,t=!1){const n=_(),o=()=>n.value=Boolean(e());return o(),be(o,t),n}const q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},G="__vueuse_ssr_handlers__";q[G]=q[G]||{};q[G];var he=Object.getOwnPropertySymbols,Ke=Object.prototype.hasOwnProperty,Ze=Object.prototype.propertyIsEnumerable,et=(e,t)=>{var n={};for(var o in e)Ke.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&he)for(var o of he(e))t.indexOf(o)<0&&Ze.call(e,o)&&(n[o]=e[o]);return n};function tt(e,t,n={}){const o=n,{window:r=J}=o,h=et(o,["window"]);let l;const a=Je(()=>r&&"ResizeObserver"in r),i=()=>{l&&(l.disconnect(),l=void 0)},p=W(()=>D(e),d=>{i(),a.value&&r&&d&&(l=new ResizeObserver(t),l.observe(d,h))},{immediate:!0,flush:"post"}),m=()=>{i(),p()};return xe(m),{isSupported:a,stop:m}}function nt(e,t={}){const{reset:n=!0,windowResize:o=!0,windowScroll:r=!0,immediate:h=!0}=t,l=_(0),a=_(0),i=_(0),p=_(0),m=_(0),d=_(0),b=_(0),u=_(0);function s(){const g=D(e);if(!g){n&&(l.value=0,a.value=0,i.value=0,p.value=0,m.value=0,d.value=0,b.value=0,u.value=0);return}const O=g.getBoundingClientRect();l.value=O.height,a.value=O.bottom,i.value=O.left,p.value=O.right,m.value=O.top,d.value=O.width,b.value=O.x,u.value=O.y}return tt(e,s),W(()=>D(e),g=>!g&&s()),r&&B("scroll",s,{passive:!0}),o&&B("resize",s,{passive:!0}),be(()=>{h&&s()}),{height:l,bottom:a,left:i,right:p,top:m,width:d,x:b,y:u,update:s}}var me;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(me||(me={}));var ot=Object.defineProperty,ve=Object.getOwnPropertySymbols,st=Object.prototype.hasOwnProperty,rt=Object.prototype.propertyIsEnumerable,ye=(e,t,n)=>t in e?ot(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,it=(e,t)=>{for(var n in t||(t={}))st.call(t,n)&&ye(e,n,t[n]);if(ve)for(var n of ve(t))rt.call(t,n)&&ye(e,n,t[n]);return e};const ut={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};it({linear:qe},ut);const k=class{static on(t,n){Array.isArray(k._callbacks[t])||(k._callbacks[t]=[]),k._callbacks[t].push(n)}static emit(t,...n){var o;(o=k._callbacks[t])==null||o.forEach(r=>r.apply(this,n))}static off(t){k._callbacks[t].length=0}};let I=k;ce(I,"_callbacks",{});const K=Symbol("Scene");let U;const at=new Uint8Array(16);function ct(){if(!U&&(U=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!U))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return U(at)}const w=[];for(let e=0;e<256;++e)w.push((e+256).toString(16).slice(1));function lt(e,t=0){return(w[e[t+0]]+w[e[t+1]]+w[e[t+2]]+w[e[t+3]]+"-"+w[e[t+4]]+w[e[t+5]]+"-"+w[e[t+6]]+w[e[t+7]]+"-"+w[e[t+8]]+w[e[t+9]]+"-"+w[e[t+10]]+w[e[t+11]]+w[e[t+12]]+w[e[t+13]]+w[e[t+14]]+w[e[t+15]]).toLowerCase()}const dt=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),we={randomUUID:dt};function pt(e,t,n){if(we.randomUUID&&!t&&!e)return we.randomUUID();e=e||{};const o=e.random||(e.rng||ct)();if(o[6]=o[6]&15|64,o[8]=o[8]&63|128,t){n=n||0;for(let r=0;r<16;++r)t[n+r]=o[r];return t}return lt(o)}const ft=["t","r","l","b","lt","lb","rt","rb"],ht=M({name:"FreeDom",emits:["update:customStyle","select"],props:{customStyle:{type:Object,required:!0},scale:[Boolean,Array],move:Boolean,preview:Boolean,limitWidth:{type:Number,default:void 0},limitHeight:{type:Number,default:void 0}},setup(e,{emit:t}){const n=_(!1),o=_e(K),r=L(()=>(o==null?void 0:o.preview)||e.preview),h=L(()=>!r.value&&((o==null?void 0:o.scale)||e.scale)),l=L(()=>!r.value&&((o==null?void 0:o.move)||e.move)),a=T(),i=_({}),p=je(i),m=pt(),d=F({x:0,y:0,width:0,height:0}),b={_rect:d,trigger:g};H(()=>{o==null||o.register(m,b)}),Ge(a,()=>{n.value=!1});function u(c){const{transform:f,width:v,height:y}=c,{x,y:S}=te(f);d.width=s(v!=null?v:0),d.height=s(y!=null?y:0),d.x=x,d.y=S}function s(c){return typeof c=="number"?c:parseFloat(c)}H(async()=>{i.value=e.customStyle,await ge();const c=a.value.getBoundingClientRect();u(e.customStyle),d.width=c.width,d.height=c.height,g()});function g(){const{x:c,y:f,width:v,height:y}=d;i.value={...e.customStyle,transform:`translate(${c}px, ${f}px)`,width:v,height:y}}const O=L(()=>o&&Array.isArray(o.scale)?o.scale:e.scale),Oe=L(()=>Ie.value?Array.isArray(O.value)?O.value:ft:[]),Se={l:"w",r:"e",t:"n",b:"s"},Ie=T(!0);function Ee(c,f){c.stopPropagation(),c.preventDefault();const{x:v,y,width:x,height:S}=ee(i.value),E=x,P=S,N=c.clientX,ke=c.clientY,ne=/t/.test(f),oe=/l/.test(f),Be=/b/.test(f),Re=/r/.test(f),se=ie=>{const Ne=ie.clientX,Le=ie.clientY,X=Ne-N,Y=Le-ke,ue=E+(oe?-X:Re?X:0),ae=P+(ne?-Y:Be?Y:0);d.x=v+(oe?X:0),d.y=y+(ne?Y:0),d.width=ue<0?0:ue,d.height=ae<0?0:ae,Z(d)&&(I.emit("move",m),g())},re=()=>{I.emit("moveup",m),document.removeEventListener("mousemove",se),document.removeEventListener("mouseup",re),t("update:customStyle",i.value)};document.addEventListener("mousemove",se),document.addEventListener("mouseup",re)}function Pe(c){if(!i.value)return{};const{width:f,height:v}=i.value,y=/l/.test(c),x=/r/.test(c),S=/t/.test(c);let E,P;return c.length===2?(E=y?0:f,P=S?0:v):y||x?(E=y?0:f,P=Number(v)/2):(E=Number(f)/2,P=S?0:v),{marginLeft:"-2px",marginTop:"-2px",top:P+"px",left:E+"px",cursor:c.split("").reverse().map(N=>Se[N]).join("")+"-resize"}}function De(c){if(c.stopPropagation(),!l.value)return;n.value=!0;const f=ee(i.value),v=x=>{const{clientX:S,clientY:E}=x,P=S-c.clientX+f.x,N=E-c.clientY+f.y;d.x=P,d.y=N,d.width=f.width,d.height=f.height,Z(d)&&(I.emit("move",m),g())},y=()=>{I.emit("moveup",m),document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",y),t("update:customStyle",i.value),t("select",d)};document.addEventListener("mousemove",v),document.addEventListener("mouseup",y)}function Z(c){if(o)return o.checkValid(c);if(e.limitWidth&&e.limitHeight){const{x:f,y:v,width:y,height:x}=c;return f>=0&&f+y<=e.limitWidth&&v>=0&&v+x<=e.limitHeight}else return!0}function ee(c){const{transform:f,width:v,height:y}=c,{x,y:S}=te(f);return{x:x?Number(x):0,y:S?Number(S):0,width:parseFloat(v),height:parseFloat(y)}}function te(c){var x;if(!c)return{x:0,y:0};const f=/translate\(([.0-9]+)px[, ]+([.0-9]+)px\)/,[,v,y]=(x=f.exec(c))!=null?x:[];return{x:s(v),y:s(y)}}return{widgetRef:a,canMove:l,wrapStyle:p,canScale:h,dots:Oe,active:n,getDotPos:Pe,onMousedown:De,onMousedownDot:Ee}},render(){const e=this.canScale?this.dots.map(n=>R("div",{class:"free-dom__widget-dot",style:this.getDotPos(n),onMousedown:o=>this.onMousedownDot(o,n)})):null,t=typeof this.$slots.default=="function"?this.$slots.default():this.$slots.default;return R("section",{ref:"widgetRef",class:["free-dom__widget-wrapper",{"can-move":this.canMove},{"is-active":this.active}],style:this.wrapStyle,onMousedown:this.onMousedown},[e,t])}}),mt=["xt","xc","xb","yl","yc","yr"],vt=M({setup(){const e=_e(K),t=T(mt),n=_(e.diff),o=e.nodes,r=F({xt:{show:!1,pos:0},xc:{show:!1,pos:0},xb:{show:!1,pos:0},yl:{show:!1,pos:0},yc:{show:!1,pos:0},yr:{show:!1,pos:0}});I.on("move",async i=>{var m,d;const p=(d=(m=o.find(b=>b.uuid===i))==null?void 0:m.node)!=null?d:{};h(),o.forEach(b=>{if(b.uuid===i)return;const u=l(p._rect),s=l(b.node._rect);a(u.top,s.top)&&(r.xt={show:!0,pos:s.top},p._rect.y=s.top),a(u.bottom,s.top)&&(r.xt={show:!0,pos:s.top},p._rect.y=s.top-u.height),a(u.centerY,s.centerY)&&(r.xc={show:!0,pos:s.centerY},p._rect.y=s.centerY-u.height/2),a(u.top,s.bottom)&&(r.xb={show:!0,pos:s.bottom},p._rect.y=s.bottom),a(u.bottom,s.bottom)&&(r.xb={show:!0,pos:s.bottom},p._rect.y=s.bottom-u.height),a(u.left,s.left)&&(r.yl={show:!0,pos:s.left},p._rect.x=s.left),a(u.right,s.left)&&(r.yl={show:!0,pos:s.left},p._rect.x=s.left-u.width),a(u.centerX,s.centerX)&&(r.yc={show:!0,pos:s.centerX},p._rect.x=s.centerX-u.width/2),a(u.left,s.right)&&(r.yr={show:!0,pos:s.right},p._rect.x=s.right),a(u.right,s.right)&&(r.yr={show:!0,pos:s.right},p._rect.x=s.right-u.width)})}),I.on("moveup",h),Fe(()=>{I.off("move"),I.off("moveup")});function h(){r.xt.show=!1,r.xc.show=!1,r.xb.show=!1,r.yl.show=!1,r.yc.show=!1,r.yr.show=!1}function l(i){return{top:i.y,bottom:i.y+i.height,left:i.x,right:i.x+i.width,width:i.width,height:i.height,centerX:i.x+i.width/2,centerY:i.y+i.height/2}}function a(i,p){return Math.abs(i-p)<=n.value}return{lines:t,diff:n,lineStatus:r}},render(){const e=(n,o)=>R("div",{style:{[n.includes("x")?"top":"left"]:o.pos+"px"},class:[n.includes("x")?"free-dom__xline":"free-dom__yline","free-dom__line"]}),t=this.lines.filter(n=>this.lineStatus[n].show).map(n=>e(n,this.lineStatus[n]));return R("div",{class:"free-dom__mark-line"},t)}}),yt={preview:Boolean,move:Boolean,scale:[Boolean,Array],diff:{type:Number,default:3}},wt=M({name:"FreeDomWrap",props:yt,setup(e){const t=T(null),n=nt(t),o=F([]);function r(l,a){o.push({uuid:l,node:a})}function h(l){const{x:a,y:i,width:p,height:m}=l;return a>=0&&a+p<=n.width.value&&i>=0&&i+m<=n.height.value}return We(K,F({...Me(e),nodes:o,register:r,checkValid:h})),{rectRef:t}},render(){const e=typeof this.$slots.default=="function"?this.$slots.default():this.$slots.default;return R("section",{ref:"rectRef"},[e,R(vt)])}}),gt=ht,_t=wt,xt=M({__name:"Home",setup(e){const t=_(!1),n=_([{text:"\u6D4B\u8BD5\u6587\u672C",style:{color:"#d1239d"}},{text:"\u6D4B\u8BD5\u6587\u672C",style:{fontSize:"24px"}}]);function o(){t.value=!t.value}function r(){n.value.push({text:"\u6D4B\u8BD5\u6587\u672C",style:{}})}function h(l){console.log(l)}return(l,a)=>($(),Q(pe,null,[z("button",{onClick:r},"\u6DFB\u52A0"),z("button",{style:{"margin-left":"20px"},onClick:o},V(t.value?"\u663E\u793A":"\u9690\u85CF"),1),t.value?Ye("",!0):($(),le(C(_t),{key:0,move:"",scale:["lt","lb","rt","rb"],style:{width:"600px",height:"400px",border:"1px solid #999",position:"relative"}},{default:de(()=>[($(!0),Q(pe,null,Xe(n.value,(i,p)=>($(),le(C(gt),{key:p,"custom-style":i.style,"onUpdate:custom-style":m=>i.style=m,onSelect:h},{default:de(()=>[z("span",null,V(i.text)+V(p),1)]),_:2},1032,["custom-style","onUpdate:custom-style"]))),128))]),_:1}))],64))}}),Et=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"index.md"}'),bt={name:"index.md"};function Ot(e,t,n,o,r,h){const l=xt;return $(),Q("div",null,[Ve(l)])}const Pt=ze(bt,[["render",Ot]]);export{Et as __pageData,Pt as default};
