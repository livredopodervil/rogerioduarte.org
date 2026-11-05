// EventBus reutilizado do núcleo do SpatialSeed (packages/core/src/EventBus.js).
import { EventBus } from './EventBus.js';
const bus = new EventBus();
const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d', {alpha:true});
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.getElementById('motion');
let running = !reduce.matches, visible = true, width=0, height=0, dpr=1, raf=0, time=0;
const pointer = {x:0,y:0,active:false};
const nodes = [];
const random = (a,b)=>a+Math.random()*(b-a);
function reset(){
 const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;dpr=Math.min(window.devicePixelRatio||1,2);
 canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
 nodes.length=0;
 const count=Math.min(100,Math.max(35,Math.floor(width*height/14000)));
 for(let i=0;i<count;i++)nodes.push({x:random(width*.38,width*1.08),y:random(-40,height+40),z:random(.3,1),phase:random(0,6.28),r:random(.7,2.3)});
 draw();
}
function draw(){
 ctx.clearRect(0,0,width,height);
 const t=time*.00027;
 const positions=nodes.map(n=>({x:n.x+Math.sin(t+n.phase)*20*n.z,y:n.y+Math.cos(t*.7+n.phase)*17*n.z,r:n.r*n.z}));
 const maxDist=Math.min(165,width*.23);
 for(let i=0;i<positions.length;i++){
  const a=positions[i];
  for(let j=i+1;j<positions.length;j++){
   const b=positions[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
   if(dist<maxDist){ctx.strokeStyle=`rgba(135,218,198,${(1-dist/maxDist)*.19})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  }
  if(pointer.active){const dist=Math.hypot(a.x-pointer.x,a.y-pointer.y);if(dist<125){ctx.strokeStyle=`rgba(176,240,211,${(1-dist/125)*.45})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();}}
  ctx.fillStyle=`rgba(171,236,211,${.35+nodes[i].z*.6})`;ctx.beginPath();ctx.arc(a.x,a.y,Math.max(.65,a.r),0,Math.PI*2);ctx.fill();
 }
 const cx=width*.79,cy=height*.49,r=Math.min(width*.29,height*.34);
 ctx.save();ctx.translate(cx,cy);ctx.rotate(t*.15);
 for(let i=0;i<5;i++){ctx.beginPath();ctx.ellipse(0,0,r*(.55+i*.13),r*(.18+i*.055),i*.62,0,Math.PI*2);ctx.strokeStyle=`rgba(150,226,202,${.10-i*.011})`;ctx.lineWidth=.9;ctx.stroke();}
 ctx.restore();
}
function frame(ts){if(!running||!visible)return;time=ts;draw();raf=requestAnimationFrame(frame)}
function start(){cancelAnimationFrame(raf);if(running&&visible)raf=requestAnimationFrame(frame);else draw();motionButton.textContent=running?'Pausar animação':'Ativar animação';motionButton.setAttribute('aria-pressed',String(running))}
bus.on('motion',start);
canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true;if(!running)draw()},{passive:true});
canvas.addEventListener('pointerleave',()=>{pointer.active=false;if(!running)draw()});
motionButton.addEventListener('click',()=>{running=!running;bus.emit('motion')});
reduce.addEventListener('change',e=>{running=!e.matches;bus.emit('motion')});
document.addEventListener('visibilitychange',()=>{visible=!document.hidden;bus.emit('motion')});
window.addEventListener('resize',()=>{reset();bus.emit('motion')},{passive:true});
document.getElementById('year').textContent=new Date().getFullYear();
reset();start();
