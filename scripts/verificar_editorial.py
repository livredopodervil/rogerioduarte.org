#!/usr/bin/env python3
"""Vistoria do Caderno e do atlas, compatível com 6 ou mais módulos (Studio)."""
from __future__ import annotations
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlparse,unquote
import json,subprocess,shutil,sys,re
ROOT=Path(__file__).resolve().parent.parent
BAD=[]
def test(cond,label):
 print(('OK   ' if cond else 'FALHA ')+label)
 if not cond:BAD.append(label)
class Parser(HTMLParser):
 def __init__(self): super().__init__();self.base=None;self.urls=[];self.headings=[]
 def handle_starttag(self,tag,attrs):
  for k,v in attrs:
   if not v:continue
   if tag=='base' and k=='href':self.base=v
   elif k in ('src','href') and tag not in ('meta',):self.urls.append(v)
  if tag in ('h1','h2'):self.headings.append(tag)
manifest=json.loads((ROOT/'modules/manifest.json').read_text())
ids=[x['id'] for x in manifest['modules']]
expected=['nucleo','conhecimento','sistemas','saude','futuro','telemedicina']
test(all(m in ids for m in expected),'módulos originais presentes')
test(len(set(ids))==len(ids),'identificadores únicos')
test(all(len(e)==2 and a in ids and b in ids and a!=b for e in manifest.get('links',[]) for a,b in [e]),'grafo sem arestas inválidas')
cat=json.loads((ROOT/'content-src/catalog.json').read_text())
rows=cat['entries']
test(len(rows)==72,'72 artigos no catálogo')
test(len({(x['module'],x['slug']) for x in rows})==72,'rotas do catálogo distintas')
test(all(len([x for x in rows if x['module']==m])==12 for m in expected),'12 faces por módulo')
errors=[];parsecount=0
for x in rows:
 module,slug=x['module'],x['slug']
 src=ROOT/'content-src'/module/(slug+'.md')
 file=ROOT/'conteudos'/module/(slug+'.html')
 if not src.is_file() or not file.is_file():errors.append(f'ausente {module}/{slug}');continue
 md=src.read_text();s=file.read_text();p=Parser();p.feed(s)
 if md.count('## ')<3 or len(md.split())<100:errors.append('artigo insuficiente '+module+'/'+slug)
 if p.headings.count('h1')!=1 or p.headings.count('h2')<3:errors.append('html sem estrutura '+module+'/'+slug)
 parsecount+=1
 for u in p.urls:
  base=urljoin(file.resolve().as_uri(),p.base) if p.base else file.resolve().as_uri()
  dest=urlparse(urljoin(base,u))
  if dest.scheme=='file':
   target=Path(unquote(dest.path));target=target/'index.html' if target.is_dir() else target
   if not target.exists():errors.append(f'link inválido {module}/{slug}: {u}')
test(parsecount==72 and not errors,'72 artigos estruturados e links locais válidos')
for i in errors[:12]:print('     ',i)
test((ROOT/'conteudos/index.html').is_file(),'índice e pesquisa de conteúdos')
test((ROOT/'editorial/DIAGNOSTICO.md').is_file(),'diagnóstico editorial')
test((ROOT/'modules/content-pages.js').is_file(),'catálogo JS do atlas')
test('RD-EDITORIAL-ATLAS-V1' in (ROOT/'js/site-v10.js').read_text(),'motor 3D integrado ao catálogo')
test('RD-EDITORIAL-ATLAS-V1' in (ROOT/'index.html').read_text(),'página inicial integrada ao caderno')
node=shutil.which('node')
if node:
 for name in ['js/site-v10.js','modules/content-pages.js']:
  r=subprocess.run([node,'--check',str(ROOT/name)],capture_output=True,text=True)
  test(r.returncode==0,'sintaxe JavaScript '+name)
  if r.returncode:print(r.stderr[:800])
else:print('INFO node ausente; pulando a validação JS')
print(('VISTORIA EDITORIAL APROVADA' if not BAD else 'VISTORIA REPROVADA: '+str(len(BAD))))
sys.exit(bool(BAD))
