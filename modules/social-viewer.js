// Widget social independente do motor 3D. Não inventa dados quando uma plataforma bloqueia incorporação.
const safe=(url)=>{const u=new URL(url,location.href);if(u.protocol!=='https:')throw Error('URL insegura');return u.href};
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n};
const link=(url,text)=>{const a=el('a','social-link',text);a.href=safe(url);a.target='_blank';a.rel='noopener noreferrer';return a};
export function mountSocial(host,config){
 host._socialCleanup?.(); host.replaceChildren();const root=el('div','social-widget'),status=el('p','social-status','Preparando visualização…'),content=el('div','social-content');
 const bar=el('div','social-bar'),reload=el('button','','↻ Atualizar'),external=link(config.url,'Abrir na plataforma ↗');
 bar.append(reload,external);root.append(bar,status,content);host.append(root);
 let generation=0; host._socialCleanup=()=>{generation++;content.replaceChildren()};
 const run=async()=>{const id=++generation;content.replaceChildren();status.textContent='Consultando conteúdo…';
 try{
 if(config.type==='blog'){
   // API pública JSONP do Blogger: funciona em sites estáticos sem proxy.
   const data=await new Promise((resolve,reject)=>{
     const cb='rdBlog_'+Date.now()+'_'+Math.floor(Math.random()*1e6);let done=false;
     const script=document.createElement('script');const timer=setTimeout(()=>finish(new Error('Tempo excedido')),10000);
     function finish(err,data){if(done)return;done=true;clearTimeout(timer);script.remove();delete window[cb];err?reject(err):resolve(data)}
     window[cb]=data=>finish(null,data);script.onerror=()=>finish(new Error('Feed indisponível'));
     script.src='https://livredopodervil.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=8&callback='+cb;
     document.head.append(script);
   });
   if(id!==generation)return;const posts=data.feed?.entry||[];
   for(const post of posts){const article=el('article','social-post'),h=el('h3');const url=post.link?.find(x=>x.rel==='alternate')?.href;
     if(url)h.append(link(url,post.title?.$t||'Publicação'));else h.textContent=post.title?.$t||'Publicação';
     const d=el('time','',post.published?.$t?new Date(post.published.$t).toLocaleString('pt-BR'):'');
     const summary=el('p');const html=post.summary?.$t||post.content?.$t||'';
     summary.textContent=new DOMParser().parseFromString(html,'text/html').body.textContent.trim().slice(0,350);
     article.append(h,d,summary);content.append(article);
   }
   status.textContent=posts.length?posts.length+' publicações recentes do blog.':'Feed sem publicações disponíveis.';
 }else if(config.type==='youtube'){
   // Usa cache atualizado pelo Actions; na ausência, exibe playlist pública de uploads do canal.
   let data=null;
   try {const r=await fetch('./data/social-latest.json?v='+Date.now(),{cache:'no-store'});if(r.ok)data=await r.json()}catch(_){/* fallback */}
   if(id!==generation||!host.isConnected)return;
   const videos=data?.youtube?.videos||[];
   const channelId=data?.youtube?.channelId||config.channelId;
   const v=videos.find(v=>/^[A-Za-z0-9_-]{11}$/.test(v.id));
   const frame=el('iframe','social-video');frame.loading='eager';frame.referrerPolicy='strict-origin-when-cross-origin';
   frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;
   if(v){frame.src='https://www.youtube.com/embed/'+encodeURIComponent(v.id);frame.title=v.title||'Vídeo recente';
     content.append(frame,el('h3','',v.title||'Vídeo recente'),link('https://www.youtube.com/watch?v='+v.id,'Assistir no YouTube'));
     status.textContent='Último vídeo identificado em '+(data.youtube.updated||'atualização anterior')+'.';
   }else if(/^UC[A-Za-z0-9_-]{22}$/.test(channelId||'')){
     frame.src='https://www.youtube.com/embed/videoseries?list=UU'+channelId.slice(2);frame.title='Vídeos recentes do canal';content.append(frame);
     status.textContent='Lista de vídeos do canal. O vídeo inicial depende da ordem do YouTube.';
   }else{content.append(el('p','','O canal ainda não foi identificado pelo atualizador. Execute a atualização no GitHub Actions.'));status.textContent='Identificador do canal indisponível.';}
 }else if(config.type==='x'){
   const account='https://twitter.com/livredopodervil';
   const anchor=link(account,'Publicações de @livredopodervil');anchor.className='twitter-timeline';anchor.setAttribute('data-height','540');anchor.setAttribute('data-theme','dark');content.append(anchor);
   // Widgets inseridos depois do carregamento da página exigem createTimeline ou load.
   const tw=await new Promise((resolve,reject)=>{
     if(window.twttr?.widgets?.createTimeline)return resolve(window.twttr);
     let script=document.querySelector('script[data-rd-x-widget]');
     if(!script){script=document.createElement('script');script.dataset.rdXWidget='1';script.src='https://platform.twitter.com/widgets.js';script.async=true;document.head.append(script)}
     let ticks=0;const poll=setInterval(()=>{if(window.twttr?.widgets?.createTimeline){clearInterval(poll);resolve(window.twttr)}else if(++ticks>=60){clearInterval(poll);reject(Error('Widget do X indisponível ou bloqueado'))}},200);
     script.addEventListener('error',()=>{clearInterval(poll);reject(Error('Script oficial do X bloqueado'))},{once:true});
   });
   if(id!==generation||!host.isConnected)return;
   await tw.widgets.createTimeline({sourceType:'profile',screenName:'livredopodervil'},content,{height:540,theme:'dark',chrome:'noheader nofooter'});
   if(id!==generation||!host.isConnected)return;
   anchor.remove();status.textContent='Timeline pública do X.';
 }else if(config.type==='facebook'){
   const frame=el('iframe','social-facebook');frame.loading='lazy';frame.title='Prévia do Facebook';
   frame.src='https://www.facebook.com/plugins/page.php?href='+encodeURIComponent(config.url)+'&tabs=timeline&width=500&height=520&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false';
   content.append(frame);status.textContent='Prévia oficial do Facebook, quando autorizada pelo perfil e navegador.';
 }else if(config.type==='instagram'){
   content.append(el('p','','O Instagram não disponibiliza uma incorporação pública confiável da timeline de um perfil. Abra o perfil para consultar as publicações recentes.'));
   status.textContent='Prévia limitada pelas políticas do Instagram.';
 }else{status.textContent='Links externos disponíveis.'}
 }catch(e){if(id!==generation)return;status.textContent='Prévia indisponível: '+e.message+'. Use “Abrir na plataforma”.';}
 };reload.onclick=run;run();
}
