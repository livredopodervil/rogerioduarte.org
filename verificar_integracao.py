#!/usr/bin/env python3
"""Validação não destrutiva da integração de Telemedicina. Python padrão/Termux."""
import json, re, subprocess, shutil, sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

root=Path(__file__).resolve().parent
errors=[]
def check(ok, message):
    if not ok:errors.append(message)
    print(('OK  ' if ok else 'ERRO')+' '+message)

try:
    manifest=json.loads((root/'modules/manifest.json').read_text(encoding='utf-8'))
except (OSError, ValueError) as e:
    sys.exit('Manifesto indisponível/inválido: '+str(e))
modules=manifest.get('modules',[])
ids=[m.get('id') for m in modules]
check(len(ids)==6 and len(set(ids))==6,'6 módulos únicos')
check(ids==['nucleo','conhecimento','sistemas','saude','futuro','telemedicina'],'ordem e identidade dos módulos originais preservadas')
for m in modules:
    check((root/m['src']).is_file(),'módulo '+m['id'])
edges=manifest.get('links',[])
check(len(edges)==11 and len({tuple(sorted(v)) for v in edges})==11,'11 arestas sem duplicação')
for a,b in [('nucleo','telemedicina'),('saude','telemedicina'),('sistemas','telemedicina')]:
    check([a,b] in edges or [b,a] in edges,'conexão '+a+' ↔ '+b)
for mod in ids:
    for i in range(1,13):
        name=f'images/face-{i}.jpg' if mod=='nucleo' else f'assets/modules/{mod}/face-{i:02d}.jpg'
        if not (root/name).is_file():errors.append('textura ausente: '+name)
check(not any(x.startswith('textura ausente') for x in errors),'72 texturas de faces')
for part in ['index.html','laboratorio/index.html','js/site-v10.js','assets/themes/telemedicina.svg','projetos/telemedicina/index.html']:
    check((root/part).is_file(),part)
files=list((root/'projetos/telemedicina/docs').glob('*.html'))
check(len(files)==8,'8 documentos HTML integrais')
class Assets(HTMLParser):
    def __init__(self):super().__init__();self.refs=[];self.base=None
    def handle_starttag(self,tag,attrs):
        for k,v in attrs:
            if not v:continue
            if tag=='base' and k=='href':self.base=v
            elif k in ('href','src'):self.refs.append(v)
from urllib.parse import urljoin, urlparse
broken=[]
for f in root.rglob('*.html'):
    parser=Assets();parser.feed(f.read_text(encoding='utf-8'))
    # Respeita <base href="../"> utilizado pelo antigo portal migrado.
    base=urljoin(f.resolve().as_uri(),parser.base) if parser.base else f.resolve().as_uri()
    for v in parser.refs:
        u=urlparse(urljoin(base,v))
        if u.scheme != 'file':continue
        q=Path(unquote(u.path))
        if not q.exists():broken.append(f'{f.relative_to(root)} => {v}')
check(not broken,'caminhos locais HTML resolvidos')
for v in broken[:10]:print('    '+v)
node=shutil.which('node')
if node:
    for f in [root/'js/site-v10.js',root/'modules/telemedicina.js',root/'modules/graph.js']:
        r=subprocess.run([node,'--check',str(f)],text=True,capture_output=True)
        check(r.returncode==0,'sintaxe JS: '+f.relative_to(root).as_posix())
        if r.returncode:print(r.stderr)
else:
    print('OBS node não instalado; verificação de sintaxe JS omitida')
print('\n'+('VALIDAÇÃO ESTÁTICA APROVADA' if not errors else f'VALIDAÇÃO REPROVADA: {len(errors)} itens'))
sys.exit(1 if errors else 0)
