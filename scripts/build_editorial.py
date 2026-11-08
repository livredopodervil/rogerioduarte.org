#!/usr/bin/env python3
"""Compila Markdown editorial (subconjunto) em páginas HTML estáticas e catálogo JS.
Dependências: Python 3 stdlib. Uso: python scripts/build_editorial.py
Não edita index.html, motor 3D, manifesto, portfólio ou aplicativos externos.
"""
from __future__ import annotations
import json, html, re, sys
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parent.parent
SRC=ROOT/'content-src'; OUT=ROOT/'conteudos'
DATA=json.loads((SRC/'catalog.json').read_text(encoding='utf-8'))
assert DATA['schemaVersion']==1
MODS={m['id']:m for m in DATA['modules']}
assert len(DATA['entries'])==72

def safe_link(url):
    url=url.strip()
    if re.match(r'(?i)^(https?://|mailto:|\.{1,2}/|/|#)',url) and not re.search(r'[\x00-\x1f<>"\']',url):
        return html.escape(url,quote=True)
    return '#'

def inline(text):
    # tokenized links to avoid accidentally accepting HTML from Markdown sources
    links=[]
    def stash(m):
        idx=len(links);links.append((m.group(1),m.group(2)));return f'\uE000{idx}\uE001'
    text=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',stash,text)
    text=html.escape(text)
    text=re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',text)
    text=re.sub(r'`([^`]+)`',r'<code>\1</code>',text)
    for i,(label,url) in enumerate(links):
        anchor=f'<a href="{safe_link(url)}"'+(' rel="noopener noreferrer" target="_blank"' if url.startswith('https://') else '')+f'>{html.escape(label)}</a>'
        text=text.replace(f'\uE000{i}\uE001',anchor)
    return text

def render_md(text):
    out=[];paragraph=[];items=[]
    def flush():
        if paragraph:out.append('<p>'+inline(' '.join(paragraph))+'</p>');paragraph.clear()
        if items:out.append('<ul>' + ''.join('<li>'+inline(item)+'</li>' for item in items) + '</ul>');items.clear()
    for raw in text.splitlines():
        line=raw.strip()
        if not line:flush();continue
        if line.startswith('# '):flush();out.append('<h1>'+inline(line[2:])+'</h1>')
        elif line.startswith('## '):flush();out.append('<h2>'+inline(line[3:])+'</h2>')
        elif line.startswith('### '):flush();out.append('<h3>'+inline(line[4:])+'</h3>')
        elif line.startswith('!['):
            # Figure Markdown: only full-line image syntax, escaped and filtered.
            match=re.fullmatch(r'!\[([^\]]{1,350})\]\(([^)]+)\)', line)
            if match:
                flush()
                alt,url=match.groups()
                if re.search(r'(?i)\.(png|jpe?g|webp|svg)$',url) and url.startswith(('../','./','/')):
                    out.append('<figure style="margin:30px 0"><img src="'+safe_link(url)+'" alt="'+html.escape(alt,quote=True)+'" loading="lazy" decoding="async" style="width:100%;height:auto;border-radius:14px;border:1px solid #d9e9ec;display:block"></figure>')
                else:
                    out.append('<p>Ilustração não disponível.</p>')
            else:
                if items:flush()
                paragraph.append(line)
        elif line.startswith('- '):
            if paragraph:flush()
            items.append(line[2:])
        else:
            if items:flush()
            paragraph.append(line)
    flush();return '\n'.join(out)

CSS='''
:root{--ink:#173a4a;--muted:#566f79;--cyan:#087f99;--leaf:#3b7950;--line:#d9e9ec;--serif:Garamond,"EB Garamond",Baskerville,Georgia,serif;--sans:Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
*{box-sizing:border-box}[hidden]{display:none!important}html{scroll-behavior:smooth}body{margin:0;background:#f8fcfd;color:var(--ink);font:19px/1.68 var(--serif)}a{color:#086f88}a:hover{text-decoration-thickness:2px}a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid var(--leaf);outline-offset:3px}
header{position:sticky;top:0;z-index:5;background:#fffefef2;border-bottom:1px solid var(--line);backdrop-filter:blur(14px)}.top{width:min(1130px,calc(100% - 36px));margin:auto;min-height:68px;display:flex;align-items:center;gap:18px;flex-wrap:wrap}.brand{margin-right:auto;text-decoration:none;color:var(--ink);font:750 17px var(--sans)}nav{display:flex;align-items:center;flex-wrap:wrap;gap:8px}nav a{font:650 12px var(--sans);text-decoration:none;color:#315b6a;padding:9px 12px;border-radius:18px}nav a:hover{background:#e1f4f6}
main{width:min(1050px,calc(100% - 36px));margin:35px auto 75px}.kicker{font:750 11px var(--sans);color:var(--leaf);text-transform:uppercase;letter-spacing:.13em}.intro{font-size:clamp(20px,2.3vw,26px);line-height:1.5;color:#4c6c77;max-width:800px}
h1,h2,h3{font-family:var(--sans);letter-spacing:-.045em}h1{font-size:clamp(37px,6vw,62px);line-height:1.08;max-width:820px;margin:17px 0 18px}h2{font-size:clamp(22px,3vw,31px);line-height:1.25;margin:34px 0 10px}h3{font-size:20px}.article-layout{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:clamp(20px,6vw,90px);align-items:start}.body{min-width:0}.body p{margin:0 0 23px}.body ul{padding-left:24px}.body li{margin:6px 0}.body h2{scroll-margin-top:88px}.body a{overflow-wrap:anywhere}.sidebar{position:sticky;top:88px;border:1px solid var(--line);border-radius:16px;background:white;padding:22px}.sidebar b{font:700 12px var(--sans);color:var(--cyan)}.sidebar p{font:15px/1.55 var(--serif);color:var(--muted)}.sidebar a{font:600 13px/1.4 var(--sans);display:block;margin:11px 0}.eyebrow{font:650 12px var(--sans);text-transform:uppercase;letter-spacing:.1em;color:var(--leaf)}
.page{background:white;border:1px solid var(--line);border-radius:22px;padding:clamp(22px,5vw,54px);box-shadow:0 14px 50px #175b6b0a}.pagenav{display:flex;justify-content:space-between;gap:15px;border-top:1px solid var(--line);padding-top:20px;margin-top:30px}.pagenav a{font:650 12px var(--sans)}.notice{background:#eef8f1;border-left:4px solid var(--leaf);padding:12px 18px;font:15px/1.5 var(--sans);margin:25px 0}.hero{padding:35px 0 27px}.controls{display:flex;flex-wrap:wrap;gap:10px;margin:25px 0 32px}.controls input,.controls select{border:1px solid #b6d9df;border-radius:10px;padding:13px;font:15px var(--sans);background:white;color:var(--ink)}.controls input{flex:1;min-width:200px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:20px;display:flex;flex-direction:column;gap:10px;min-height:208px;box-shadow:0 6px 22px #165d6a0a}.card a{font:700 18px/1.25 var(--sans);text-decoration:none;color:var(--ink)}.card a:hover{color:var(--cyan)}.card p{font-size:16px;line-height:1.45;color:var(--muted);margin:0;flex:1}.pill{font:700 10px var(--sans);border-radius:18px;background:#e8f7f6;color:#17728a;padding:6px 10px;align-self:flex-start}.footer{border-top:1px solid var(--line);padding:27px 18px;text-align:center;font:12px/1.6 var(--sans);color:#67838b;background:white}.hidden{display:none!important}
@media(max-width:820px){.article-layout{display:block}.sidebar{position:static;margin-top:22px}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){body{font-size:18px}.top{gap:4px;min-height:62px}.brand{width:100%;margin-top:8px}.top nav a{padding:6px 8px;font-size:11px}.grid{grid-template-columns:1fr}.page{border-radius:12px}.controls{display:grid}.controls input{min-width:0}}
'''

STYLE=f'<style>{CSS}</style>'
HEAD='''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f8fcfd"><meta name="robots" content="index,follow"><link rel="icon" href="/favicon.svg" type="image/svg+xml">'''
TOP='''<header><div class="top"><a class="brand" href="/">RD · Rogério Duarte</a><nav aria-label="Navegação principal"><a href="/">Início</a><a href="/conteudos/">Caderno</a><a href="/projetos/">Projetos</a><a href="/laboratorio/">Laboratório 3D</a><a href="mailto:rd@rogerioduarte.org">Contato</a></nav></div></header>'''
FOOT='''<footer class="footer">Rogério Duarte · Medicina, ciência e tecnologia · Conteúdos de caráter editorial e educativo. As páginas de saúde não substituem atendimento individual.</footer>'''

def shell(title,description,body,url):
    # These absolute URLs assume apex domain; local preview also works.
    full='https://rogerioduarte.org/'+url.lstrip('/')
    desc=description.replace('\n',' ').strip()[:250]
    rendered = HEAD+f'<title>{html.escape(title)} · Rogério Duarte</title><meta name="description" content="{html.escape(desc,quote=True)}"><link rel="canonical" href="{html.escape(full,quote=True)}"><meta property="og:title" content="{html.escape(title,quote=True)}"><meta property="og:description" content="{html.escape(desc,quote=True)}"><meta property="og:url" content="{html.escape(full,quote=True)}"><meta property="og:type" content="article"><meta property="og:image" content="https://rogerioduarte.org/assets/og-preview.jpg">'+STYLE+'</head><body>'+TOP+body+FOOT+'</body></html>'
    # Todas as rotas internas são relativas, inclusive no teste via file/http local.
    prefix='../'*max(0,len([x for x in ((url.rstrip('/')+'/index.html') if url.endswith('/') else url).split('/') if x])-1)
    return rendered.replace('href="/', 'href="'+prefix)

ENTRIES=DATA['entries']
PER={m:[e for e in ENTRIES if e['module']==m] for m in MODS}
for e in ENTRIES:
    module,slug=e['module'],e['slug'];group=PER[module];i=e['index'];name=MODS[module]['name']
    source=SRC/module/f'{slug}.md';content=source.read_text(encoding='utf-8')
    assert content.startswith('# '+e['title']+'\n')
    prev,nxt=group[(i-1)%12],group[(i+1)%12]
    intro=f'<div class="kicker">Caderno de estudos / {html.escape(name)} / Face {i+1:02d}</div>'
    notice='<div class="notice">Texto de estudo e documentação, sujeito a revisão. Informações de saúde são educativas; funcionalidades de projetos e endereços externos devem ser verificadas antes do uso.</div>'
    sidenav=f'''<aside class="sidebar"><b>{html.escape(name)}</b><p>Este artigo complementa a face {i+1:02d} do atlas espacial. O laboratório funciona como índice visual; a leitura permanece disponível sem WebGL.</p><a href="/laboratorio/#{module}-{i+1}">Abrir face no laboratório 3D</a><a href="/conteudos/">Ver os 72 textos</a><a href="/conteudos/#{module}">Ver seção no catálogo</a><a href="/projetos/">Ver projetos e aplicativos</a></aside>'''
    nav=f'<nav class="pagenav" aria-label="Textos da mesma seção"><a href="/conteudos/{module}/{prev["slug"]}.html">← {html.escape(prev["title"])}</a><a href="/conteudos/{module}/{nxt["slug"]}.html">{html.escape(nxt["title"])} →</a></nav>'
    body=f'<main><div class="article-layout"><div class="body"><div class="page">{intro}<article>{render_md(content)}</article>{notice}{nav}</div></div>{sidenav}</div></main>'
    page=shell(e['title'],e['summary'],body,f'/conteudos/{module}/{slug}.html')
    out=OUT/module/f'{slug}.html';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(page,encoding='utf-8')

cards=[]
for e in ENTRIES:
   module=e['module']
   cards.append(f'<article class="card" data-module="{module}" data-search="{html.escape((e["title"]+" "+e["summary"]+" "+MODS[module]["name"]).casefold(),quote=True)}"><span class="pill">{html.escape(MODS[module]["name"])} · {e["index"]+1:02d}</span><a href="/{e["url"].removeprefix("./")}">{html.escape(e["title"])}</a><p>{html.escape(e["summary"])}</p></article>')
opts=''.join(f'<option value="{m}">{html.escape(MODS[m]["name"])}</option>' for m in MODS)
body=f'''<main><section class="hero"><div class="kicker">Conhecimento / Portfólio editorial</div><h1>Caderno de estudos</h1><p class="intro">Fundamentos, métodos, exemplos e projetos. São 72 textos em seis áreas, com acesso por assunto ou pelas faces do laboratório tridimensional.</p><p>Os artigos combinam explicações técnicas e notas de desenvolvimento. Documentos específicos, aplicativos e publicações externas permanecem identificados separadamente; os textos não presumem resultados nem validações inexistentes.</p></section><div class="controls"><label for="search" class="hidden">Buscar conteúdo</label><input id="search" type="search" aria-label="Buscar por título ou assunto" placeholder="Buscar título ou assunto..."><label for="module" class="hidden">Filtrar área</label><select id="module" aria-label="Filtrar área"><option value="">Todas as áreas</option>{opts}</select><span id="count" role="status" aria-live="polite" style="font:650 13px var(--sans);align-self:center">72 textos</span></div><section id="grid" class="grid">{''.join(cards)}</section></main><script>(()=>{{const q=document.getElementById('search'),m=document.getElementById('module'),cards=[...document.querySelectorAll('.card')],count=document.getElementById('count');const update=()=>{{const query=q.value.toLocaleLowerCase('pt-BR').trim();let shown=0;for(const card of cards){{const visible=(!m.value||card.dataset.module===m.value)&&(!query||card.dataset.search.includes(query));card.hidden=!visible;if(visible)shown++;}}count.textContent=shown+' texto'+(shown===1?'':'s');}};q.addEventListener('input',update);m.addEventListener('change',update);const hash=location.hash.slice(1);if([...m.options].some(o=>o.value===hash))m.value=hash;update();}})();</script>'''
(OUT/'index.html').write_text(shell('Caderno de estudos','Ensaios de medicina, saúde, computação, ciência, ferramentas e comunicação.',body,'/conteudos/'),encoding='utf-8')

# The lab consumes metadata generated from the same catalog; avoid duplicating manual text in modules.
source='/* Gerado de content-src/catalog.json por scripts/build_editorial.py. Não editar à mão. */\nexport default '+json.dumps({m:[{'title':e['title'],'description':e['summary'],'points':['Fundamentos e método','Aplicação e exemplo','Limites e próximos desenvolvimentos'],'url':e['url']} for e in PER[m]] for m in MODS},ensure_ascii=False,indent=2)+';\n'
(ROOT/'modules'/'content-pages.js').write_text(source,encoding='utf-8')
print('OK:',len(ENTRIES),'artigos, índice filtrável e módulos/content-pages.js gerados')
