#!/usr/bin/env node
/** Teste de contrato: executa a função modulePage() real com os 6 módulos × 12 faces. */
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const contentPages=(await import(pathToFileURL(join(root,'modules/content-pages.js')).href)).default;
const manifest=JSON.parse(readFileSync(join(root,'modules/manifest.json'),'utf8'));
const modules=await Promise.all(manifest.modules.map(async ({id})=>{
 const m=(await import(pathToFileURL(join(root,'modules',`${id}.js`)).href)).default;
 if(m.id!==id)throw Error(`ID incorreto ${id}`);
 return m;
}));
const source=readFileSync(join(root,'js/site-v10.js'),'utf8');
const start=source.indexOf('function modulePage(i){');
const end=source.indexOf('\nfunction mountEditorialContent(',start);
if(start<0||end<0)throw Error('Função modulePage não encontrada no motor');
const actual=source.slice(start,end);
const modulePage=new Function('modules','contentPages','pages','active',`${actual}; return modulePage;`);
let tested=0,failures=[],linksChecked=0;
for(let n=0;n<modules.length;n++){
 const fn=modulePage(modules,contentPages,[],n);
 for(let i=0;i<12;i++){
  const m=modules[n];
  try{
   const p=fn(i);
   if(!p || !p.title || !p.description)throw Error('painel sem título/descrição');
   const urls=[p.url,p.articleUrl,...(p.documents||[]).map(x=>x.url)].filter(Boolean);
   if(!urls.length)throw Error('face sem destino de conteúdo');
   for(const u of urls){
    const parsed=new URL(u,'https://rogerioduarte.org/');
    if(!['https:','http:'].includes(parsed.protocol))throw Error('protocolo inválido '+u);
    if(parsed.hostname==='rogerioduarte.org'){
      const filename=parsed.pathname.endsWith('/')?parsed.pathname+'index.html':parsed.pathname;
      const path=resolve(root,'.'+filename);
      if(!path.startsWith(root+'/')||!existsSync(path))throw Error('recurso local inexistente '+parsed.pathname);
    }
    linksChecked++;
   }
   tested++;
  }catch(e){failures.push(`${m.id} face ${i+1}: ${e.message}`);}
 }
}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`OK: ${tested} faces (6 × 12), ${linksChecked} referências válidas no motor real`);
