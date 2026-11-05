import {EventBus} from '../spatialseed/EventBus.js';
import {resolveEditorOrbitEnabled} from '../spatialseed/EditorOrbitPolicy.js';
import {PickingIdAllocator} from '../spatialseed/PickingIdAllocator.js';

const $=s=>document.querySelector(s), bus=new EventBus(), picking=new PickingIdAllocator();
const pages=[
 {id:'medicina',tag:'01 / MEDICINA',title:'Medicina e cuidado',short:'ATENÇÃO À SAÚDE',color:'#73e7da',body:'Experiência profissional no Sistema Único de Saúde, com atuação em atenção primária, Medicina de Família e Comunidade, pronto atendimento, urgência, emergência e assistência hospitalar. A prática clínica combina avaliação de necessidades, tomada de decisão e acompanhamento de pessoas em diferentes contextos de cuidado.',points:['Atendimento clínico de adultos e acompanhamento longitudinal de condições agudas e crônicas.','Experiência em equipes multiprofissionais, ambiente hospitalar e serviços de urgência.','Interesse em soluções digitais que melhorem fluxos assistenciais, comunicação e qualidade da informação.'],url:'mailto:rd@rogerioduarte.org?subject=Medicina%20e%20saude',link:'Contato profissional ↗'},
 {id:'software',tag:'02 / COMPUTAÇÃO',title:'Software, dados e IA',short:'ENGENHARIA DE SISTEMAS',color:'#91b7ff',body:'Desenvolvimento de software, automação e interfaces interativas, integrando programação, matemática aplicada, estatística e análise de sistemas. Experiência com linguagens de diferentes gerações e com aplicações contemporâneas de inteligência artificial e computação gráfica.',points:['Arquiteturas modulares, JavaScript, Python, desenvolvimento web e ferramentas de automação.','Visualização de dados, interfaces gráficas, simulação e sistemas baseados em agentes.','Modelagem e implementação orientadas a problemas reais, com atenção à verificabilidade.'],url:'https://github.com/livredopodervil',link:'Repositórios públicos ↗'},
 {id:'spatialseed',tag:'03 / PROJETO',title:'SpatialSeed',short:'LABORATÓRIO ESPACIAL',color:'#e1a1ff',body:'Projeto independente de criação e manipulação espacial. Seu arcabouço reúne módulos para cenas, transformações, seleção, interação, geometria e execução de aplicações gráficas. Este portfólio utiliza conceitos e módulos de sua arquitetura, mas permanece uma aplicação independente.',points:['Monorepositório com módulos ES nativos e arquitetura orientada a componentes.','Experimentação com ambientes 3D, ferramentas de edição e interações espaciais.','O repositório original e sua página de entrada não são substituídos pelo portfólio.'],url:'https://github.com/livredopodervil/SpatialSeed',link:'Acessar SpatialSeed original ↗'},
 {id:'pesquisa',tag:'04 / INVESTIGAÇÃO',title:'Pesquisa e análise',short:'MÉTODO E EVIDÊNCIA',color:'#ffd18c',body:'Interesse interdisciplinar em fundamentos científicos, matemática, estatística, políticas públicas, tecnologia e sistemas complexos. A abordagem busca distinguir evidências, hipóteses e interpretações, favorecendo modelos claros e decisões justificáveis.',points:['Leitura crítica, avaliação de evidências e análise quantitativa.','Investigação de problemas nas interfaces entre saúde, ciência e tecnologia.','Comunicação técnica, documentação e produção de materiais explicativos.'],url:'mailto:rd@rogerioduarte.org?subject=Pesquisa%20e%20analise',link:'Propor colaboração ↗'},
 {id:'comunicacao',tag:'05 / COMUNICAÇÃO',title:'Comunicação e criação',short:'LINGUAGEM E VISUALIZAÇÃO',color:'#ff9fa8',body:'Experiência em comunicação, produção gráfica e audiovisual, edição e organização de conteúdo. A integração entre linguagem, imagem e programação permite construir explicações e experiências interativas adequadas a diferentes públicos.',points:['Produção visual, organização editorial e documentação de projetos.','Interfaces multimídia, gráficos interativos e apresentações técnicas.','Comunicação de temas complexos com estrutura e clareza.'],url:'mailto:rd@rogerioduarte.org?subject=Comunicacao%20e%20projetos',link:'Conversar sobre projetos ↗'}
];
$('#year').textContent=new Date().getFullYear();
let active=0,overview=true,sound=false,motion=!matchMedia('(prefers-reduced-motion: reduce)').matches,ctx=null,lastAudio=0;
const nav=$('#navbuttons'),canvas=$('#scene');
for(const [i,p] of pages.entries()){picking.idFor(p.id);const b=document.createElement('button');b.textContent=`${i+1} · ${p.short.split(' ')[0]}`;b.dataset.index=i;b.addEventListener('click',()=>focus(i));nav.append(b)}
function tone(type='tap'){
 if(!sound||performance.now()-lastAudio<75)return;lastAudio=performance.now();
 try{ctx??=new (window.AudioContext||window.webkitAudioContext)();ctx.resume();const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';const hz=type==='travel'?410:type==='scroll'?260:580;o.frequency.setValueAtTime(hz,t);o.frequency.exponentialRampToValueAtTime(hz*(type==='travel'?1.18:.92),t+.09);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.008,t+.009);g.gain.exponentialRampToValueAtTime(.0001,t+.12);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.13)}catch(e){console.debug(e)}
}
function fill(i){const p=pages[i];$('#kicker').textContent=p.tag;$('#heading').textContent=p.title;$('#description').textContent=p.body;$('#points').replaceChildren(...p.points.map(s=>{const li=document.createElement('li');li.textContent=s;return li}));$('#action').textContent=p.link;$('#action').href=p.url;$('#meta-title').textContent=`${i+1} de ${pages.length} · ${p.short}`;$('#meta-text').textContent='A câmera permanece alinhada ao painel selecionado. Use as setas para navegar, arraste para explorar ou toque em Galeria para visualizar o conjunto.';nav.querySelectorAll('[data-index]').forEach(b=>b.classList.toggle('active',Number(b.dataset.index)===i&&!overview))}
function focus(i){active=(i+pages.length)%pages.length;overview=false;fill(active);tone('travel');bus.emit('gallery:focus',{id:pages[active].id});setTarget();wake()}
function home(){overview=true;fill(active);tone();bus.emit('gallery:overview',{});setTarget();wake()}
function next(delta){focus(active+delta)}
$('#overview').onclick=home;$('#prev').onclick=()=>next(-1);$('#next').onclick=()=>next(1);$('#read-prev').onclick=()=>{next(-1);$('#conteudo').scrollIntoView({behavior:'smooth',block:'start'})};$('#read-next').onclick=()=>{next(1);$('#conteudo').scrollIntoView({behavior:'smooth',block:'start'})};
for(const b of document.querySelectorAll('[data-open]'))b.onclick=()=>{focus(Number(b.dataset.open));document.querySelector('.workspace').scrollIntoView({behavior:'smooth'})};
$('#sound').onclick=()=>{sound=!sound;$('#sound').textContent=sound?'♫ Som ligado':'♫ Som';$('#sound').setAttribute('aria-pressed',String(sound));tone()};
$('#motion').onclick=()=>{motion=!motion;$('#motion').textContent=motion?'Ⅱ Movimento':'▶ Movimento';$('#motion').setAttribute('aria-pressed',String(motion));wake()};
addEventListener('keydown',e=>{if(e.target instanceof HTMLInputElement)return;if(e.key==='ArrowRight')next(1);if(e.key==='ArrowLeft')next(-1);if(e.key==='Escape')home()});
fill(active);
let THREE,renderer,scene,camera,raycaster,panels=[],frames=[],dust,frame=0,last=0,dirty=true,raf=0,drag=null,view={x:0,y:1.1,z:19},goal={x:0,y:1.1,z:19},look={x:0,y:0,z:0},lookGoal={x:0,y:0,z:0},turn=0,turnGoal=0,paused=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function wake(){dirty=true;if(!raf&&!paused)raf=requestAnimationFrame(loop)}
function setTarget(){if(overview){goal={x:0,y:1.3,z:18.5};lookGoal={x:0,y:0,z:0};turnGoal=0}else{const p=panels[active];if(p){goal={x:p.position.x,y:p.position.y,z:p.position.z+4.55};lookGoal={x:p.position.x,y:p.position.y,z:p.position.z};turnGoal=0}}}
function createLabel(p,i){const c=document.createElement('canvas');c.width=768;c.height=512;const g=c.getContext('2d');const grad=g.createLinearGradient(0,0,768,512);grad.addColorStop(0,'#193d58');grad.addColorStop(.55,'#10283f');grad.addColorStop(1,'#0b1b30');g.fillStyle=grad;g.fillRect(0,0,768,512);g.fillStyle=p.color;g.fillRect(0,0,768,9);g.globalAlpha=.12;g.strokeStyle=p.color;g.lineWidth=2;for(let r=50;r<440;r+=60){g.beginPath();g.arc(620,270,r,0,Math.PI*2);g.stroke()}g.globalAlpha=1;g.fillStyle='#bcd5e8';g.font='bold 22px system-ui';g.fillText(p.tag,48,77);g.fillStyle='#f5fbff';g.font='bold 54px system-ui';const words=p.title.split(' ');let line='',y=240;for(const w of words){const test=line?line+' '+w:w;if(g.measureText(test).width>650){g.fillText(line,48,y);line=w;y+=66}else line=test}g.fillText(line,48,y);g.fillStyle=p.color;g.font='bold 23px system-ui';g.fillText(p.short,48,438);g.fillStyle='#d7e6f2';g.font='19px system-ui';g.fillText('SELECIONE PARA EXPLORAR  ↗',48,475);return c}
async function init(){try{
 THREE=await import('https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js');
 renderer=new THREE.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<800?1.15:1.5));renderer.setClearColor(0x0b2032);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.45;
 scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x0b2032,.014);camera=new THREE.PerspectiveCamera(48,1,.1,100);raycaster=new THREE.Raycaster();scene.add(new THREE.HemisphereLight(0xd6f3ff,0x10273e,2.5));const lamp=new THREE.DirectionalLight(0xc6e6ff,2.0);lamp.position.set(-3,8,12);scene.add(lamp);
 const planeGeo=new THREE.PlaneGeometry(6.5,4.35),rimGeo=new THREE.BoxGeometry(6.73,4.57,.11),baseMat=new THREE.MeshStandardMaterial({color:0x122e46,metalness:.1,roughness:.55});
 const glassGeo=new THREE.BoxGeometry(6.98,4.82,.055),glassMat=new THREE.MeshPhysicalMaterial({color:0x86c8e6,transparent:true,opacity:.18,metalness:.05,roughness:.18,clearcoat:.8,depthWrite:false});
 for(const [i,p] of pages.entries()){
  const x=(i-2)*7.8,z=-Math.abs(i-2)*1.5,y=Math.sin(i*1.4)*.34;
  const group=new THREE.Group();group.position.set(x,y,z);scene.add(group);
  const rim=new THREE.Mesh(rimGeo,baseMat);rim.position.z=-.11;group.add(rim);
  const texture=new THREE.CanvasTexture(createLabel(p,i));texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
  const face=new THREE.Mesh(planeGeo,new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));face.userData.index=i;group.add(face);
  const glass=new THREE.Mesh(glassGeo,glassMat);glass.position.z=-.19;group.add(glass);
  const edge=new THREE.LineSegments(new THREE.EdgesGeometry(rimGeo),new THREE.LineBasicMaterial({color:p.color,transparent:true,opacity:.6}));edge.position.z=-.11;group.add(edge);
  const light=new THREE.PointLight(p.color,5,8);light.position.set(0,0,2.2);group.add(light);
  panels.push(group);frames.push({face,texture,group,light,glass});
 }
 const n=260,pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=(Math.random()-.5)*65;pos[i*3+1]=(Math.random()-.5)*17;pos[i*3+2]=-5-Math.random()*26}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(pos,3));dust=new THREE.Points(geometry,new THREE.PointsMaterial({color:0xb6e8ff,size:.047,transparent:true,opacity:.65}));scene.add(dust);
 function resize(){const r=canvas.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/r.height;camera.fov=r.width<700?62:48;camera.updateProjectionMatrix();wake()};addEventListener('resize',resize,{passive:true});resize();setTarget();$('#status').textContent='ATLAS ESPACIAL · 5 SUPERFÍCIES · MODO OTIMIZADO';wake();
 let touchStart=0;
 canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,moved:false,origin:turnGoal};canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>6||Math.abs(e.clientY-drag.y)>6)drag.moved=true;if(resolveEditorOrbitEnabled({selectionGestureActive:false})&&drag.moved){turnGoal=Math.max(-.22,Math.min(.22,drag.origin-dx*.0009));wake()}});
 canvas.addEventListener('pointerup',e=>{if(!drag)return;const moved=drag.moved;drag=null;if(moved)return;const r=canvas.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1)),camera);const hit=raycaster.intersectObjects(frames.map(f=>f.face),false)[0];if(hit&&picking.objectFor(picking.idFor(pages[hit.object.userData.index].id)))focus(hit.object.userData.index)});
 canvas.addEventListener('pointercancel',()=>{drag=null});
 canvas.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)<2)return;e.preventDefault();const now=performance.now();if(now-touchStart<480)return;touchStart=now;tone('scroll');next(e.deltaY>0?1:-1)},{passive:false});
 document.addEventListener('visibilitychange',()=>{paused=document.hidden;if(!paused)wake()});
 }catch(err){console.error(err);$('#fallback').classList.add('show');$('#status').textContent='MODO DE LEITURA · 3D INDISPONÍVEL'}}
function loop(now){raf=0;if(paused||!renderer)return;const dt=Math.min(.05,(now-last)/1000||.016);last=now;const alpha=reduced?1:1-Math.exp(-dt*4.8);let moving=false;
 for(const k of ['x','y','z']){view[k]+=(goal[k]-view[k])*alpha;look[k]+=(lookGoal[k]-look[k])*alpha;if(Math.abs(goal[k]-view[k])+Math.abs(lookGoal[k]-look[k])>.003)moving=true}
 turn+=(turnGoal-turn)*alpha;if(Math.abs(turnGoal-turn)>.002)moving=true;
 camera.position.set(view.x+turn*2.3,view.y,view.z);camera.lookAt(look.x+turn*3,look.y,look.z);
 if(motion&&!reduced){frame+=dt;for(let i=0;i<frames.length;i++){frames[i].light.intensity=4.5+Math.sin(frame*.7+i)*.5;frames[i].glass.position.z=-.19+Math.sin(frame*.42+i)*.008}}
 renderer.render(scene,camera);if(moving||motion&&!reduced||dirty){dirty=false;raf=requestAnimationFrame(loop)}
}
$('#texture').addEventListener('change',async e=>{
 const file=e.target.files?.[0];if(!file)return;if(!/^image\/(png|jpeg|webp)$/.test(file.type)||file.size>12_000_000){alert('Escolha PNG, JPG ou WebP de até 12 MB.');return}
 if(!frames[active]){alert('Aguarde a inicialização da cena 3D.');return}
 try{const bitmap=await createImageBitmap(file);const max=1024,scale=Math.min(1,max/Math.max(bitmap.width,bitmap.height));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(bitmap.width*scale));c.height=Math.max(1,Math.round(bitmap.height*scale));c.getContext('2d').drawImage(bitmap,0,0,c.width,c.height);bitmap.close();const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());const old=frames[active].face.material.map;frames[active].face.material.map=tex;frames[active].face.material.needsUpdate=true;old?.dispose();tone('travel');wake();$('#status').textContent=`TEXTURA LOCAL · ${file.name.slice(0,32)}`;}catch(err){console.error(err);alert('Não foi possível carregar a imagem.')}finally{e.target.value=''}
});
init();
