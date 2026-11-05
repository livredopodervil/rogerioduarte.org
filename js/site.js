import {EventBus} from '../spatialseed/EventBus.js';
import {RenderDemandScheduler} from '../spatialseed/RenderDemandScheduler.js';
import {resolveEditorOrbitEnabled} from '../spatialseed/EditorOrbitPolicy.js';
import {PickingIdAllocator} from '../spatialseed/PickingIdAllocator.js';

const bus=new EventBus(), ids=new PickingIdAllocator();
const data=[
 {id:'medicina',name:'Medicina',type:'PRÁTICA CLÍNICA',color:0x60f2dd,position:[-2.6,1.05,0],description:'Experiência em atenção primária, Medicina de Família e Comunidade, pronto atendimento, urgência, emergência e assistência hospitalar. Atuação em equipes multiprofissionais e acompanhamento de condições agudas e crônicas.',meta:'SUS · Atenção primária · Hospital · Urgência',link:'#atuacao'},
 {id:'sistemas',name:'Software & IA',type:'ENGENHARIA DE SISTEMAS',color:0x9d9aff,position:[2.5,.65,-.6],description:'Programação, arquitetura de sistemas, automação, interfaces gráficas, visualização, estatística e aplicações de inteligência artificial. Integração entre implementação técnica e análise de problemas.',meta:'JavaScript · Python · Sistemas · Computação gráfica',link:'#atuacao'},
 {id:'spatialseed',name:'SpatialSeed',type:'PROJETO DE SOFTWARE',color:0xff8ab8,position:[.65,-1.45,1.6],description:'Projeto independente de criação e manipulação espacial, com arquitetura modular, runtime de cena, ferramentas de interação, geometria e recursos gráficos. Sua página inicial original não é modificada por este portfólio.',meta:'Projeto original preservado · Repositório independente',link:'https://github.com/livredopodervil/SpatialSeed'},
 {id:'pesquisa',name:'Pesquisa & análise',type:'PENSAMENTO INTERDISCIPLINAR',color:0xffd07e,position:[-1.3,-1.55,-1.8],description:'Interesse em investigação científica, fundamentos matemáticos, estatística, avaliação de evidências, políticas públicas e análise de sistemas complexos, articulando ciência, tecnologia e sociedade.',meta:'Métodos · Dados · Modelagem · Políticas públicas',link:'#trajetoria'}
];
const $=s=>document.querySelector(s), canvas=$('#stage'),status=$('#status'),nav=$('#atlas-nav'),detail=$('#detail');
$('#year').textContent=new Date().getFullYear();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const state={playing:!reduce,sound:false,focused:null,dragging:false,travel:0};
let audio=null,THREE,renderer,scene,camera,raycaster,objects=[],glass=[],rings=[],stars,lights=[],scheduler,lease,orbit={yaw:.32,pitch:.19,dist:10.5},desired={yaw:.32,pitch:.19,dist:10.5},focus={x:0,y:0,z:0},target={x:0,y:0,z:0},pointerStart=null,last=0;
function tone(kind='tap'){
 if(!state.sound)return;
 try{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume();const t=audio.currentTime,osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';const f=kind==='focus'?520:kind==='scroll'?310:640;osc.frequency.setValueAtTime(f,t);osc.frequency.exponentialRampToValueAtTime(f*(kind==='focus'?1.32:.86),t+.105);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(kind==='scroll'?.009:.018,t+.012);gain.gain.exponentialRampToValueAtTime(.0001,t+.14);osc.connect(gain);gain.connect(audio.destination);osc.start(t);osc.stop(t+.15)}catch(e){console.warn('Áudio:',e)}
}
function choose(item){
 state.focused=item;state.travel=1;target={x:item.position[0],y:item.position[1],z:item.position[2]};desired.dist=4.5;desired.yaw=.35+Math.atan2(item.position[0],Math.abs(item.position[2])+3)*.35;desired.pitch=.17;detail.hidden=false;$('#detail-kind').textContent=item.type;$('#detail-title').textContent=item.name;$('#detail-desc').textContent=item.description;$('#detail-meta').textContent=item.meta;$('#detail-link').href=item.link;$('#detail-link').textContent=item.link.startsWith('https:')?'Abrir projeto original ↗':'Explorar conteúdo ↗';nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.id===item.id));bus.emit('atlas:focus',{id:item.id});tone('focus');scheduler?.invalidate('focus');
}
function home(){state.focused=null;target={x:0,y:0,z:0};desired={yaw:.32,pitch:.19,dist:10.5};detail.hidden=true;nav.querySelectorAll('button').forEach(b=>b.classList.remove('active'));bus.emit('atlas:home',{});tone();scheduler?.invalidate('home')}
for(const item of data){ids.idFor(item.id);const b=document.createElement('button');b.type='button';b.dataset.id=item.id;b.textContent='◇ '+item.name;b.addEventListener('click',()=>choose(item));nav.append(b)}
$('#home').onclick=home;$('#close').onclick=home;
$('#motion').onclick=()=>{state.playing=!state.playing;$('#motion').textContent=state.playing?'Ⅱ Pausar':'▶ Animar';$('#motion').setAttribute('aria-pressed',String(state.playing));if(state.playing&&!lease)lease=scheduler.acquireContinuous('ambient');else if(!state.playing&&lease){scheduler.releaseContinuous(lease);lease=null}scheduler.invalidate('motion')};
$('#sound').onclick=()=>{state.sound=!state.sound;$('#sound').textContent=state.sound?'♫ Som ligado':'♫ Ativar som';$('#sound').setAttribute('aria-pressed',String(state.sound));tone('focus')};
function fallback(message){$('#fallback').classList.add('show');status.textContent=message;canvas.style.display='none'}
try{
 THREE=await import('https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js');
 // Three.js renders the site-specific scene; the interaction, picking ID, event and frame policies are reused from SpatialSeed.
 renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
 scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x0b1027,.016);camera=new THREE.PerspectiveCamera(48,1,.08,130);raycaster=new THREE.Raycaster();
 scene.add(new THREE.AmbientLight(0x9db8ff,1.5));
 for(const [col,pos,power] of [[0x72ffe5,[-5,5,6],90],[0xb18aff,[5,3,-3],110],[0xff80c3,[1,-4,5],65],[0xffd08a,[-4,-3,-4],40]]){const l=new THREE.PointLight(col,power,25,2);l.position.set(...pos);scene.add(l);lights.push(l)}
 const core=new THREE.Group();scene.add(core);
 const coreGeo=new THREE.IcosahedronGeometry(1.08,5);
 const coreMat=new THREE.MeshPhysicalMaterial({color:0x96d5ff,metalness:.1,roughness:.055,transmission:.93,thickness:1.6,ior:1.45,transparent:true,opacity:.92,clearcoat:1,clearcoatRoughness:.04,side:THREE.DoubleSide});
 const crystal=new THREE.Mesh(coreGeo,coreMat);core.add(crystal);glass.push(crystal);
 const inner=new THREE.Mesh(new THREE.IcosahedronGeometry(.62,2),new THREE.MeshStandardMaterial({color:0x99f6ff,emissive:0x3c5fff,emissiveIntensity:1.8,metalness:.55,roughness:.25,flatShading:true}));core.add(inner);
 const shell=new THREE.Mesh(new THREE.TorusKnotGeometry(1.72,.015,380,8,2,5),new THREE.MeshBasicMaterial({color:0x9fd4ff,transparent:true,opacity:.48}));core.add(shell);rings.push(shell);
 const ringGeo=new THREE.TorusGeometry(2.6,.011,7,240);
 for(let i=0;i<3;i++){const ring=new THREE.Mesh(ringGeo,new THREE.MeshBasicMaterial({color:[0x76f5ed,0xb9a0ff,0xff9ab8][i],transparent:true,opacity:.55}));ring.rotation.set(.4+i*.72,.4+i*.9,i*.73);core.add(ring);rings.push(ring)}
 for(const item of data){
  const g=new THREE.Group();g.position.set(...item.position);g.userData.item=item;scene.add(g);
  const c=new THREE.Color(item.color);
  const orb=new THREE.Mesh(new THREE.SphereGeometry(.48,48,32),new THREE.MeshPhysicalMaterial({color:c,metalness:.06,roughness:.06,transmission:.78,thickness:1.4,ior:1.48,clearcoat:1,transparent:true,opacity:.95}));g.add(orb);glass.push(orb);
  const ico=new THREE.Mesh(new THREE.IcosahedronGeometry(.26,1),new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:1.5,metalness:.4,roughness:.2}));g.add(ico);
  const halo=new THREE.Mesh(new THREE.TorusGeometry(.69,.014,8,96),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.9}));halo.rotation.x=.55;g.add(halo);rings.push(halo);
  const point=new THREE.PointLight(c,9,4,2);g.add(point);objects.push({g,orb,ico,halo,item});
  const pts=[new THREE.Vector3(...item.position),new THREE.Vector3(0,0,0)];const curve=new THREE.QuadraticBezierCurve3(pts[0],new THREE.Vector3(...item.position).multiplyScalar(.45).add(new THREE.Vector3(0,.6,0)),pts[1]);const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),new THREE.LineBasicMaterial({color:c,transparent:true,opacity:.38}));scene.add(line);
 }
 const count=1100,coords=new Float32Array(count*3),cols=new Float32Array(count*3);
 for(let i=0;i<count;i++){const a=i*2.399963,r=6+Math.sqrt((i*47%997)/997)*18,z=1-2*(i+.5)/count,k=Math.sqrt(1-z*z);coords[i*3]=r*k*Math.cos(a);coords[i*3+1]=r*z;coords[i*3+2]=r*k*Math.sin(a);const c=new THREE.Color().setHSL(.53+(i%7)*.018,.55,.55+(i%5)*.04);cols.set(c.toArray(),i*3)}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(coords,3));geo.setAttribute('color',new THREE.BufferAttribute(cols,3));stars=new THREE.Points(geo,new THREE.PointsMaterial({size:.042,vertexColors:true,transparent:true,opacity:.8,sizeAttenuation:true}));scene.add(stars);
 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<700?58:48;camera.updateProjectionMatrix();scheduler?.invalidate('resize')}
 function tick(t){const dt=Math.min(.05,(t-last)/1000||.016);last=t;const a=1-Math.exp(-dt*3.2);orbit.yaw+=(desired.yaw-orbit.yaw)*a;orbit.pitch+=(desired.pitch-orbit.pitch)*a;orbit.dist+=(desired.dist-orbit.dist)*a;for(const key of ['x','y','z'])focus[key]+=(target[key]-focus[key])*a;const v=new THREE.Vector3(Math.sin(orbit.yaw)*Math.cos(orbit.pitch),Math.sin(orbit.pitch),Math.cos(orbit.yaw)*Math.cos(orbit.pitch));camera.position.set(focus.x+v.x*orbit.dist,focus.y+v.y*orbit.dist,focus.z+v.z*orbit.dist);camera.lookAt(focus.x,focus.y,focus.z);if(state.playing){crystal.rotation.y+=dt*.08;inner.rotation.y-=dt*.15;inner.rotation.x+=dt*.09;shell.rotation.y+=dt*.09;stars.rotation.y+=dt*.002;objects.forEach(({g,ico,halo},i)=>{g.position.y=data[i].position[1]+Math.sin(t*.0006+i*1.7)*.09;ico.rotation.y+=dt*.2;halo.rotation.z+=dt*.09});lights[0].position.x=-5+Math.sin(t*.00022)*1.2} }
 function render(){renderer.render(scene,camera)}
 scheduler=new RenderDemandScheduler({render});scheduler.subscribeFrame(({timestampMs})=>{tick(timestampMs);const moving=Math.abs(orbit.yaw-desired.yaw)+Math.abs(orbit.pitch-desired.pitch)+Math.abs(orbit.dist-desired.dist)+Math.abs(focus.x-target.x)+Math.abs(focus.y-target.y)+Math.abs(focus.z-target.z)>.002;return {changed:true,continue:moving}});resize();addEventListener('resize',resize);if(state.playing)lease=scheduler.acquireContinuous('ambient');scheduler.invalidate('initial');status.textContent='ATLAS 3D · SpatialSeed EventBus / Scheduler / OrbitPolicy / PickingId';
 let lastScrollTone=0;
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0&&e.pointerType==='mouse')return;pointerStart={x:e.clientX,y:e.clientY,yaw:desired.yaw,pitch:desired.pitch,dragged:false};state.dragging=true;canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!pointerStart)return;const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;if(Math.hypot(dx,dy)>6)pointerStart.dragged=true;if(resolveEditorOrbitEnabled({selectionGestureActive:false})){desired.yaw=pointerStart.yaw-dx*.005;desired.pitch=Math.max(-1.15,Math.min(1.15,pointerStart.pitch+dy*.005));scheduler.invalidate('orbit')}});
 canvas.addEventListener('pointerup',e=>{if(!pointerStart)return;const clicked=!pointerStart.dragged;pointerStart=null;state.dragging=false;if(!clicked)return;const rect=canvas.getBoundingClientRect(),p=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-((e.clientY-rect.top)/rect.height*2-1));raycaster.setFromCamera(p,camera);const hit=raycaster.intersectObjects(objects.map(x=>x.orb),false)[0];if(hit){const o=objects.find(x=>x.orb===hit.object);if(o&&ids.objectFor(ids.idFor(o.item.id)))choose(o.item)}else tone()});
 canvas.addEventListener('pointercancel',()=>{pointerStart=null;state.dragging=false});
 canvas.addEventListener('wheel',e=>{e.preventDefault();desired.dist=Math.max(2.6,Math.min(20,desired.dist+e.deltaY*.009));scheduler.invalidate('wheel');if(performance.now()-lastScrollTone>110){tone('scroll');lastScrollTone=performance.now()}},{passive:false});
 let touchDist=0;canvas.addEventListener('touchstart',e=>{if(e.touches.length===2){touchDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY)}},{passive:true});canvas.addEventListener('touchmove',e=>{if(e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(touchDist)desired.dist=Math.max(2.6,Math.min(20,desired.dist+(touchDist-d)*.013));touchDist=d;scheduler.invalidate('pinch')}},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(lease){scheduler.releaseContinuous(lease);lease=null}}else if(state.playing&&!lease){last=performance.now();lease=scheduler.acquireContinuous('ambient')}});
 bus.on('atlas:focus',({id})=>console.debug('SpatialSeed EventBus: focus',id));
}catch(err){console.error('Falha na cena 3D',err);fallback('Modo informativo: cena 3D indisponível. Navegue pelos botões e seções.');}
