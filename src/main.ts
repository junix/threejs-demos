import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

declare global { interface Window { __VIS_READY__?: boolean; __INTERACTION_COUNT__?: number } }
const W=1400,H=900,choice=new URLSearchParams(location.search).get('scene')??'orbital';
const canvas=document.createElement('canvas');canvas.id='stage';document.querySelector('#app')!.append(canvas);
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(W,H,false);renderer.setPixelRatio(1);renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,W/H,.1,100);camera.position.set(0,1.2,10.5);
const controls=new OrbitControls(camera,canvas);controls.enableDamping=false;controls.enablePan=false;controls.minDistance=5;controls.maxDistance=18;
scene.add(new THREE.HemisphereLight(0xbfe8ff,0x101426,2.2));const key=new THREE.DirectionalLight(0xffd7a1,4);key.position.set(5,7,8);scene.add(key);const rim=new THREE.PointLight(0x6d8cff,50,20);rim.position.set(-6,2,-4);scene.add(rim);
const root=new THREE.Group();scene.add(root);
const colors=[0x54d6c6,0xffd166,0xff6f91,0x7b9cff,0xb889ff,0x62b9ff];
const material=(c:number,opacity=.86)=>new THREE.MeshStandardMaterial({color:c,metalness:.36,roughness:.28,transparent:true,opacity,side:THREE.DoubleSide});
function orbital(){
  for(let i=0;i<9;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.1+i*.29,.012+(i%3)*.008,10,180),new THREE.MeshBasicMaterial({color:colors[i%6],transparent:true,opacity:.42}));ring.rotation.x=Math.PI/2.4+i*.045;ring.rotation.y=-.35+i*.08;root.add(ring);const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(.11+(i%3)*.045,1),material(colors[(i+2)%6]));const a=.72+i*.84;orb.position.set(Math.cos(a)*(1.1+i*.29),Math.sin(a)*.28,Math.sin(a)*(1.1+i*.29));root.add(orb)}
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.9,3),material(0xff9d66,.95));core.scale.set(1,1.12,1);root.add(core);root.rotation.x=.18;root.rotation.z=-.1;
}
function terrain(){
  const n=74,size=7.5,geo=new THREE.PlaneGeometry(size,size,n-1,n-1);const pos=geo.attributes.position;const cols=[] as number[];
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),y=pos.getY(i),z=.52*Math.sin(x*1.5)*Math.cos(y*1.15)+.24*Math.sin((x+y)*3.1)+.13*Math.cos(Math.hypot(x,y)*5);pos.setZ(i,z);const c=new THREE.Color().setHSL(.52+.16*(z+.8)/1.6,.75,.48+.18*(z+.8)/1.6);cols.push(c.r,c.g,c.b)}geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));geo.computeVertexNormals();
  const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,wireframe:false,metalness:.15,roughness:.55,transparent:true,opacity:.9,side:THREE.DoubleSide}));mesh.rotation.x=-1.05;mesh.rotation.z=-.28;root.add(mesh);
  const wire=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xcbefff,wireframe:true,transparent:true,opacity:.12}));wire.rotation.copy(mesh.rotation);wire.position.z=.015;root.add(wire);
}
function crystal(){
  const geo=new THREE.OctahedronGeometry(.31,0);for(let i=0;i<78;i++){const mesh=new THREE.Mesh(geo,material(colors[i%6],.66));const a=i*2.399,r=.4+.052*i;mesh.position.set(Math.cos(a)*r,(i%9)*.16-0.7+Math.sin(i*.7)*.25,Math.sin(a)*r*.55);mesh.rotation.set(i*.17,i*.31,i*.11);const s=.45+(i%7)*.13;mesh.scale.set(s,1.3*s,s);root.add(mesh)}
  const halo=new THREE.Mesh(new THREE.TorusKnotGeometry(2.15,.035,180,10,3,7),new THREE.MeshBasicMaterial({color:0xa8deff,transparent:true,opacity:.34}));halo.rotation.x=1.2;root.add(halo);root.rotation.y=-.45;
}
if(choice==='terrain')terrain();else if(choice==='crystal')crystal();else orbital();
function render(){renderer.render(scene,camera)}controls.addEventListener('change',render);window.__INTERACTION_COUNT__=0;canvas.addEventListener('pointermove',()=>window.__INTERACTION_COUNT__=(window.__INTERACTION_COUNT__??0)+1);canvas.addEventListener('pointerdown',()=>window.__INTERACTION_COUNT__=(window.__INTERACTION_COUNT__??0)+1);render();requestAnimationFrame(()=>{render();window.__VIS_READY__=true});
