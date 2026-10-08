import fs from 'fs'; import vm from 'vm'; import postcss from 'postcss';
const map = JSON.parse(fs.readFileSync('.stitch/pages.json','utf8'));
const pages = {};
const flat=(o,p='')=>Object.entries(o||{}).flatMap(([k,v])=>typeof v==='object'?flat(v,(p?p+'-':'')+k).map(([a,b])=>[a==='DEFAULT'?p:a,b]):[[ (p?(k==='DEFAULT'?p:p+'-'+k):k), v]]);
let css='';
for (const [id,name] of Object.entries(map)) {
  const h=fs.readFileSync(`.stitch/designs/${id}.html`,'utf8');
  const head=h.split('<body')[0];
  const ctx={tailwind:{}}; vm.createContext(ctx);
  for (const m of head.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)) { try{vm.runInContext(m[1],ctx)}catch(e){console.error(name,e.message)} }
  const ext=ctx.tailwind.config?.theme?.extend||{};
  pages[name]={colors:Object.fromEntries(flat(ext.colors)),fontFamily:ext.fontFamily||{},fontSize:ext.fontSize||{},borderRadius:ext.borderRadius||{},boxShadow:ext.boxShadow||{},spacing:ext.spacing||{},other:Object.keys(ext).filter(k=>!['colors','fontFamily','fontSize','borderRadius','boxShadow','spacing'].includes(k))};
  const bodyTag=h.match(/<body[^>]*>/)[0];
  const styles=[...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n');
  const root=postcss.parse(styles);
  root.walkRules(r=>{ if(r.parent?.type==='atrule'&&/keyframes/.test(r.parent.name))return;
    r.selectors=r.selectors.map(s=>{s=s.trim(); if(/^(html|body|:root)$/.test(s))return `.pg-${name}`; if(/^(html|body)\s/.test(s))return s.replace(/^(html|body)/,`.pg-${name}`); if(s==='*'||s.startsWith('*'))return `.pg-${name} ${s}`; return `.pg-${name} ${s}`;});});
  root.walkAtRules('import',a=>a.remove());
  css+=`/* ${name} */\n`+root.toString()+'\n';
  const st=bodyTag.match(/style="([^"]*)"/); pages[name].bodyStyle=st?st[1]:''; pages[name].bodyClass=(bodyTag.match(/class="([^"]*)"/)||[])[1]||'';
}
fs.writeFileSync('.stitch/tokens.json',JSON.stringify(pages,null,1));
fs.writeFileSync('.stitch/pages.css',css);
// conflicts
for (const key of ['colors','fontFamily','fontSize','borderRadius','boxShadow','spacing']) {
  const u={}; for(const [p,t] of Object.entries(pages)) for(const [k,v] of Object.entries(key==='colors'?t.colors:t[key])) (u[k]??={})[JSON.stringify(v)]=[...(u[k]?.[JSON.stringify(v)]||[]),p];
  const conf=Object.entries(u).filter(([k,v])=>Object.keys(v).length>1);
  console.log(key,'names',Object.keys(u).length,'conflicts',conf.length, key!=='colors'?JSON.stringify(conf).slice(0,1500):conf.map(c=>c[0]).join(','));
}
for(const [p,t] of Object.entries(pages)) if(t.other.length) console.log(p,t.other);
