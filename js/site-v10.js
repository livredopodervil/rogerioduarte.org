const pages=[
 {tag:'01 / MEDICINA',title:'Medicina e assistência clínica',label:'MEDICINA',color:'#73e9db',description:'Médico com experiência no Sistema Único de Saúde, atuando em atenção primária, Medicina de Família e Comunidade, pronto atendimento, urgência, emergência e assistência hospitalar. A prática envolve avaliação clínica, tomada de decisão, prescrição, monitoramento e continuidade do cuidado.',points:['Atendimento clínico de adultos, com acompanhamento de condições agudas e crônicas.','Atuação em equipes multiprofissionais e diferentes níveis de complexidade assistencial.','Integração de raciocínio clínico, comunicação e documentação técnica.']},
 {tag:'02 / ASSISTÊNCIA',title:'Atenção primária e urgências',label:'ASSISTÊNCIA',color:'#9dc8ff',description:'Experiência em serviços de atenção primária e em ambientes hospitalares, incluindo assistência em situações de urgência e emergência. Trabalho voltado à avaliação de riscos, priorização de condutas, acompanhamento longitudinal e articulação com equipes de saúde.',points:['Atenção primária e acompanhamento de pacientes ao longo do tempo.','Avaliação e manejo inicial de apresentações agudas e condições clínicas complexas.','Comunicação entre profissionais e organização do cuidado.']},
 {tag:'03 / COMPUTAÇÃO',title:'Desenvolvimento de software',label:'SISTEMAS',color:'#d5a8ff',description:'Experiência de longa duração em computação, programação e análise de sistemas. Desenvolvimento de soluções web, ferramentas de automação, interfaces gráficas e aplicações interativas, com atenção à arquitetura modular, desempenho e capacidade de manutenção.',points:['JavaScript, Python, sistemas web, automação e integração de componentes.','Interfaces gráficas, computação espacial, simulação e visualização de dados.','Arquitetura de software, testes, documentação e ferramentas de desenvolvimento.']},
 {tag:'04 / TECNOLOGIA',title:'Dados, estatística e IA',label:'DADOS & IA',color:'#ffc995',description:'Aplicação de métodos quantitativos e computacionais à exploração de problemas. Interesse em estatística, aprendizado de máquina, redes neurais, modelos generativos e sistemas baseados em agentes, com ênfase na interpretação crítica dos resultados.',points:['Análise exploratória, representação de dados e comunicação visual.','Automação e prototipagem de ferramentas assistidas por inteligência artificial.','Avaliação de limites, pressupostos e verificabilidade de soluções técnicas.']},
 {tag:'05 / INVESTIGAÇÃO',title:'Pesquisa e pensamento científico',label:'PESQUISA',color:'#a5f1a3',description:'Trajetória interdisciplinar nas interfaces entre Medicina, Matemática, Ciências Sociais e Geociências. Interesse por fundamentos científicos, modelagem, métodos de investigação e problemas que exigem integrar conhecimentos de áreas diferentes.',points:['Leitura crítica de evidências e distinção entre dados, hipóteses e interpretações.','Matemática aplicada, estatística e análise de sistemas complexos.','Investigação orientada por perguntas claras e documentação reproduzível.']},
 {tag:'06 / COMUNICAÇÃO',title:'Comunicação e produção técnica',label:'COMUNICAÇÃO',color:'#ff9fb5',description:'Experiência em produção gráfica e audiovisual, edição, organização de conteúdo e comunicação técnica. Integração de linguagem, imagem e programação para apresentar informações complexas de maneira acessível, sem perder precisão.',points:['Documentação, escrita técnica e organização editorial.','Produção gráfica, audiovisual e recursos multimídia.','Visualizações e experiências interativas para públicos diversos.']},

 {tag:'07 / URGÊNCIAS',title:'Urgência e emergência',label:'URGÊNCIAS',description:'Atuação clínica em situações que exigem avaliação rápida, identificação de riscos e definição de prioridades assistenciais.',points:['Avaliação e estabilização inicial.','Decisões clínicas e trabalho em equipe.','Continuidade do cuidado e documentação.']},
 {tag:'08 / GENÉTICA',title:'Genética e biologia molecular',label:'GENÉTICA',description:'Interesse científico em genética, biologia molecular e nas relações entre mecanismos biológicos, informação e saúde.',points:['Fundamentos moleculares e hereditariedade.','Interpretação crítica de evidências.','Interfaces entre biologia e computação.']},
 {tag:'09 / MATEMÁTICA',title:'Matemática e modelagem',label:'MATEMÁTICA',description:'Aplicação de estruturas matemáticas, geometria, lógica e modelos formais à investigação de problemas científicos e computacionais.',points:['Geometria e representação espacial.','Modelagem de sistemas complexos.','Raciocínio quantitativo e métodos formais.']},
 {tag:'10 / GEOCIÊNCIAS',title:'Natureza, Terra e sistemas',label:'NATUREZA',description:'Interesse interdisciplinar em geociências, ecologia e processos naturais, considerando a relação entre sistemas físicos, biológicos e sociais.',points:['Ciências da Terra e ambiente.','Sistemas e interações em múltiplas escalas.','Visualização de fenômenos naturais.']},
 {tag:'11 / PUBLICAÇÕES',title:'Textos e publicações',label:'PUBLICAÇÕES',description:'Espaço para reunir artigos, notas técnicas, análises e materiais de divulgação de conhecimentos científicos e tecnológicos.',points:['Artigos e textos autorais.','Documentação e materiais técnicos.','Ensaios e análises interdisciplinares.']},
 {tag:'12 / CONTATO',title:'Contato profissional',label:'CONTATO',description:'Canal de contato para colaboração, comunicação profissional, desenvolvimento de software e projetos interdisciplinares.',points:['Medicina, ciência e tecnologia.','Projetos e colaboração técnica.','E-mail: rd@rogerioduarte.org']}
];


const $=s=>document.querySelector(s);
const cv=$('#scene'),viewport=$('#viewport');
let THREE,renderer,scene,camera,raycaster,worlds=[],faceMeshes=[],frame=0,last=0,drag=null,auto=true,zoom=1,active=0,transition=null,ready=false,focus=null;

import {mountRSS} from '../modules/rss-reader.js';
import {mountSocial} from '../modules/social-viewer.js';
// Registro declarativo: adicionar ou remover módulos exige somente manifest.json.
const manifest=await fetch('./modules/manifest.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Manifesto HTTP '+r.status);return r.json()});
if(manifest.schemaVersion!==1||!Array.isArray(manifest.modules))throw Error('Manifesto inválido');
const modules=await Promise.all(manifest.modules.map(async entry=>{
 if(!/^[a-z0-9_-]+$/.test(entry.id)||entry.src!==`./modules/${entry.id}.js`)throw Error('Caminho de módulo inválido');
 const m=(await import(`../modules/${entry.id}.js`)).default;
 if(m.id!==entry.id||!Array.isArray(m.menu)||m.menu.length!==12||!Array.isArray(m.position)||m.position.length!==3)throw Error('Contrato inválido: '+entry.id);
 return m;
}));
const links=manifest.links||[];
const V=new Array(12).fill(0).map((_,i)=>i);
function status(s){$('#status').textContent=s}
function modulePage(i){
 const m=modules[active];if(m.pages?.[i]){const p=m.pages[i];return {tag:m.name.toUpperCase()+' / '+String(i+1).padStart(2,'0'),title:p.title||m.menu[i],description:p.description||'',points:[],url:p.url};}
 if(active===0)return pages[i];
 if(m.feeds?.[i])return {tag:'NOTICIÁRIO / '+String(i+1).padStart(2,'0'),title:m.feeds[i].name,description:'Leitor RSS da fonte selecionada.',points:[]};
 return {tag:m.name.toUpperCase()+' / '+String(i+1).padStart(2,'0'),title:m.menu[i],description:'Conteúdo do módulo '+m.name+'.',points:[]};
}
function detail(i){
 if(i<0||i>=12)return;
 const m=modules[active],p=modulePage(i);
 $('#detail-title').textContent=p.title;$('#detail-tag').textContent=p.tag;$('#detail-description').textContent=p.description;
 $('#detail-image').src=m.texturePath?m.texturePath.replace('{n}',String(i+1).padStart(2,'0')):'./images/face-'+(i+1)+'.jpg';
 $('#detail-image').alt=p.title;
 $('#detail-points').replaceChildren(...(p.points||[]).map(t=>{const li=document.createElement('li');li.textContent=t;return li}));
 const rssHost=$('#rss-host');rssHost.replaceChildren();
 const social=m.widgets?.[i];rssHost.hidden=!(m.feeds?.[i]||social);
 if(social){mountSocial(rssHost,social);$('#detail-image').hidden=true;$('#detail-points').hidden=true;}
 else if(m.feeds?.[i]){mountRSS(rssHost,m.feeds[i]);$('#detail-image').hidden=true;$('#detail-points').hidden=true;}
 else{$('#detail-image').hidden=false;$('#detail-points').hidden=false;}
 const link=$('#detail-external');link.hidden=!p.url;
 if(p.url){const u=new URL(p.url,location.href);if(!['http:','https:'].includes(u.protocol))throw Error('URL inválida');link.href=u.href;link.textContent='Abrir '+p.title+' ↗';}
 $('#detail').hidden=false;document.body.classList.add('detail-open');$('#detail-close').focus();history.replaceState(null,'',`#${m.id}-${i+1}`);
}
function closeDetail(){if($('#detail').hidden)return;$('#rss-host')._socialCleanup?.();$('#rss-host').replaceChildren();$('#detail').hidden=true;document.body.classList.remove('detail-open');history.replaceState(null,'',location.pathname+location.search);cv.focus()}
$('#detail-close').onclick=closeDetail;$('#detail-home').onclick=closeDetail;
$('#home').onclick=()=>{closeDetail();travel(0)};
$('#about').onclick=()=>detail(0);
$('#contact').href='mailto:rd@rogerioduarte.org';
$('#pause').onclick=()=>{auto=!auto;$('#pause').textContent=auto?'Ⅱ Pausar':'▶ Animar';$('#pause').setAttribute('aria-pressed',String(auto))};
$('#fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen?.()};
$('#zoom-in').onclick=()=>{zoom=Math.max(.72,zoom-.12);setCameraGoal()};$('#zoom-out').onclick=()=>{zoom=Math.min(1.9,zoom+.12);setCameraGoal()};
$('#reset').onclick=()=>{worlds[active]?.group.quaternion.identity();zoom=1;setCameraGoal()};
$('#back-module').onclick=()=>travel(0);
addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#detail').hidden)closeDetail();else if(active)travel(0)}if(!$('#detail').hidden)return;const g=worlds[active]?.group;if(e.key==='ArrowLeft')g?.rotateY(-.2);if(e.key==='ArrowRight')g?.rotateY(.2);if(e.key==='ArrowUp')g?.rotateX(-.2);if(e.key==='ArrowDown')g?.rotateX(.2)});
// Miniatura tridimensional independente, fixada à interface (não à cena principal).
let mini=null;
function neighbors(i){const id=modules[i].id;return modules.map((m,j)=>j).filter(j=>j!==i&&links.some(([a,b])=>(a===id&&b===modules[j].id)||(b===id&&a===modules[j].id)));}
function graphMap(){if(mini)mini.update(active);}
function createMiniGraph(){
 const host=$('#graph-map');host.replaceChildren();
 const canvas=document.createElement('canvas');canvas.className='mini-canvas';canvas.setAttribute('aria-label','Grafo tridimensional girável. Arraste para girar e toque em um nó para navegar.');canvas.setAttribute('role','img');host.append(canvas);
 const miniRenderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 miniRenderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
 const miniScene=new THREE.Scene(), miniCamera=new THREE.PerspectiveCamera(42,1,.1,100);
 miniCamera.position.set(0,0,13.8);miniCamera.lookAt(0,0,0);
 const assembly=new THREE.Group();miniScene.add(assembly);
 const nodes=[],positions=[];
 const n=modules.length;
 modules.forEach((m,i)=>{
  const pos=i===0?new THREE.Vector3(0,0,0):new THREE.Vector3(3.5*Math.cos((i-1)*Math.PI*2/Math.max(1,n-1)),3.5*Math.sin((i-1)*Math.PI*2/Math.max(1,n-1)),i%2?.8:-.8);
  positions.push(pos);
  const mesh=new THREE.Mesh(new THREE.DodecahedronGeometry(i===0?.76:.62,0),new THREE.MeshStandardMaterial({color:m.color,metalness:.22,roughness:.45,emissive:m.color,emissiveIntensity:.12}));
  mesh.position.copy(pos);mesh.userData.index=i;assembly.add(mesh);nodes.push(mesh);
  const wire=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.45}));mesh.add(wire);
 });
 links.forEach(([a,b])=>{const ia=modules.findIndex(m=>m.id===a),ib=modules.findIndex(m=>m.id===b);if(ia<0||ib<0)return;const geom=new THREE.BufferGeometry().setFromPoints([positions[ia],positions[ib]]);assembly.add(new THREE.Line(geom,new THREE.LineBasicMaterial({color:0xabc9d3,transparent:true,opacity:.72})));});
 miniScene.add(new THREE.AmbientLight(0xffffff,1.5));const lamp=new THREE.DirectionalLight(0xffffff,2.1);lamp.position.set(3,5,8);miniScene.add(lamp);
 const ray=new THREE.Raycaster(),mouse=new THREE.Vector2();let down=null;
 canvas.addEventListener('pointerdown',e=>{e.stopPropagation();down={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!down)return;e.stopPropagation();const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(e.clientX-down.sx)+Math.abs(e.clientY-down.sy)>6)down.moved=true;assembly.rotation.y+=dx*.012;assembly.rotation.x+=dy*.012;down.x=e.clientX;down.y=e.clientY});
 canvas.addEventListener('pointerup',e=>{e.stopPropagation();if(!down)return;const moved=down.moved;down=null;if(moved)return;const r=canvas.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));ray.setFromCamera(mouse,miniCamera);const hit=ray.intersectObjects(nodes,false)[0];if(hit)travel(hit.object.userData.index)});
 canvas.addEventListener('pointercancel',()=>{down=null});
 canvas.addEventListener('wheel',e=>{e.preventDefault();e.stopPropagation();miniCamera.position.z=Math.max(9,Math.min(21,miniCamera.position.z+Math.sign(e.deltaY)*.8))},{passive:false});
 function size(){const r=host.getBoundingClientRect(),w=Math.max(1,Math.round(r.width)),h=Math.max(1,Math.round(r.height));miniRenderer.setSize(w,h,false);miniCamera.aspect=w/h;miniCamera.updateProjectionMatrix()}
 new ResizeObserver(size).observe(host);size();
 return {update(i){nodes.forEach((node,j)=>{node.material.emissiveIntensity=j===i?.75:.12;node.scale.setScalar(j===i?1.22:1)});},render(dt){if(!down)assembly.rotation.y+=dt*.075;nodes.forEach(x=>x.rotation.y+=dt*.18);miniRenderer.render(miniScene,miniCamera)}};
}
function arrange(){
 if(!worlds.length)return;
 const center=new THREE.Vector3(...modules[active].position);
 
 let k=0;
 worlds.forEach((w,i)=>{
   const visible=i===active||neighbors(active).includes(i);w.group.visible=visible;
   const j=k++;const angle=-Math.PI/2+2*Math.PI*j/Math.max(1,worlds.length-1);const offset=i===active?new THREE.Vector3():new THREE.Vector3(9.8*Math.cos(angle),7.5*Math.sin(angle),-2);
   w.goalPosition=center.clone().add(offset);
   w.goalScale=i===active?1:.16;
 });
}
function applyTheme(m){
 const t=m.theme||{};const r=document.documentElement;
 const vars={'--theme-base':t.base,'--theme-mid':t.mid,'--theme-text':t.text,'--theme-muted':t.muted,'--theme-panel':t.panel,'--theme-panel2':t.panel2,'--theme-bg':t.background?`url("${t.background}")`:null};
 for(const [key,value] of Object.entries(vars))if(value)r.style.setProperty(key,value);
 if(t.accent){r.style.setProperty('--accent',t.accent);}
 const meta=document.querySelector('meta[name="theme-color"]');if(meta&&t.base)meta.content=t.base;
}
function menu(){const m=modules[active];applyTheme(m);document.documentElement.style.setProperty('--accent',m.color);document.documentElement.style.setProperty('--accent-rgb',m.rgb);$('#module-title').innerHTML=m.title;$('#module-description').textContent=m.intro;$('#module-eyebrow').textContent=m.subtitle;$('#back-module').hidden=active===0;const nav=$('#module-menu');nav.replaceChildren(...m.menu.map((name,i)=>{const b=document.createElement('button');b.textContent=name;b.onclick=()=>detail(i);return b}));const rail=$('#module-rail');rail.replaceChildren(...neighbors(active).map(i=>{const x=modules[i];const b=document.createElement('button');b.textContent=(i===0?'◈ ':'⬟ ')+x.name;b.setAttribute('aria-current',String(i===active));b.onclick=()=>travel(i);return b}));graphMap();status(m.name.toUpperCase()+' · 12 FACES · SELECIONE UM SÓLIDO OU USE O GRAFO')}
function targetPosition(i){const p=modules[i].position;return new THREE.Vector3(p[0],p[1],p[2]+13.8*zoom)}
function setCameraGoal(){
 if(!camera)return;
 const end=targetPosition(active),endFocus=new THREE.Vector3(...modules[active].position);
 const start=camera.position.clone(),startFocus=focus.clone();
 const delta=end.clone().sub(start),length=delta.length();
 const side=new THREE.Vector3().crossVectors(delta,new THREE.Vector3(0,1,0));
 if(side.lengthSq()<.01)side.set(1,0,0);side.normalize();
 const arc=Math.min(4.5,length*.13);
 const middle=start.clone().lerp(end,.5).addScaledVector(side,arc).add(new THREE.Vector3(0,Math.min(2,length*.08),0));
 transition={start,middle,end,focusStart:startFocus,focusEnd:endFocus,from:performance.now(),duration:Math.min(1550,Math.max(700,750+length*24))};
}
function travel(i){if(i<0||i>=modules.length)return;closeDetail();active=i;menu();if(camera){arrange();setCameraGoal();}}
function texture(moduleIndex,i){const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');const m=modules[moduleIndex],t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;
 const grad=g.createRadialGradient(260,210,15,260,260,440);grad.addColorStop(0,m.color);grad.addColorStop(.42,moduleIndex===2?'#597b74':'#244c3a');grad.addColorStop(1,'#071a14');g.fillStyle=grad;g.fillRect(0,0,512,512);
 if(moduleIndex===0 || m.texturePath){const im=new Image();im.onload=()=>{g.drawImage(im,0,0,512,512);g.fillStyle='rgba(0,20,10,.70)';g.fillRect(0,302,512,104);g.fillStyle='#f7f9e7';g.textAlign='center';g.font='bold 29px system-ui';g.fillText(m.menu[i],256,370,440);t.needsUpdate=true};im.onerror=()=>{t.needsUpdate=true};im.src=m.texturePath?m.texturePath.replace('{n}',String(i+1).padStart(2,'0')):'./images/face-'+(i+1)+'.jpg'}
 else{g.strokeStyle=m.color;g.lineWidth=3;g.globalAlpha=.65;for(let r=35;r<300;r+=36){g.beginPath();g.arc(256,228,r,0,Math.PI*2);g.stroke()}for(let k=0;k<12;k++){const a=k*Math.PI/6;g.beginPath();g.moveTo(256,228);g.lineTo(256+270*Math.cos(a),228+270*Math.sin(a));g.stroke()}g.globalAlpha=1;g.fillStyle='#f9ffef';g.textAlign='center';g.font='bold 31px system-ui';g.fillText(m.menu[i],256,356,420);t.needsUpdate=true}return t}
function buildWorld(moduleIndex){const m=modules[moduleIndex],group=new THREE.Group();group.position.set(...m.position);scene.add(group);const ico=new THREE.IcosahedronGeometry(1,0),pos=ico.getAttribute('position'),vertices=[],triangles=[];
 function id(v){let k=vertices.findIndex(w=>w.distanceToSquared(v)<1e-8);if(k<0){k=vertices.length;vertices.push(v.clone())}return k}
 for(let k=0;k<pos.count;k+=3){const ids=[];for(let j=0;j<3;j++)ids.push(id(new THREE.Vector3().fromBufferAttribute(pos,k+j)));const center=vertices[ids[0]].clone().add(vertices[ids[1]]).add(vertices[ids[2]]).divideScalar(3);triangles.push({ids,center})}
 if(vertices.length!==12||triangles.length!==20)throw Error('Geometria inválida: '+vertices.length+'/'+triangles.length);
 const scale=4.25/.7946544723,meshes=[];
 vertices.forEach((normal,i)=>{const n=normal.clone().normalize(),pent=triangles.filter(t=>t.ids.includes(i)).map(t=>t.center.clone().multiplyScalar(scale));if(pent.length!==5)throw Error('Face inválida '+i);const center=pent.reduce((a,v)=>a.add(v),new THREE.Vector3()).divideScalar(5);const axis=Math.abs(n.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),u=axis.clone().cross(n).normalize(),v=n.clone().cross(u).normalize();pent.sort((a,b)=>Math.atan2(a.clone().sub(center).dot(v),a.clone().sub(center).dot(u))-Math.atan2(b.clone().sub(center).dot(v),b.clone().sub(center).dot(u)));const upright=pent[0].clone().sub(center).normalize(),right=upright.clone().cross(n).normalize();const radius=Math.max(...pent.map(q=>q.distanceTo(center))),xyz=[],uv=[],normals=[];for(let j=0;j<5;j++)for(const q of [center,pent[j],pent[(j+1)%5]]){xyz.push(q.x,q.y,q.z);uv.push(.5+q.clone().sub(center).dot(right)/(2*radius),.5+q.clone().sub(center).dot(upright)/(2*radius));normals.push(n.x,n.y,n.z)}const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(xyz,3));geom.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geom.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));const mesh=new THREE.Mesh(geom,new THREE.MeshBasicMaterial({map:texture(moduleIndex,i),side:THREE.DoubleSide}));mesh.userData={module:moduleIndex,section:i};group.add(mesh);meshes.push(mesh);faceMeshes.push(mesh);const edges=pent.map(q=>q.clone().addScaledVector(n,.035));edges.push(edges[0]);group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(edges),new THREE.LineBasicMaterial({color:m.color,transparent:true,opacity:.92}))) });
 const glow=new THREE.Mesh(new THREE.DodecahedronGeometry(4.28,0),new THREE.MeshBasicMaterial({color:m.color,transparent:true,opacity:.07,side:THREE.BackSide,depthWrite:false}));group.add(glow);group.rotation.set(.28+moduleIndex*.12,.4,.08);ico.dispose();return {group,meshes,goalPosition:group.position.clone(),goalScale:1}}
function resize(){if(!renderer)return;const r=viewport.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w/h<.8?66:45;camera.updateProjectionMatrix()}
function loop(now){frame=requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1000||.016);last=now;if(auto&&!drag&&!document.hidden){worlds.forEach((w,i)=>{w.group.rotateOnWorldAxis(new THREE.Vector3(0,1,0),dt*(i===active?.13:.075));w.group.rotateOnWorldAxis(new THREE.Vector3(1,0,0),dt*.045);w.group.rotateOnWorldAxis(new THREE.Vector3(0,0,1),dt*.022)})}worlds.forEach(w=>{w.group.position.lerp(w.goalPosition,1-Math.exp(-dt*8));const z=w.group.scale.x+(w.goalScale-w.group.scale.x)*(1-Math.exp(-dt*8));w.group.scale.setScalar(z)});if(transition){const t=Math.min(1,(now-transition.from)/transition.duration),e=t*t*t*(t*(t*6-15)+10);const a=transition.start.clone().multiplyScalar((1-e)*(1-e));const b=transition.middle.clone().multiplyScalar(2*(1-e)*e);const c=transition.end.clone().multiplyScalar(e*e);camera.position.copy(a.add(b).add(c));focus.copy(transition.focusStart).lerp(transition.focusEnd,e);if(t>=1)transition=null}camera.lookAt(focus);renderer.render(scene,camera);mini?.render(dt)}
async function init(){try{THREE=await import('https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js');renderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(45,1,.1,300);camera.position.set(0,0,13.8);focus=new THREE.Vector3(0,0,0);raycaster=new THREE.Raycaster();worlds=modules.map((_,i)=>buildWorld(i));arrange();worlds.forEach((w,i)=>{w.group.position.copy(w.goalPosition);w.group.scale.setScalar(w.goalScale)});resize();new ResizeObserver(resize).observe(viewport);mini=createMiniGraph();menu();ready=true;requestAnimationFrame(loop);
 cv.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:false};cv.setPointerCapture(e.pointerId)});
 cv.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(e.clientX-drag.sx)+Math.abs(e.clientY-drag.sy)>8)drag.moved=true;worlds[active].group.rotateOnWorldAxis(new THREE.Vector3(0,1,0),dx*.008);worlds[active].group.rotateOnWorldAxis(new THREE.Vector3(1,0,0),dy*.008);drag.x=e.clientX;drag.y=e.clientY});
 cv.addEventListener('pointerup',e=>{if(!drag)return;const moved=drag.moved;drag=null;if(moved)return;const r=cv.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1)),camera);const hit=raycaster.intersectObjects(faceMeshes,false)[0];if(hit){const {module,section}=hit.object.userData;if(module!==active)travel(module);else detail(section)}});
 cv.addEventListener('pointercancel',()=>drag=null);cv.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.min(1.9,Math.max(.72,zoom+Math.sign(e.deltaY)*.08));setCameraGoal()},{passive:false});if(matchMedia('(prefers-reduced-motion: reduce)').matches){auto=false;$('#pause').textContent='▶ Animar'}
 }catch(err){status('ERRO 3D: '+err.message);console.error(err);const fb=$('#fallback');fb.hidden=false;fb.textContent='Falha no 3D: '+err.message}}
init();
