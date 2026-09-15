import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const DATA = window.PORTFOLIO_DATA || {owner:'Your Name',subtitle:'Creative',contact:'hello@example.com',projects:[]};
const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080604);
scene.fog = new THREE.FogExp2(0x080604,0.035);

const camera = new THREE.PerspectiveCamera(34,innerWidth/innerHeight,0.1,100);
camera.position.set(0.15,2.2,8.3);

const hemi = new THREE.HemisphereLight(0x8b6b45,0x090604,1.25); scene.add(hemi);
const key = new THREE.SpotLight(0xffc477,75,30,Math.PI/5,.55,1.2); key.position.set(-4.5,7,5); key.castShadow=true; key.shadow.mapSize.set(2048,2048); scene.add(key);
const rim = new THREE.PointLight(0xb66432,18,16,2); rim.position.set(4,2,-1); scene.add(rim);
const fill = new THREE.PointLight(0xffdfad,8,8,2); fill.position.set(-2,1,4); scene.add(fill);

const floorMat = new THREE.MeshStandardMaterial({color:0x1c120b,roughness:.78,metalness:.08});
const floor = new THREE.Mesh(new THREE.PlaneGeometry(40,40),floorMat); floor.rotation.x=-Math.PI/2; floor.position.y=-1.58; floor.receiveShadow=true; scene.add(floor);

function mat(color,metal=.4,rough=.45){return new THREE.MeshStandardMaterial({color,metalness:metal,roughness:rough});}
const brass=mat(0x9a6a2f,.78,.26), darkBrass=mat(0x5c3e1e,.72,.34), wood=mat(0x412416,.15,.58), black=mat(0x16130f,.5,.33), ivory=mat(0xd4b979,.12,.52), steel=mat(0x494641,.82,.28), red=mat(0x5b1d12,.35,.48);

const machine = new THREE.Group(); machine.position.y=-.35; scene.add(machine);
function box(name,sx,sy,sz,material,x,y,z,rx=0,ry=0,rz=0){const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),material);m.name=name;m.position.set(x,y,z);m.rotation.set(rx,ry,rz);m.castShadow=m.receiveShadow=true;machine.add(m);return m}
function cyl(name,r,h,material,x,y,z,rx=0,ry=0,rz=0,segments=48){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,segments),material);m.name=name;m.position.set(x,y,z);m.rotation.set(rx,ry,rz);m.castShadow=m.receiveShadow=true;machine.add(m);return m}
function torus(name,r,t,material,x,y,z,rx=0,ry=0,rz=0){const m=new THREE.Mesh(new THREE.TorusGeometry(r,t,18,64),material);m.name=name;m.position.set(x,y,z);m.rotation.set(rx,ry,rz);m.castShadow=true;machine.add(m);return m}

// Base + chassis
box('base',5.6,.34,3.75,wood,0,-.88,0);
box('lowerMetal',5.15,.18,3.25,darkBrass,0,-.62,-.03);
box('body',4.85,1.38,2.05,red,0,-.05,-.45,-.05,0,0);
box('bodyInset',4.45,1.12,1.82,wood,0,-.05,-.33,-.05,0,0);

// Decorative side pillars
for (const s of [-1,1]){
  box('pillar',.36,1.9,.48,brass,s*2.25,.02,-.28,0,0,s*.03);
  torus('gear',.48,.085,brass,s*2.42,.65,-.30,Math.PI/2,0,0);
  torus('gear2',.31,.07,darkBrass,s*2.35,-.44,.55,Math.PI/2,0,0);
}

// Platen & carriage
cyl('platen',.43,5.15,black,0,1.16,-.42,0,0,Math.PI/2);
cyl('platenCore',.29,5.32,steel,0,1.16,-.42,0,0,Math.PI/2);
box('rail',5.65,.09,.11,brass,0,.66,.30);
for(const x of [-2.55,2.55]) cyl('knob',.28,.35,wood,x,1.16,-.42,0,0,Math.PI/2);

// Film / story reel visual on left
for(const x of [-2.76,-2.76]){}
cyl('reel',.72,.12,brass,-2.72,1.55,-.18,Math.PI/2,0,0);
torus('reelRing',.56,.06,darkBrass,-2.78,1.55,-.18,0,Math.PI/2,0);
for(let i=0;i<8;i++){
 const a=i*Math.PI/4; const spoke=box('spoke',.08,.03,.52,darkBrass,-2.79+Math.cos(a)*.23,1.55+Math.sin(a)*.23,-.18,0,Math.PI/2,-a);
}

// Keys
const rows=[{n:10,y:-.95,z:1.58,w:3.8},{n:9,y:-.76,z:1.25,w:3.45},{n:8,y:-.57,z:.94,w:3.05}];
for(const row of rows){
 for(let i=0;i<row.n;i++){
  const x=(i/(row.n-1)-.5)*row.w;
  const stem=cyl('stem',.055,.28,black,x,row.y+.10,row.z,0,0,0,24);
  const cap=cyl('key',.12,.10,brass,x,row.y+.27,row.z,0,0,0,24);
  cap.userData.baseY=cap.position.y;
 }
}
box('spacebar',2.7,.10,.22,ivory,0,-.82,1.95,.08,0,0);

// Type bars fan
for(let i=0;i<22;i++){
 const x=(i-10.5)*.16;
 const bar=box('typebar',.055,1.18,.055,steel,x,.25,.58,-.72,0,(i-10.5)*.01);
}

// Front plaque
const plaque=box('plaque',2.15,.42,.08,black,0,-.18,1.23,0,0,0);
plaque.material = new THREE.MeshStandardMaterial({color:0x20140d,metalness:.35,roughness:.35,emissive:0x120a05,emissiveIntensity:.2});

// Paper mesh (curved around roller). Subdivided plane and displaced in code.
const paperGeo = new THREE.PlaneGeometry(4.5,3.15,48,64);
const paperMat = new THREE.MeshStandardMaterial({color:0xe7d4ae,roughness:.95,metalness:0,side:THREE.DoubleSide,map:null});
const paper = new THREE.Mesh(paperGeo,paperMat); paper.castShadow=true; paper.receiveShadow=true; machine.add(paper);
paper.position.set(0,2.64,-.47);
paper.rotation.x=-.04;

function shapePaper(feed=0){
 const pos=paper.geometry.attributes.position;
 for(let i=0;i<pos.count;i++){
  const x=pos.getX(i), y=pos.getY(i);
  const ny=(y+1.575)/3.15; // 0..1
  let z=0;
  if(ny<.19){const t=(.19-ny)/.19; z=-.05-.52*Math.sin(t*Math.PI/2);}
  else z=.05*Math.pow(ny-.19,1.5);
  z += Math.sin((x*3.1+y*2.2)+feed*2.0)*0.007;
  pos.setZ(i,z);
 }
 pos.needsUpdate=true; paper.geometry.computeVertexNormals();
}
shapePaper();

// Small mechanical details/gears
for(let i=0;i<9;i++){
 const x=-2.1+i*.53; torus('miniGear',.13,.035,i%2?brass:darkBrass,x,.88,.24,Math.PI/2,0,0);
}

// Background desk props
function worldBox(sx,sy,sz,material,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),material);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;scene.add(m);return m}
worldBox(1.2,.16,2.2,wood,-4.0,-1.45,-.2).rotation.y=.08;
worldBox(1.1,.13,1.8,wood,4.15,-1.45,-.65).rotation.y=-.1;

// Dust motes
const dustN=650, dustGeo=new THREE.BufferGeometry(), dustPos=new Float32Array(dustN*3);
for(let i=0;i<dustN;i++){dustPos[i*3]=(Math.random()-.5)*15;dustPos[i*3+1]=Math.random()*8-1.5;dustPos[i*3+2]=(Math.random()-.5)*10;}
dustGeo.setAttribute('position',new THREE.BufferAttribute(dustPos,3));
const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({size:.018,color:0xc8a975,transparent:true,opacity:.32}));scene.add(dust);

function makePaperCanvas(project,index){
 const c=document.createElement('canvas'); c.width=1400; c.height=980; const ctx=c.getContext('2d');
 ctx.fillStyle='#e7d4ae';ctx.fillRect(0,0,c.width,c.height);
 // fibers/noise
 for(let i=0;i<25000;i++){const a=Math.random()*.055;ctx.fillStyle=`rgba(75,52,28,${a})`;ctx.fillRect(Math.random()*c.width,Math.random()*c.height,1+Math.random()*2,1+Math.random()*2)}
 ctx.fillStyle='#2a2118';ctx.textBaseline='top';
 const mono='"Special Elite", Courier New, monospace';
 ctx.font=`38px ${mono}`;ctx.fillText(DATA.owner.toUpperCase(),100,76);
 ctx.font=`25px ${mono}`;ctx.fillStyle='#685540';ctx.fillText(DATA.subtitle,100,128);
 ctx.strokeStyle='rgba(80,58,38,.45)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(100,176);ctx.lineTo(1300,176);ctx.stroke();
 ctx.fillStyle='#2a2118';ctx.font=`28px ${mono}`;ctx.fillText(`PROJECT ${String(index+1).padStart(2,'0')}`,100,225);
 ctx.font=`bold 66px ${mono}`;wrapText(ctx,project.title,100,278,1180,72);
 ctx.font=`28px ${mono}`;ctx.fillStyle='#574638';ctx.fillText(`${project.client}  /  ${project.category}  /  ${project.year}`,100,455);
 ctx.font=`29px ${mono}`;ctx.fillStyle='#33281e';wrapText(ctx,project.description||'',100,525,1190,42);
 if(project.image){
   // image loads async; caller handles refresh
 }
 ctx.font=`bold 26px ${mono}`;ctx.fillStyle='#1f1812';ctx.fillText('[ PLAY FILM ]',100,875);
 return c;
}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){const words=(text||'').split(' ');let line='';for(let n=0;n<words.length;n++){const test=line+words[n]+' ';if(ctx.measureText(test).width>maxWidth&&n>0){ctx.fillText(line,x,y);line=words[n]+' ';y+=lineHeight}else line=test}ctx.fillText(line,x,y);return y}

let currentIndex=-1; let currentTexture=null;
async function renderProject(index){
 const p=DATA.projects[index]; if(!p) return;
 const c=makePaperCanvas(p,index), ctx=c.getContext('2d');
 if(p.image){
  try{const img=new Image(); img.crossOrigin='anonymous'; await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=p.image});
   const box={x:805,y:615,w:495,h:235}; const r=Math.min(box.w/img.width,box.h/img.height);const w=img.width*r,h=img.height*r;ctx.save();ctx.globalAlpha=.93;ctx.drawImage(img,box.x+(box.w-w)/2,box.y+(box.h-h)/2,w,h);ctx.restore();
  }catch(e){}
 }
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
 if(currentTexture) currentTexture.dispose();currentTexture=tex; paper.material.map=tex;paper.material.needsUpdate=true;
 currentIndex=index;
 document.querySelector('#project-count').textContent=`${String(index+1).padStart(2,'0')} / ${String(DATA.projects.length).padStart(2,'0')}`;
 const btn=document.querySelector('#playButton'); if(p.playUrl){btn.hidden=false;btn.onclick=()=>window.open(p.playUrl,'_blank','noopener')} else btn.hidden=true;
}

const contact=document.querySelector('#contactLink');contact.textContent=`${DATA.contact} ↗`;contact.href=`mailto:${DATA.contact}`;

let targetScroll=0, smoothScroll=0;
function updateScroll(){const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);targetScroll=scrollY/max}
addEventListener('scroll',updateScroll,{passive:true}); updateScroll();

function animate(){
 requestAnimationFrame(animate); smoothScroll += (targetScroll-smoothScroll)*.055;
 const p=smoothScroll; const projects=Math.max(1,DATA.projects.length);
 const projectProgress=Math.min(.9999,p*1.06)*projects; const idx=Math.min(projects-1,Math.floor(projectProgress)); const local=projectProgress-idx;
 if(idx!==currentIndex) renderProject(idx);
 // cinematic camera track
 const intro=Math.min(1,p/.18); camera.position.z=THREE.MathUtils.lerp(8.3,6.45,intro);camera.position.y=THREE.MathUtils.lerp(2.2,1.8,intro);
 camera.position.x=Math.sin(p*Math.PI*1.4)*.34; camera.lookAt(0,.22,-.15);
 machine.rotation.y=Math.sin(p*Math.PI*2)*.035;
 // paper feed per project: rises, then settles
 paper.position.y=2.64 + local*.62; paper.rotation.x=-.04 + local*.025; shapePaper(local);
 // carriage motion
 const rail=machine.getObjectByName('rail'); if(rail) rail.position.x = Math.sin(local*Math.PI*10)*.08;
 // subtle key animation
 const keys=machine.children.filter(o=>o.name==='key'); if(keys.length){const k=keys[Math.floor((performance.now()/95)%keys.length)]; if(k){k.position.y=k.userData.baseY-.06; setTimeout(()=>{if(k)k.position.y=k.userData.baseY},55)}}
 dust.rotation.y += .00025;
 renderer.render(scene,camera);
}

addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
renderProject(0).then(()=>{document.querySelector('#loader').classList.add('hide');animate();});
