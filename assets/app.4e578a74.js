import{V as s,a7 as i,a8 as p,a9 as u,aa as c,ab as l,ac as f,ad as d,ae as m,af as h,ag as A,ah as g,d as P,u as v,j as w,A as y,ai as C,aj as R,ak as _,a4 as b}from"./chunks/framework.9199ecdb.js";import{t as E}from"./chunks/theme.5f98c7ca.js";const j={...E};function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const o=r(j),D=P({name:"VitePressApp",setup(){const{site:e}=v();return w(()=>{y(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),C(),R(),_(),o.setup&&o.setup(),()=>b(o.Layout)}});async function T(){const e=S(),a=O();a.provide(p,e);const t=u(e.route);return a.provide(c,t),a.component("Content",l),a.component("ClientOnly",f),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:a,router:e,siteData:d}),{app:a,router:e,data:t}}function O(){return m(D)}function S(){let e=s,a;return h(t=>{let n=A(t);return n?(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),s&&(e=!1),g(()=>import(n),[])):null},o.NotFound)}s&&T().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{T as createApp};
