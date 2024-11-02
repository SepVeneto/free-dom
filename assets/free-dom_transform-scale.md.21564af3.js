import{F as D,a as m,_ as E}from"./chunks/index.245c4bac.js";import{e as A,r as F,f as y,l as d,m as a,H as t,u as n,j as l,h as i,x as s,t as f}from"./chunks/framework.e5fb373a.js";import"./chunks/theme.6e20b1a6.js";const u=A({__name:"combine",setup(B){const e=F({x:Math.random()*100,y:Math.random()*100}),r=F({x:Math.random()*100+100,y:Math.random()*100+100});return(c,o)=>(y(),d(n(m),{"transform-scale":.5,style:{transform:"scale(0.5)"}},{default:a(()=>[t(n(D),{modelValue:e.value,"onUpdate:modelValue":o[0]||(o[0]=p=>e.value=p)},{default:a(()=>[l(" 测试文本1 ")]),_:1},8,["modelValue"]),t(n(D),{modelValue:r.value,"onUpdate:modelValue":o[1]||(o[1]=p=>r.value=p)},{default:a(()=>[l(" 测试文本2 ")]),_:1},8,["modelValue"])]),_:1}))}}),C=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"})),_={style:{transform:"scale(0.5)"}},h=A({__name:"single",setup(B){const e=F({});return(r,c)=>(y(),i("section",_,[t(n(D),{"transform-scale":.5,"onUpdate:modelValue":c[0]||(c[0]=o=>e.value=o)},{default:a(()=>[s("pre",null,f(e.value),1)]),_:1})]))}}),v=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"})),g=s("h1",{id:"基本用法",tabindex:"-1"},[l("基本用法 "),s("a",{class:"header-anchor",href:"#基本用法","aria-label":'Permalink to "基本用法"'},"​")],-1),b=s("p",null,[l("当使用"),s("code",null,"transform: scale"),l("时，一般都会影响到拖曳和缩放的精度，这种情况可以通过"),s("code",null,"transformScale"),l("这个属性来做一个缩放补偿，使相应操作恢复到正常的精度。")],-1),x=s("h2",{id:"独立使用",tabindex:"-1"},[l("独立使用 "),s("a",{class:"header-anchor",href:"#独立使用","aria-label":'Permalink to "独立使用"'},"​")],-1),M=s("div",{class:"language-vue"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"vue"),s("pre",{class:"shiki material-theme-palenight"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"section"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"transform: scale(0.5);"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      "),s("span",{style:{color:"#C792EA"}},":transform-scale"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"0.5"),s("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      "),s("span",{style:{color:"#C792EA"}},"@update:model-value"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos = $event"),s("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    >")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"pre"),s("span",{style:{color:"#89DDFF"}},">"),s("span",{style:{color:"#BABED8"}},"{{ pos }}"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"pre"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"section"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#C792EA"}},"lang"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"ts"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#C792EA"}},"setup"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF","font-style":"italic"}},"import"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"FreeDom"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF","font-style":"italic"}},"from"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"free-dom"),s("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF","font-style":"italic"}},"import"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"ref"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF","font-style":"italic"}},"from"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#BABED8"}}," pos "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#82AAFF"}},"ref"),s("span",{style:{color:"#BABED8"}},"("),s("span",{style:{color:"#89DDFF"}},"{}"),s("span",{style:{color:"#BABED8"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")])])])],-1),S=s("p",null,"free-dom/transform-scale/single",-1),V=s("h2",{id:"组合使用",tabindex:"-1"},[l("组合使用 "),s("a",{class:"header-anchor",href:"#组合使用","aria-label":'Permalink to "组合使用"'},"​")],-1),k=s("div",{class:"language-vue"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"vue"),s("pre",{class:"shiki material-theme-palenight"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeScene")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    "),s("span",{style:{color:"#C792EA"}},":transform-scale"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"0.5"),s("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"transform: scale(0.5)"),s("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"  >")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"v-model"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos1"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      测试文本1")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"v-model"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos2"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      测试文本2")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeScene"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"}),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#C792EA"}},"setup"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#C792EA"}},"lang"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"ts"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF","font-style":"italic"}},"import"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"FreeScene"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF","font-style":"italic"}},"from"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"free-dom"),s("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF","font-style":"italic"}},"import"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"ref"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF","font-style":"italic"}},"from"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#BABED8"}}," pos1 "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#82AAFF"}},"ref"),s("span",{style:{color:"#BABED8"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"x"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," Math"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"random"),s("span",{style:{color:"#BABED8"}},"() "),s("span",{style:{color:"#89DDFF"}},"*"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"y"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," Math"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"random"),s("span",{style:{color:"#BABED8"}},"() "),s("span",{style:{color:"#89DDFF"}},"*"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#BABED8"}}," pos2 "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#82AAFF"}},"ref"),s("span",{style:{color:"#BABED8"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"x"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," Math"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"random"),s("span",{style:{color:"#BABED8"}},"() "),s("span",{style:{color:"#89DDFF"}},"*"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"+"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"y"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," Math"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"random"),s("span",{style:{color:"#BABED8"}},"() "),s("span",{style:{color:"#89DDFF"}},"*"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"+"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}},")")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")])])])],-1),j=s("p",null,"free-dom/transform-scale/combine",-1),T=JSON.parse('{"title":"缩放补偿","description":"","frontmatter":{"title":"缩放补偿"},"headers":[],"relativePath":"free-dom/transform-scale.md","filePath":"free-dom/transform-scale.md"}'),O={name:"free-dom/transform-scale.md"},U=Object.assign(O,{setup(B){const e=Object.assign({"../examples/free-dom/transform-scale/combine.vue":C,"../examples/free-dom/transform-scale/single.vue":v});return(r,c)=>{const o=E;return y(),i("div",null,[g,b,x,t(o,{demos:n(e),path:"free-dom/transform-scale/single",source:"%3Ctemplate%3E%0A%20%20%3Csection%20style%3D%22transform%3A%20scale(0.5)%3B%22%3E%0A%20%20%20%20%3CFreeDom%0A%20%20%20%20%20%20%3Atransform-scale%3D%220.5%22%0A%20%20%20%20%20%20%40update%3Amodel-value%3D%22pos%20%3D%20%24event%22%0A%20%20%20%20%3E%0A%20%20%20%20%20%20%3Cpre%3E%7B%7B%20pos%20%7D%7D%3C%2Fpre%3E%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%3C%2Fsection%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20lang%3D%22ts%22%20setup%3E%0Aimport%20%7B%20FreeDom%20%7D%20from%20'free-dom'%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0A%0Aconst%20pos%20%3D%20ref(%7B%7D)%0A%3C%2Fscript%3E%0A"},{source:a(()=>[M]),default:a(()=>[S]),_:1},8,["demos"]),V,t(o,{demos:n(e),path:"free-dom/transform-scale/combine",source:"%3Ctemplate%3E%0A%20%20%3CFreeScene%0A%20%20%20%20%3Atransform-scale%3D%220.5%22%0A%20%20%20%20style%3D%22transform%3A%20scale(0.5)%22%0A%20%20%3E%0A%20%20%20%20%3CFreeDom%20v-model%3D%22pos1%22%3E%0A%20%20%20%20%20%20%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC1%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%20%20%3CFreeDom%20v-model%3D%22pos2%22%3E%0A%20%20%20%20%20%20%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC2%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%3C%2FFreeScene%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20FreeDom%2C%20FreeScene%20%7D%20from%20'free-dom'%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0Aconst%20pos1%20%3D%20ref(%7B%0A%20%20x%3A%20Math.random()%20*%20100%2C%0A%20%20y%3A%20Math.random()%20*%20100%2C%0A%7D)%0Aconst%20pos2%20%3D%20ref(%7B%0A%20%20x%3A%20Math.random()%20*%20100%20%2B%20100%2C%0A%20%20y%3A%20Math.random()%20*%20100%20%2B%20100%2C%0A%7D)%0A%3C%2Fscript%3E%0A"},{source:a(()=>[k]),default:a(()=>[j]),_:1},8,["demos"])])}}});export{T as __pageData,U as default};