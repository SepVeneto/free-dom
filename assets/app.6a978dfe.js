import{R as s,am as p,an as i,ao as u,ap as c,aq as l,ar as f,as as d,at as m,au as h,av as A,aw as g,e as v,q as P,a as w,d as y,ax as C,ay as R,az as _,a2 as E}from"./chunks/framework.450954f1.js";import{t as b}from"./chunks/theme.d1cfb442.js";const D={...b};function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const o=r(D),T=v({name:"VitePressApp",setup(){const{site:e}=P();return w(()=>{y(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),C(),R(),_(),o.setup&&o.setup(),()=>E(o.Layout)}});async function x(){const e=S(),a=O();a.provide(i,e);const t=u(e.route);return a.provide(c,t),a.component("Content",l),a.component("ClientOnly",f),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:a,router:e,siteData:d}),{app:a,router:e,data:t}}function O(){return m(T)}function S(){let e=s,a;return h(t=>{let n=A(t);return n?(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),s&&(e=!1),g(()=>import(n),[])):null},o.NotFound)}s&&x().then(({app:e,router:a,data:t})=>{a.go().then(()=>{p(a.route,t.site),e.mount("#app")})});export{x as createApp};