import{F as D,a as d,_ as m}from"./chunks/index.d0cca718.js";import{e as A,r as F,f as y,l as C,m as n,H as c,u as t,j as o,h as B,x as s,Q as E}from"./chunks/framework.450954f1.js";import"./chunks/theme.d1cfb442.js";const u=A({__name:"combine",setup(i){const e=F({width:200,height:100,x:Math.random()*100,y:Math.random()*100}),r=F({x:Math.random()*100+100,y:Math.random()*100+100});return(p,l)=>(y(),C(t(d),null,{default:n(()=>[c(t(D),{w:e.value.width,"onUpdate:w":l[0]||(l[0]=a=>e.value.width=a),h:e.value.height,"onUpdate:h":l[1]||(l[1]=a=>e.value.height=a),x:e.value.x,"onUpdate:x":l[2]||(l[2]=a=>e.value.x=a),y:e.value.y,"onUpdate:y":l[3]||(l[3]=a=>e.value.y=a)},{default:n(()=>[o(" 测试文本1 ")]),_:1},8,["w","h","x","y"]),c(t(D),{modelValue:r.value,"onUpdate:modelValue":l[4]||(l[4]=a=>r.value=a)},{default:n(()=>[o(" 测试文本2 ")]),_:1},8,["modelValue"])]),_:1}))}}),_=Object.freeze(Object.defineProperty({__proto__:null,default:u},Symbol.toStringTag,{value:"Module"})),f=s("div",{style:{color:"#fff",width:"100%",height:"100%",background:"crimson"}},"长文本长文本长文本长文本长文本长文本长文本长文本",-1),h=s("div",null,"长文本长文本长文本长文本长文本长文本长文本长文本",-1),v=A({__name:"single",setup(i){const e=F({});return(r,p)=>(y(),B("section",null,[c(t(D),{"onUpdate:modelValue":p[0]||(p[0]=l=>e.value=l)},{default:n(()=>[f]),_:1}),c(t(D),{"auto-size":!1},{default:n(()=>[h]),_:1})]))}}),g=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"})),b=E('<h1 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h1><h2 id="独立使用" tabindex="-1">独立使用 <a class="header-anchor" href="#独立使用" aria-label="Permalink to &quot;独立使用&quot;">​</a></h2><p><code>free-dom</code>本身会管理坐标和大小，因此只需要包裹需要拖曳和缩放的元素即可。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>由于没有区域限制，元素本身可以移动到整个网页的任意一个地方。</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>虽然当初始值不设置<code>width</code>或<code>height</code>时，<code>free-dom</code>会在初次渲染时根据被包裹的元素自动计算大小，但是由于浏览器的渲染是异步的，所以只能尽力保证获取到的是最终渲染的尺寸。因此条件允许的情况下最好是指定<code>width</code>和<code>height</code>。</p></div>',5),x=s("div",{class:"language-vue"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"vue"),s("pre",{class:"shiki material-theme-palenight"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"section"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"@update:model-value"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos = $event"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"style"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"color: #fff; width: 100%; height: 100%; background: crimson;"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">"),s("span",{style:{color:"#BABED8"}},"长文本长文本长文本长文本长文本长文本长文本长文本"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},":auto-size"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"false"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}},">"),s("span",{style:{color:"#BABED8"}},"长文本长文本长文本长文本长文本长文本长文本长文本"),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"div"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"section"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"}),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#C792EA"}},"lang"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"ts"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#C792EA"}},"setup"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF","font-style":"italic"}},"import"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"FreeDom"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF","font-style":"italic"}},"from"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"free-dom"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF","font-style":"italic"}},"import"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"ref"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF","font-style":"italic"}},"from"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"}),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#BABED8"}}," pos "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#82AAFF"}},"ref"),s("span",{style:{color:"#BABED8"}},"("),s("span",{style:{color:"#89DDFF"}},"{}"),s("span",{style:{color:"#BABED8"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")])])])],-1),w=s("p",null,"free-dom/basic/single",-1),S=E('<h2 id="组合使用" tabindex="-1">组合使用 <a class="header-anchor" href="#组合使用" aria-label="Permalink to &quot;组合使用&quot;">​</a></h2><p>当场景中存在多个拖曳元素，且各元素之间有对齐需求，或者需要限制拖曳的范围时，可以使用<code>free-scene</code>来管理相关的<code>free-dom</code></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><code>FreeScene</code>作为可拖曳区域虽然可以通过<code>style</code>在挂载后动态设置宽高，但是设置成百分比时请确认父容器被设置了指定的值，否则会导致高度异常。 因此虽然可以自动计算，但是为了确保实际区域符合预期，最好还是指定宽高的具体值而不是相对值。</p></div>',3),k=s("div",{class:"language-vue"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"vue"),s("pre",{class:"shiki material-theme-palenight"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeScene"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      "),s("span",{style:{color:"#C792EA"}},"v-model:w"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos1.width"),s("span",{style:{color:"#89DDFF"}},'"')]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      "),s("span",{style:{color:"#C792EA"}},"v-model:h"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos1.height"),s("span",{style:{color:"#89DDFF"}},'"')]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      "),s("span",{style:{color:"#C792EA"}},"v-model:x"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos1.x"),s("span",{style:{color:"#89DDFF"}},'"')]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"      "),s("span",{style:{color:"#C792EA"}},"v-model:y"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos1.y"),s("span",{style:{color:"#89DDFF"}},'"')]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"    >")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      测试文本1")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}}," "),s("span",{style:{color:"#C792EA"}},"v-model"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"pos2"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"      测试文本2")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"    "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"FreeScene"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"template"),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"}),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"<"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#C792EA"}},"setup"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#C792EA"}},"lang"),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#C3E88D"}},"ts"),s("span",{style:{color:"#89DDFF"}},'"'),s("span",{style:{color:"#89DDFF"}},">")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF","font-style":"italic"}},"import"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"FreeDom"),s("span",{style:{color:"#89DDFF"}},","),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"FreeScene"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF","font-style":"italic"}},"from"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"free-dom"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF","font-style":"italic"}},"import"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"{"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#BABED8"}},"ref"),s("span",{style:{color:"#F07178"}}," "),s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF","font-style":"italic"}},"from"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"'"),s("span",{style:{color:"#C3E88D"}},"vue"),s("span",{style:{color:"#89DDFF"}},"'")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#BABED8"}}," pos1 "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#82AAFF"}},"ref"),s("span",{style:{color:"#BABED8"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"width"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"200"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"height"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"x"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," Math"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"random"),s("span",{style:{color:"#BABED8"}},"() "),s("span",{style:{color:"#89DDFF"}},"*"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"y"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," Math"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"random"),s("span",{style:{color:"#BABED8"}},"() "),s("span",{style:{color:"#89DDFF"}},"*"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#C792EA"}},"const"),s("span",{style:{color:"#BABED8"}}," pos2 "),s("span",{style:{color:"#89DDFF"}},"="),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#82AAFF"}},"ref"),s("span",{style:{color:"#BABED8"}},"("),s("span",{style:{color:"#89DDFF"}},"{")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"x"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," Math"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"random"),s("span",{style:{color:"#BABED8"}},"() "),s("span",{style:{color:"#89DDFF"}},"*"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"+"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#BABED8"}},"  "),s("span",{style:{color:"#F07178"}},"y"),s("span",{style:{color:"#89DDFF"}},":"),s("span",{style:{color:"#BABED8"}}," Math"),s("span",{style:{color:"#89DDFF"}},"."),s("span",{style:{color:"#82AAFF"}},"random"),s("span",{style:{color:"#BABED8"}},"() "),s("span",{style:{color:"#89DDFF"}},"*"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#89DDFF"}},"+"),s("span",{style:{color:"#BABED8"}}," "),s("span",{style:{color:"#F78C6C"}},"100"),s("span",{style:{color:"#89DDFF"}},",")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}"),s("span",{style:{color:"#BABED8"}},")")]),o(`
`),s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"</"),s("span",{style:{color:"#F07178"}},"script"),s("span",{style:{color:"#89DDFF"}},">")])])])],-1),T=s("p",null,"free-dom/basic/combine",-1),O=JSON.parse('{"title":"基本用法","description":"","frontmatter":{"title":"基本用法"},"headers":[],"relativePath":"free-dom/basic.md","filePath":"free-dom/basic.md"}'),M={name:"free-dom/basic.md"},j=Object.assign(M,{setup(i){const e=Object.assign({"../examples/free-dom/basic/combine.vue":_,"../examples/free-dom/basic/single.vue":g});return(r,p)=>{const l=m;return y(),B("div",null,[b,c(l,{demos:t(e),path:"free-dom/basic/single",source:"%3Ctemplate%3E%0A%20%20%3Csection%3E%0A%20%20%20%20%3CFreeDom%20%40update%3Amodel-value%3D%22pos%20%3D%20%24event%22%3E%0A%20%20%20%20%20%20%3Cdiv%20style%3D%22color%3A%20%23fff%3B%20width%3A%20100%25%3B%20height%3A%20100%25%3B%20background%3A%20crimson%3B%22%3E%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%3C%2Fdiv%3E%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%20%20%3CFreeDom%20%3Aauto-size%3D%22false%22%3E%0A%20%20%20%20%20%20%3Cdiv%3E%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%E9%95%BF%E6%96%87%E6%9C%AC%3C%2Fdiv%3E%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%3C%2Fsection%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20lang%3D%22ts%22%20setup%3E%0Aimport%20%7B%20FreeDom%20%7D%20from%20'free-dom'%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0A%0Aconst%20pos%20%3D%20ref(%7B%7D)%0A%3C%2Fscript%3E%0A"},{source:n(()=>[x]),default:n(()=>[w]),_:1},8,["demos"]),S,c(l,{demos:t(e),path:"free-dom/basic/combine",source:"%3Ctemplate%3E%0A%20%20%3CFreeScene%3E%0A%20%20%20%20%3CFreeDom%0A%20%20%20%20%20%20v-model%3Aw%3D%22pos1.width%22%0A%20%20%20%20%20%20v-model%3Ah%3D%22pos1.height%22%0A%20%20%20%20%20%20v-model%3Ax%3D%22pos1.x%22%0A%20%20%20%20%20%20v-model%3Ay%3D%22pos1.y%22%0A%20%20%20%20%3E%0A%20%20%20%20%20%20%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC1%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%20%20%3CFreeDom%20v-model%3D%22pos2%22%3E%0A%20%20%20%20%20%20%E6%B5%8B%E8%AF%95%E6%96%87%E6%9C%AC2%0A%20%20%20%20%3C%2FFreeDom%3E%0A%20%20%3C%2FFreeScene%3E%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%20setup%20lang%3D%22ts%22%3E%0Aimport%20%7B%20FreeDom%2C%20FreeScene%20%7D%20from%20'free-dom'%0Aimport%20%7B%20ref%20%7D%20from%20'vue'%0Aconst%20pos1%20%3D%20ref(%7B%0A%20%20width%3A%20200%2C%0A%20%20height%3A%20100%2C%0A%20%20x%3A%20Math.random()%20*%20100%2C%0A%20%20y%3A%20Math.random()%20*%20100%2C%0A%7D)%0Aconst%20pos2%20%3D%20ref(%7B%0A%20%20x%3A%20Math.random()%20*%20100%20%2B%20100%2C%0A%20%20y%3A%20Math.random()%20*%20100%20%2B%20100%2C%0A%7D)%0A%3C%2Fscript%3E%0A"},{source:n(()=>[k]),default:n(()=>[T]),_:1},8,["demos"])])}}});export{O as __pageData,j as default};