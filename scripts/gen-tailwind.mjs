import fs from 'fs';
const pages=JSON.parse(fs.readFileSync('.stitch/tokens.json','utf8'));
const hexToCh=h=>{h=h.replace('#','');if(h.length===3)h=[...h].map(c=>c+c).join('');const n=parseInt(h.slice(0,6),16);return `${n>>16&255} ${n>>8&255} ${n&255}`};
const isHex=v=>/^#[0-9a-f]{3,8}$/i.test(v);
const names={};for(const [p,t] of Object.entries(pages))for(const [k,v] of Object.entries(t.colors))(names[k]??={})[p]=String(v).toLowerCase();
const colors={},root={},perPage={};
for(const [k,pv] of Object.entries(names)){
  const vals=Object.values(pv); const lit=vals.filter(v=>!isHex(v));
  if(lit.length){colors[k]=vals[0];continue}
  const cnt={};vals.forEach(v=>cnt[v]=(cnt[v]||0)+1);const def=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0][0];
  const vn=`--c-${k}`; colors[k]=`rgb(var(${vn}) / <alpha-value>)`; root[vn]=hexToCh(def);
  for(const [p,v] of Object.entries(pv)) if(v!==def)(perPage[p]??={})[vn]=hexToCh(v);
}
const font=['"Nunito Sans"','"PingFang SC"','"Hiragino Sans GB"','"Noto Sans SC"','"Noto Sans CJK SC"','"Microsoft YaHei"','system-ui','sans-serif'];
const fontFamily={sans:font};const fontSize={},borderRadius={},boxShadow={},spacing={};
for(const t of Object.values(pages)){for(const k of Object.keys(t.fontFamily))fontFamily[k]=font;Object.assign(fontSize,t.fontSize);Object.assign(boxShadow,t.boxShadow);Object.assign(spacing,t.spacing);for(const [k,v] of Object.entries(t.borderRadius)) if(!(k==='3xl'))borderRadius[k]=v;}
for(const k of ['DEFAULT','lg','xl','full']) delete borderRadius[k];
fs.writeFileSync('tailwind.config.js',`/** generated from Stitch project by scripts/gen-tailwind.mjs */\nexport default ${JSON.stringify({content:['./index.html','./src/**/*.{ts,tsx}'],theme:{extend:{colors,fontFamily,fontSize,borderRadius,boxShadow,spacing}},plugins:[]},null,2)}\n`);
let css=':root{'+Object.entries(root).map(([k,v])=>`${k}:${v}`).join(';')+'}\n';
for(const [p,vars] of Object.entries(perPage)) css+=`.pg-${p}{`+Object.entries(vars).map(([k,v])=>`${k}:${v}`).join(';')+'}\n';
fs.writeFileSync('src/styles/tokens.css',css);
fs.writeFileSync('src/theme/baseTokens.json',JSON.stringify({root,perPage}));
console.log(Object.keys(colors).length,'colors;',Object.keys(perPage));
