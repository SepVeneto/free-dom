import{F as p,a as A,_ as d}from"./chunks/index.d0cca718.js";import{e as i,r as D,f as F,l as E,m as e,H as c,u as n,j as l,t as m,h as f,Q as C,x as s}from"./chunks/framework.450954f1.js";import"./chunks/theme.d1cfb442.js";const u=i({__name:"distance",setup(y){const a=D({x:Math.random()*100,y:Math.random()*100}),t=D({x:Math.random()*100+100,y:Math.random()*100+100});return(B,o)=>(F(),E(n(A),{diff:10,"manual-diff":"",keyboard:""},{default:e(()=>[c(n(p),{modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=r=>a.value=r)},{default:e(()=>[l(" 测试文本1 ")]),_:1},8,["modelValue"]),c(n(p),{modelValue:t.value,"onUpdate:modelValue":o[1]||(o[1]=r=>t.value=r)},{default:e(()=>[l(m(t.value),1)]),_:1},8,["modelValue"])]),_:1}))}}),_=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"})),h=i({__name:"markline",setup(y){const a=D({x:Math.random()*100,y:Math.random()*100}),t=D({x:Math.random()*100+100,y:Math.random()*100+100});return(B,o)=>(F(),E(n(A),{"show-line":!1},{default:e(()=>[c(n(p),{modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=r=>a.value=r)},{default:e(()=>[l(" 测试文本1 ")]),_:1},8,["modelValue"]),c(n(p),{modelValue:t.value,"onUpdate:modelValue":o[1]||(o[1]=r=>t.value=r)},{default:e(()=>[l(" 测试文本2 ")]),_:1},8,["modelValue"])]),_:1}))}}),v=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"})),M=C('<h1 id="边缘吸附" tabindex="-1">边缘吸附 <a class="header-anchor" href="#边缘吸附" aria-label="Permalink to &quot;边缘吸附&quot;">​</a></h1><p>即使开启了吸附效果依然可以通过按住Shift键或是方向键（↑↓←→）来忽略吸附效果</p><h2 id="吸附距离" tabindex="-1">吸附距离 <a class="header-anchor" href="#吸附距离" aria-label="Permalink to &quot;吸附距离&quot;">​</a></h2><p>通过<code>diff</code>可以设置触发吸附的像素距离。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><code>diff</code>同时也是解除吸附的值，<code>free-scene</code>解除吸附的条件是两次移动的差值大于<code>diff</code>，因此如果这个值设置的过大，会导致拖曳时很难解除吸附效果。</p></div>',5),x=s("div",{class:"language-vue"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"vue"),s("pre",{class:"shiki material-theme-palenight has-diff"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeScene")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    "),s("span",{style:{color:"#C792EA"}},":diff"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"10"),s("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    "),s("span",{style:{color:"#C792EA"}},"manual-diff")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    "),s("span",{style:{color:"#C792EA"}},"keyboard")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"  >")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"v-model"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos1"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      测试文本1")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      "),s("span",{style:{color:"#C792EA"}},"v-model"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos2"),s("span",{style:{color:"#89DDFF"}},'"')]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    >")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      {{ pos2 }}")]),l(`
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
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")])])])],-1),S=s("p",null,"free-dom/diff/distance",-1),b=s("h2",{id:"参考线",tabindex:"-1"},[l("参考线 "),s("a",{class:"header-anchor",href:"#参考线","aria-label":'Permalink to "参考线"'},"​")],-1),g=s("p",null,[l("通过"),s("code",null,"show-line"),l("可以将是否对齐的参考线隐藏")],-1),V=s("div",{class:"language-vue"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"vue"),s("pre",{class:"shiki material-theme-palenight"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),l(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeScene"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},":show-line"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"false"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),l(`
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
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")])])])],-1),k=s("p",null,"free-dom/diff/markline",-1),O=JSON.parse('{"title":"边缘吸附","description":"","frontmatter":{"title":"边缘吸附"},"headers":[],"relativePath":"free-dom/diff.md","filePath":"free-dom/diff.md"}'),P={name:"free-dom/diff.md"},w=Object.assign(P,{setup(y){const a=Object.assign({"../examples/free-dom/diff/distance.vue":_,"../examples/free-dom/diff/markline.vue":v});return(t,B)=>{const o=d;return F(),f("div",null,[M,c(o,{demos:n(a),path:"free-dom/diff/distance",source:"%3Ctemplate%3E%0A%20%20%3CFreeScene%0A%20%20%20%20%3Adiff%3D%2210%22%0A%20%20%20%20manual-diff%0A%20%20%20%20keyboard%0A%20%20%3E%0A%20%20%20%20%3CFreeDom%20v-model%3D%22pos1%22%3E%0A%20%20%20%20%20%20%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC1%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%20%20%3CFreeDom%0A%20%20%20%20%20%20v-model%3D%22pos2%22%0A%20%20%20%20%3E%0A%20%20%20%20%20%20%7B%7B%20pos2%20%7D%7D%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%3C%2FFreeScene%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20FreeDom%2C%20FreeScene%20%7D%20from%20'free-dom'%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0Aconst%20pos1%20%3D%20ref(%7B%0A%20%20x%3A%20Math.random()%20*%20100%2C%0A%20%20y%3A%20Math.random()%20*%20100%2C%0A%7D)%0Aconst%20pos2%20%3D%20ref(%7B%0A%20%20x%3A%20Math.random()%20*%20100%20%2B%20100%2C%0A%20%20y%3A%20Math.random()%20*%20100%20%2B%20100%2C%0A%7D)%0A%3C%2Fscript%3E%0A"},{source:e(()=>[x]),default:e(()=>[S]),_:1},8,["demos"]),b,g,c(o,{demos:n(a),path:"free-dom/diff/markline",source:"%3Ctemplate%3E%0A%20%20%3CFreeScene%20%3Ashow-line%3D%22false%22%3E%0A%20%20%20%20%3CFreeDom%20v-model%3D%22pos1%22%3E%0A%20%20%20%20%20%20%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC1%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%20%20%3CFreeDom%20v-model%3D%22pos2%22%3E%0A%20%20%20%20%20%20%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC2%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%3C%2FFreeScene%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20FreeDom%2C%20FreeScene%20%7D%20from%20'free-dom'%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0Aconst%20pos1%20%3D%20ref(%7B%0A%20%20x%3A%20Math.random()%20*%20100%2C%0A%20%20y%3A%20Math.random()%20*%20100%2C%0A%7D)%0Aconst%20pos2%20%3D%20ref(%7B%0A%20%20x%3A%20Math.random()%20*%20100%20%2B%20100%2C%0A%20%20y%3A%20Math.random()%20*%20100%20%2B%20100%2C%0A%7D)%0A%3C%2Fscript%3E%0A"},{source:e(()=>[V]),default:e(()=>[k]),_:1},8,["demos"])])}}});export{O as __pageData,w as default};