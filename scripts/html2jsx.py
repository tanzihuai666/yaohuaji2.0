import re,sys,json
from bs4 import BeautifulSoup, Comment, NavigableString, Tag
VOID={'img','input','br','hr','meta','link','source','area','col','path','circle','rect','line','polyline','polygon','ellipse','stop','use'}
ATTR={'class':'className','for':'htmlFor','tabindex':'tabIndex','readonly':'readOnly','maxlength':'maxLength','minlength':'minLength','colspan':'colSpan','rowspan':'rowSpan','autocomplete':'autoComplete','autofocus':'autoFocus','enctype':'encType','viewbox':'viewBox','contenteditable':'contentEditable','srcset':'srcSet','crossorigin':'crossOrigin','datetime':'dateTime','inputmode':'inputMode'}
def camel(s): return re.sub(r'-([a-z])',lambda m:m.group(1).upper(),s)
def style_obj(s):
  out=[]
  for d in s.split(';'):
    if ':' not in d: continue
    k,v=d.split(':',1);k=k.strip();v=v.strip()
    if not k: continue
    key=k if k.startswith('--') else camel(k)
    out.append(f"{json.dumps(key, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}")
  return '{{'+', '.join(out)+'}}'
def esc(t):
  return t.replace('{','&#123;').replace('}','&#125;').replace('<','&lt;').replace('>','&gt;')
def attrs(tag):
  r=[]
  for k,v in tag.attrs.items():
    if k.startswith('on') or k in('data-alt',): continue
    if isinstance(v,list): v=' '.join(v)
    if k=='style': r.append(f'style={style_obj(v)}');continue
    if k=='src' and len(v)>150: r.append('src={IMG}');continue
    if k in('checked',) : r.append('defaultChecked');continue
    if k=='selected': continue
    if k=='value' and tag.name in('input','textarea'): r.append(f'defaultValue={json.dumps(v, ensure_ascii=False)}');continue
    if k in('disabled','required','multiple','hidden','autofocus'): r.append(ATTR.get(k,k));continue
    nk=ATTR.get(k,k)
    if ':' not in k and '-' in k and not k.startswith(('data-','aria-')): nk=camel(k)
    r.append(f'{nk}={json.dumps(v, ensure_ascii=False)}')
  return (' '+' '.join(r)) if r else ''
def conv(n,ind=0):
  p='  '*ind
  if isinstance(n,Comment): return ''
  if isinstance(n,NavigableString):
    t=str(n)
    if not t.strip(): return ''
    return p+esc(re.sub(r'\s+',' ',t).strip())+'\n'
  if n.name in('script','style','noscript'): return ''
  a=attrs(n)
  if n.name=='textarea':
    txt=n.get_text()
    return p+f'<textarea{a}'+(f' defaultValue={json.dumps(txt, ensure_ascii=False)}' if txt.strip() else '')+' />\n'
  if n.name=='select':
    sel=n.find('option',selected=True)
    if sel: a+=f' defaultValue={json.dumps(sel.get("value",sel.get_text()), ensure_ascii=False)}'
  kids=[c for c in n.children]
  if n.name in VOID or not kids: return p+f'<{n.name}{a} />\n'
  inner=''.join(conv(c,ind+1) for c in kids)
  if not inner.strip(): return p+f'<{n.name}{a} />\n'
  return p+f'<{n.name}{a}>\n'+inner+p+f'</{n.name}>\n'
h=open(sys.argv[1]).read()
s=BeautifulSoup(h,'lxml')
b=s.body
print(f'<div className="{" ".join(b.get("class",[]))}">')
for c in b.children: sys.stdout.write(conv(c,1))
print('</div>')
