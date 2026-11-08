#!/usr/bin/env node
/** Testa a abertura real do painel de detalhes, inclusive RSS e documentos, sem WebGL. */
import { readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const cp=(await import(pathToFileURL(join(root,'modules/content-pages.js')).href)).default;
const manifest=JSON.parse(readFileSync(join(root,'modules/manifest.json')));
const modules=await Promise.all(manifest.modules.map(async m=>(await import(pathToFileURL(join(root,'modules',`${m.id}.js`)).href)).default));
const src=readFileSync(join(root,'js/site-v10.js'),'utf8');
const a=src.indexOf('function modulePage(i){'),b=src.indexOf('\nfunction closeDetail(){',a);
if(a<0||b<0)throw Error('Trecho de navegação não encontrado');
class Element {
 constructor(tag='div'){this.tag=tag;this.children=[];this.dataset={};this.hidden=false;this.classList={add(){},remove(){}};}
 replaceChildren(...items){this.children=items}
 append(...items){this.children.push(...items)}
 setAttribute(name,value){this[name]=value}
 addEventListener(name,fn){this[name]=fn}
 focus(){}
}
let opened=0,links=0;
for(let active=0;active<modules.length;active++){
 const elems=Object.create(null);
 const $=id=>(elems[id]??=(new Element(id)));
 const document={baseURI:'https://rogerioduarte.org/',body:new Element('body'),createElement:name=>new Element(name)};
 const factory=new Function('modules','contentPages','pages','active','$','document','history','location','mountRSS','mountSocial',`${src.slice(a,b)};return {detail,modulePage}`);
 const {detail}=factory(modules,cp,[],active,$,document,{replaceState(){}},{href:'https://rogerioduarte.org/laboratorio/',pathname:'/laboratorio/',search:''},()=>{},()=>{});
 for(let i=0;i<12;i++){
  detail(i);
  if($('#detail').hidden)throw Error('Painel não abriu: '+modules[active].id+'/'+i);
  if(!$('#detail-title').textContent)throw Error('Título ausente: '+modules[active].id+'/'+i);
  const candidates=[];
  function find(node){if(node.tag==='a' && node.href)candidates.push(node.href);for(const child of node.children??[])find(child)}
  find($('#detail-project'));
  if(!$('#detail-external').hidden)candidates.push($('#detail-external').href);
  if(!candidates.length)throw Error('Sem links: '+modules[active].id+'/'+i);
  links+=candidates.length;opened++;
 }
}
console.log(`OK: ${opened} painéis abertos, ${links} links na interface e nenhuma exceção`);
