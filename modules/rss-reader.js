// Leitor RSS autônomo; sem dependências do motor tridimensional.
export function mountRSS(host, feed) {
  host.replaceChildren();
  const wrap=document.createElement('div'); wrap.className='rss-reader';
  const head=document.createElement('div'); head.className='rss-head';
  const title=document.createElement('h3');title.textContent='Últimas notícias · '+feed.name;
  const reload=document.createElement('button');reload.textContent='Atualizar RSS';
  const source=document.createElement('a');source.href=feed.website;source.target='_blank';source.rel='noopener noreferrer';source.textContent='Abrir fonte oficial ↗';
  const note=document.createElement('p');note.className='rss-note';note.textContent='Carregando notícias…';
  const list=document.createElement('div');list.className='rss-items';
  head.append(title,reload,source);wrap.append(head,note,list);host.append(wrap);
  const safeUrl=(u)=>{try{const v=new URL(u);return ['https:','http:'].includes(v.protocol)?v.href:null}catch{return null}};
  const parse=(raw)=>{
    const xml=new DOMParser().parseFromString(raw,'application/xml');
    if(xml.querySelector('parsererror'))throw Error('XML inválido');
    const entries=[...xml.querySelectorAll('item, entry')].slice(0,24);
    if(!entries.length)throw Error('Nenhuma notícia disponível neste feed');
    return entries.map(item=>{
      const linkNode=item.querySelector('link');
      const link=linkNode?.getAttribute('href')||linkNode?.textContent?.trim()||'';
      const title=item.querySelector('title')?.textContent?.trim()||'Sem título';
      const date=item.querySelector('pubDate, published, updated')?.textContent?.trim()||'';
      const desc=item.querySelector('description, summary')?.textContent?.trim()||'';
      return {title,link:safeUrl(link),date,desc};
    });
  };
  async function load(){
    reload.disabled=true;note.textContent='Consultando RSS…';list.replaceChildren();
    // Tenta o proxy local (quando disponível) e dois serviços externos independentes.
    // GitHub Pages é estático: não pode buscar feeds bloqueados por CORS sem intermediário.
    const endpoints=[
      '/api/rss?url='+encodeURIComponent(feed.rss),
      'https://api.allorigins.win/raw?url='+encodeURIComponent(feed.rss),
      'https://api.codetabs.com/v1/proxy?quest='+encodeURIComponent(feed.rss)
    ];
    try{
      let raw=null,errors=[];
      for(const endpoint of endpoints){
        const controller=new AbortController();
        const timeout=setTimeout(()=>controller.abort(),6500);
        try{
          const response=await fetch(endpoint,{signal:controller.signal,cache:'no-store'});
          if(!response.ok)throw Error('HTTP '+response.status);
          const candidate=await response.text();
          parse(candidate); // valida antes de aceitar o intermediário
          raw=candidate;break;
        }catch(e){errors.push(e.message)}
        finally{clearTimeout(timeout)}
      }
      if(raw===null)throw Error('Fontes intermediárias indisponíveis: '+errors.join(' / '));
      const entries=parse(raw);
      entries.forEach(entry=>{
        const card=document.createElement('article');card.className='rss-item';
        const h=document.createElement('h4');const a=document.createElement('a');
        a.textContent=entry.title;a.href=entry.link||feed.website;a.target='_blank';a.rel='noopener noreferrer';h.append(a);card.append(h);
        if(entry.date){const d=document.createElement('time');const dt=new Date(entry.date);d.textContent=Number.isNaN(+dt)?entry.date:dt.toLocaleString('pt-BR');card.append(d)}
        if(entry.desc){const p=document.createElement('p');const tmp=new DOMParser().parseFromString(entry.desc,'text/html');p.textContent=(tmp.body.textContent||'').trim().slice(0,260);card.append(p)}
        list.append(card);
      });note.textContent=entries.length+' notícias recebidas de '+feed.name+'. Horários e manchetes são da fonte.';
    }catch(e){note.textContent='Não foi possível carregar este RSS no navegador ('+e.message+'). Algumas fontes bloqueiam acesso externo ou o serviço intermediário pode estar indisponível. Use o link da fonte oficial.';}
    finally{reload.disabled=false}
  }
  reload.onclick=load;load();
}
