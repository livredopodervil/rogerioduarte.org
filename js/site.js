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

const $=s=>document.querySelector(s);let THREE,renderer,scene,camera,root,raycaster,faceMeshes=[],frame=0,previous=0,drag=null,selected=-1,auto=true,zoom=1,angleVelocity=.7,ready=false;
const names=['Medicina','Atenção Primária','Computação','Dados & IA','Pesquisa','Comunicação','Urgências','Genética','Matemática','Natureza','Publicações','Contato'];
const short=['Medicina e cuidado integral','Atenção primária e urgências','Software e modelagem 3D','Estatística e inteligência artificial','Ciência e investigação','Comunicação e audiovisual'];
const colors=['#e8ef92','#b5e879','#c5f37c','#e7f2a6','#8edc8b','#d8e98b'];
const cv=$('#scene'),viewport=$('#viewport');
function status(s){$('#status').textContent=s}
function detail(i){if(i<0||i>=12)return;selected=i;const p=pages[i];$('#detail-title').textContent=p.title;$('#detail-tag').textContent=p.tag;$('#detail-description').textContent=p.description;$('#detail-image').src='./images/face-'+(i+1)+'.jpg';$('#detail-image').alt=p.title;$('#detail-points').replaceChildren(...p.points.map(t=>{let li=document.createElement('li');li.textContent=t;return li}));$('#detail').hidden=false;document.body.classList.add('detail-open');$('#detail-close').focus();history.replaceState(null,'','#secao-'+(i+1))}
function closeDetail(){if($('#detail').hidden)return;$('#detail').hidden=true;document.body.classList.remove('detail-open');history.replaceState(null,'',location.pathname+location.search);$('#scene').focus()}
$('#detail-close').onclick=closeDetail;$('#detail-home').onclick=closeDetail;$('#home').onclick=()=>{closeDetail();root?.quaternion.identity();selected=-1};$('#about').onclick=()=>detail(0);$('#contact').href='mailto:rd@rogerioduarte.org';
$('#pause').onclick=()=>{auto=!auto;$('#pause').textContent=auto?'Ⅱ Pausar':'▶ Animar';$('#pause').setAttribute('aria-pressed',String(auto))};
$('#reset').onclick=()=>{root?.quaternion.identity();zoom=1;updateCamera();selected=-1};
$('#fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen?.()};
$('#zoom-in').onclick=()=>{zoom=Math.max(.62,zoom-.12);updateCamera()};$('#zoom-out').onclick=()=>{zoom=Math.min(1.65,zoom+.12);updateCamera()};
for(const b of document.querySelectorAll('[data-section]'))b.onclick=()=>detail(+b.dataset.section);
addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail();if(!$('#detail').hidden)return;if(e.key==='ArrowLeft')root?.rotateY(-.22);if(e.key==='ArrowRight')root?.rotateY(.22);if(e.key==='ArrowUp')root?.rotateX(-.22);if(e.key==='ArrowDown')root?.rotateX(.22)});
function updateCamera(){if(!camera)return;camera.position.set(0,0,12.6*zoom);camera.lookAt(0,0,0)}
function texture(i){
 const c=document.createElement('canvas');c.width=768;c.height=768;
 const g=c.getContext('2d');g.fillStyle='#12371e';g.fillRect(0,0,768,768);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;
 const im=new Image();
 im.onload=()=>{
   g.drawImage(im,0,0,768,768);
   const shade=g.createLinearGradient(0,430,0,768);
   shade.addColorStop(0,'rgba(0,22,9,0)');shade.addColorStop(1,'rgba(0,19,8,.88)');
   g.fillStyle=shade;g.fillRect(0,430,768,338);
   g.fillStyle='#f2f8d6';g.textAlign='center';g.font='600 48px system-ui';
   g.fillText(names[i],384,660,670);
   t.needsUpdate=true;
 };
 im.onerror=()=>{g.fillStyle='#e6f5a4';g.font='42px sans-serif';g.textAlign='center';g.fillText(names[i],384,410);t.needsUpdate=true};
 im.src='./images/face-'+(i+1)+'.jpg';return t;
}
function build(){
  root=new THREE.Group();scene.add(root);faceMeshes=[];
  // Construct the dodecahedron as the dual of an icosahedron.
  // Exactly 12 icosahedron vertices => exactly 12 pentagonal faces.
  const ico=new THREE.IcosahedronGeometry(1,0);
  const pos=ico.getAttribute('position');
  const vertices=[],triangles=[];
  function vertexId(v){let i=vertices.findIndex(w=>w.distanceToSquared(v)<1e-8);if(i<0){i=vertices.length;vertices.push(v.clone())}return i}
  for(let k=0;k<pos.count;k+=3){
    const ids=[];
    for(let j=0;j<3;j++)ids.push(vertexId(new THREE.Vector3().fromBufferAttribute(pos,k+j)));
    const center=vertices[ids[0]].clone().add(vertices[ids[1]]).add(vertices[ids[2]]).divideScalar(3);
    triangles.push({ids,center});
  }
  if(vertices.length!==12||triangles.length!==20)throw Error('Icosaedro inválido: '+vertices.length+' vértices, '+triangles.length+' triângulos');
  const scale=4.25/0.7946544723;
  vertices.forEach((normal,i)=>{
    const n=normal.clone().normalize();
    const pent=triangles.filter(t=>t.ids.includes(i)).map(t=>t.center.clone().multiplyScalar(scale));
    if(pent.length!==5)throw Error('Face '+i+': '+pent.length+' vértices');
    const center=pent.reduce((a,v)=>a.add(v),new THREE.Vector3()).divideScalar(5);
    const axis=Math.abs(n.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);
    const u=axis.clone().cross(n).normalize(),v=n.clone().cross(u).normalize();
    pent.sort((a,b)=>Math.atan2(a.clone().sub(center).dot(v),a.clone().sub(center).dot(u))-Math.atan2(b.clone().sub(center).dot(v),b.clone().sub(center).dot(u)));
    const radius=Math.max(...pent.map(q=>q.distanceTo(center)));
    const xyz=[],uv=[],normals=[];
    for(let j=0;j<5;j++)for(const q of [center,pent[j],pent[(j+1)%5]]){
      xyz.push(q.x,q.y,q.z);
      uv.push(.5+q.clone().sub(center).dot(u)/(2*radius),.5+q.clone().sub(center).dot(v)/(2*radius));
      normals.push(n.x,n.y,n.z);
    }
    const geom=new THREE.BufferGeometry();
    geom.setAttribute('position',new THREE.Float32BufferAttribute(xyz,3));
    geom.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
    geom.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));
    const mesh=new THREE.Mesh(geom,new THREE.MeshBasicMaterial({map:texture(i),side:THREE.DoubleSide}));
    mesh.userData.section=i;
    root.add(mesh);faceMeshes.push(mesh);
    const edges=pent.map(q=>q.clone().addScaledVector(n,.035));edges.push(edges[0]);
    root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(edges),new THREE.LineBasicMaterial({color:0xd9f872,transparent:true,opacity:.95})));
  });
  const glow=new THREE.Mesh(new THREE.DodecahedronGeometry(4.28,0),new THREE.MeshBasicMaterial({color:0x8fd83b,transparent:true,opacity:.035,side:THREE.BackSide,depthWrite:false}));
  root.add(glow);root.rotation.set(.32,.35,.13);
  ico.dispose();
}
function resize(){if(!renderer)return;const r=viewport.getBoundingClientRect();const w=Math.max(1,r.width),h=Math.max(1,r.height);renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w/h<.8?63:45;camera.updateProjectionMatrix()}
function loop(now){frame=requestAnimationFrame(loop);const dt=Math.min(.05,(now-previous)/1000||.016);previous=now;if(auto&&!drag&&!document.hidden){root.rotateOnWorldAxis(new THREE.Vector3(0,1,0),dt*.25);root.rotateOnWorldAxis(new THREE.Vector3(1,0,0),dt*.09);root.rotateOnWorldAxis(new THREE.Vector3(0,0,1),dt*.05)}renderer.render(scene,camera)}
async function init(){try{THREE=await import('https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js');renderer=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(45,1,.1,100);updateCamera();raycaster=new THREE.Raycaster();build();resize();new ResizeObserver(resize).observe(viewport);ready=true;status('DODECAEDRO · 12 FACES · 12 SEÇÕES');requestAnimationFrame(loop);cv.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false};cv.setPointerCapture(e.pointerId)});cv.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(e.clientX-drag.startX)+Math.abs(e.clientY-drag.startY)>8)drag.moved=true;root.rotateOnWorldAxis(new THREE.Vector3(0,1,0),dx*.009);root.rotateOnWorldAxis(new THREE.Vector3(1,0,0),dy*.009);drag.x=e.clientX;drag.y=e.clientY});cv.addEventListener('pointerup',e=>{if(!drag)return;const moved=drag.moved;drag=null;if(moved)return;const r=cv.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1)),camera);const hit=raycaster.intersectObjects(faceMeshes)[0];if(hit&&hit.object.userData.section!==null)detail(hit.object.userData.section)});cv.addEventListener('pointercancel',()=>drag=null);cv.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.min(1.65,Math.max(.62,zoom+Math.sign(e.deltaY)*.08));updateCamera()},{passive:false});if(matchMedia('(prefers-reduced-motion: reduce)').matches){auto=false;$('#pause').textContent='▶ Animar'}}catch(err){status('ERRO 3D: '+err.message);console.error(err);const fb=$('#fallback');fb.hidden=false;fb.textContent='Falha no 3D: '+err.message}}
init();
