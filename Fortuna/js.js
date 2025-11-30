import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

console.clear();

// load fonts
await (async function () {
  async function loadFont(fontface) {
    await fontface.load();
    document.fonts.add(fontface);
  }
  let fonts = [
    new FontFace(
      "Anta",
      "url(https://fonts.gstatic.com/s/anta/v1/gyBzhwQ3KsIyVFs7PQ.woff2) format('woff2')"
    )
  ];
  for (let font in fonts) {
    await loadFont(fonts[font]);
  }
})();

class WheelMachine extends THREE.Group{
  constructor(){
    super();
    
    const setGColor = (g, color) => {
      const c = new THREE.Color(color);
      g.setAttribute(
        "color", 
        new THREE.Float32BufferAttribute(
          Array.from({length: g.attributes.position.count}, () => {return [...c]}).flat(), 
          3
        )
      );
    }
    
    const rWheel = 5;
    
    // <body>
      // <main arc>
        const rArc = rWheel + 0.5;
        const arcThickness = 0.5;
        const arcAngle = Math.PI * 0.875;
        const gArc = new THREE.ExtrudeGeometry(
          new THREE.Shape()
            .absarc(0, 0, rArc + arcThickness, 0, arcAngle)
            .absarc(
              Math.cos(arcAngle) * (rArc + arcThickness * 0.5), 
              Math.sin(arcAngle) * (rArc + arcThickness * 0.5), 
              arcThickness * 0.5, 
              arcAngle, 
              arcAngle + Math.PI
            )
            .absarc(0, 0, rArc, arcAngle, Math.PI * 2, true)
            .absarc(rArc + arcThickness * 0.5, 0, arcThickness * 0.5, Math.PI, Math.PI * 2),
          {
            curveSegments: 50,
            bevelEnabled: true,
            bevelSegments: 5
          }
        ).rotateZ(arcAngle * -0.5);
        setGColor(gArc, "#fff");
        
        const gPointer = new THREE.ExtrudeGeometry(
          new THREE.Shape()
            .moveTo(0, -Math.hypot(0.25, 0.25))
            .lineTo(0.25, 0.25)
            .lineTo(-0.25, 0.25),
          {
            depth: 0.75,
            bevelEnabled: true
          }
        ).translate(0, rArc + 0.25, 0);
        setGColor(gPointer, "hsl(0, 100%, 75%)");
    
        const mArc = new THREE.MeshStandardMaterial({
          vertexColors: true,
          metalness: 0.9,
          roughness: 0.7
        })

        const arc = new THREE.Mesh(
          mergeGeometries([
            gArc.clone(),
            gArc.clone().rotateZ(Math.PI),
            gPointer
          ]),
          mArc
        );

        this.add(arc);
      // </main arc>
      
      // <wheel>
        const gWheel = new THREE.ExtrudeGeometry(
          new THREE.Shape()
            .absarc(0, 0, rWheel, 0, Math.PI * 2),
          {
            depth: 0.5,
            curveSegments: 200,
            bevelEnabled: true,
            bevelSegments: 5
          }
        );
    
        this.amountSectors = 12;
        const mWheel = [
          new THREE.MeshStandardMaterial({
            //color: "#ccc",
            metalness: 0.6,
            roughness: 0.9,
            map: (() => {
              const c = document.createElement("canvas");
              c.width = c.height = 1024;
              const ctx = c.getContext("2d");
              const u = val => val * 0.01 * c.height;
              
              ctx.fillStyle = "#fff";
              ctx.fillRect(0, 0, c.width, c.height);
              
              const amount = this.amountSectors;
              const r = 35;
              const a = Math.PI * 2 / amount;
              const hA = a * 0.5;
              ctx.font = `${u(10)}px Anta`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              
              ctx.translate(u(50), u(50));
              for(let i = 0; i < amount; i++){
                
                const iVal = i + (i % 2) * 4;
                ctx.fillStyle = `hsl(240, 100%, ${((iVal) / (amount - 1)) * 10 + 80}%)`;
                ctx.beginPath();
                  ctx.moveTo(
                    Math.cos(-hA + Math.PI * 0.5) * u(50),
                    Math.sin(-hA + Math.PI * 0.5) * u(50)
                  );
                  ctx.arc(0, 0, u(50), -hA - Math.PI * 0.5, hA - Math.PI * 0.5)
                  ctx.arc(0, 0, u(5), hA - Math.PI * 0.5, -hA - Math.PI * 0.5, true)
                ctx.closePath();
                ctx.fill();
                
                ctx.fillStyle = "navy";
                const text = i + 1;
                ctx.fillText(text, 0, -u(r));
                
                ctx.rotate(a);
              }
              
              ctx.lineWidth = u(2);
              ctx.strokeStyle = "#fff";
              ctx.beginPath();
              ctx.arc(0, 0, u(20), -Math.PI * 0.5 - hA, Math.PI * 0.5 - hA);
              ctx.stroke();
              
              ctx.strokeStyle = "navy";
              ctx.beginPath();
              ctx.arc(0, 0, u(20), Math.PI * 0.5 - hA, Math.PI * 1.5 - hA);
              ctx.stroke();
              
              ctx.fillStyle = "navy";
              ctx.beginPath();
              ctx.arc(0, 0, u(5), -hA - Math.PI * 0.5, Math.PI * 0.5 - hA);
              ctx.fill();
              
              const tex = new THREE.CanvasTexture(c);
              tex.colorSpace = "srgb";
              tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
              tex.offset.setScalar(0.5);
              tex.repeat.setScalar(1 / (rWheel * 2));
              return tex;
            })(),
            onBeforeCompile: shader => {
              shader.vertexShader = `
                varying float showTexture;
                ${shader.vertexShader}
              `.replace(
                `#include <begin_vertex>`,
                `#include <begin_vertex>
                  showTexture = step(0., normal.z);
                `
              );
              shader.fragmentShader = `
                varying float showTexture;
                ${shader.fragmentShader}
              `.replace(
                `#include <map_fragment>`,
                `#include <map_fragment>
                  
                  diffuseColor.rgb = mix(diffuse, diffuseColor.rgb, showTexture);
                `
              );
            }
          }),
          new THREE.MeshStandardMaterial({
            metalness: 0.9,
            roughness: 0.6
          })
        ];
        const wheel = new THREE.Mesh(gWheel, mWheel);
        wheel.rotation.z = Math.random() * Math.PI * 2;
        this.add(wheel);
        this.wheel = wheel;
      // <wheel>
      
      // <spin button>
        
        const shapeSpinButtonSize = new THREE.Vector2(2, 3);
        const shapeSpinButtonRoundness = 0.5;
        const hW = shapeSpinButtonSize.x * 0.5;
        const hH = shapeSpinButtonSize.y * 0.5;
        const cx = hW - shapeSpinButtonRoundness;
        const cy = hH - shapeSpinButtonRoundness;
        const aStep = Math.PI * 0.5;
        const shapeSpinButton = new THREE.Shape()
            .absarc( cx, cy, shapeSpinButtonRoundness, aStep * 0, aStep * 1)
            .absarc(-cx, cy, shapeSpinButtonRoundness, aStep * 1, aStep * 2)
            .absarc(-cx,-cy, shapeSpinButtonRoundness, aStep * 2, aStep * 3)
            .absarc( cx,-cy, shapeSpinButtonRoundness, aStep * 3, aStep * 4)
        const gSpinButton = new THREE.ExtrudeGeometry(
          shapeSpinButton,
          {
            depth: 0.01,
            curveSegments: 20,
            bevelEnabled: true,
            bevelSegments: 5
          }
        );
    
        this.spinButtonUniforms = {
          transition: {value: 0}
        }
        const mSpinButton = [
          new THREE.MeshBasicMaterial({
            map: (() => {
              const c = document.createElement("canvas");
              const ctx = c.getContext("2d");
              const sizeUnit = 512;
              c.width = sizeUnit * 2;
              c.height = sizeUnit * 3;
              const u = val => val * 0.01 * c.height;
              
              ctx.translate(c.width * 0.5, c.height * 0.55);
              
              ctx.font = `${u(15)}px Anta`;
              ctx.textAlign = "center";
              ctx.textBasline = "middle";
              ctx.fillStyle = "#fff";
              ["push", "hold", "release"].forEach((l, lIdx, lArr) => {
                const start = -(lArr.length - 1) * 0.5;
                const yPos = (start + lIdx) * 30;
                ctx.fillText(l, 0, u(yPos));
              });
              
              const tex = new THREE.CanvasTexture(c);
              tex.colorSpace = "srgb";
              tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
              tex.offset.setScalar(0.5);
              tex.repeat.set(1 / 2, 1 / 3);
              return tex;
            })(),
            onBeforeCompile: shader => {
              shader.uniforms.transition = this.spinButtonUniforms.transition;
              shader.vertexShader = `
                varying float showTexture;
                ${shader.vertexShader}
              `.replace(
                `#include <begin_vertex>`,
                `#include <begin_vertex>
                  showTexture = step(0., normal.z);
                `
              );
              shader.fragmentShader = `
                uniform float transition;
                varying float showTexture;
                ${shader.fragmentShader}
              `.replace(
                `#include <map_fragment>`,
                `#include <map_fragment>
                
                  vec3 colOff = mix(vec3(1), vec3(0), diffuseColor.r);
                  vec3 colOn = mix(vec3(0.25, 0.25, 1), vec3(1, 1, 1), diffuseColor.r);
                  
                  float tVal = 1. - transition;
                  float fw = fwidth(vMapUv.y);
                  float fTransition = smoothstep(tVal - fw, tVal + fw, vMapUv.y);
                  
                  diffuseColor.rgb = mix(colOff, colOn, fTransition);
                  
                  diffuseColor.rgb = mix(diffuse, diffuseColor.rgb, showTexture);
                `
              );
            
          }
          }),
          new THREE.MeshStandardMaterial({
            metalness: 0.9,
            roughness: 0.7
          })
        ];
        const spinButton = new THREE.Mesh(gSpinButton, mSpinButton);
        spinButton.position.set(-rArc - 0.2, 0, 1.25);
        this.add(spinButton);
        
      // </spin button>
    
      // <screen>
        this.screenCanvas = document.createElement("canvas");
        const sizeUnit = 512;
        this.screenCanvas.width = sizeUnit * 2;
        this.screenCanvas.height = sizeUnit * 3;
        this.screenTexture = new THREE.CanvasTexture(this.screenCanvas);
        this.screenTexture.colorSpace = "srgb";
        this.screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.screenTexture.offset.setScalar(0.5);
        this.screenTexture.repeat.set(1 / 2, 1 / 3);
        const gScreen = gSpinButton.clone();
        const mScreen = [
          new THREE.MeshBasicMaterial({
            map: this.screenTexture,
            onBeforeCompile: shader => {
              shader.vertexShader = `
                varying float showTexture;
                ${shader.vertexShader}
              `.replace(
                `#include <begin_vertex>`,
                `#include <begin_vertex>
                  showTexture = step(0., normal.z);
                `
              );
              shader.fragmentShader = `
                varying float showTexture;
                ${shader.fragmentShader}
              `.replace(
                `#include <map_fragment>`,
                `#include <map_fragment>
                  diffuseColor.rgb = mix(diffuse, diffuseColor.rgb, showTexture);
                `
              );
            }
          }),
          new THREE.MeshStandardMaterial({
            metalness: 0.9,
            roughness: 0.7
          })
        ];
        const screen = new THREE.Mesh(gScreen, mScreen);
        screen.position.set(rArc + 0.2, 0, 1.25);
        this.add(screen);
      // </screen>
    
      this.speedParams = {
        isRunning: true,
        easing: val => THREE.MathUtils.clamp(THREE.MathUtils.smoothstep(val, 0, 1), 0, 1),
        speedScale: 1,
        speedUp: 1 / 1,
        speedDown: -1 / 10,
        speedMultiplier: Math.PI * 2,
        speedDir: -1 / 10,
      }
      
      // <interaction>
        // single interactable object - spin button
        this.interaction = {
          raycaster: new THREE.Raycaster(),
          pointer: new THREE.Vector2(),
          intersections: null
        };
        const getIntersection = (event) => {
          const ia = this.interaction;
          ia.pointer.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
          ia.pointer.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
          ia.raycaster.setFromCamera( ia.pointer, camera );
          ia.intersections = ia.raycaster.intersectObject(spinButton);
          if (ia.intersections.length) {
            return true;
          }
          return false;
        }
        renderer.domElement.addEventListener("pointermove", (event) => {
          const isSpinButton = getIntersection(event);
          if (isSpinButton) {
            renderer.domElement.style.cursor = "pointer";
          } else {
            renderer.domElement.style.cursor = "auto";
          }
        });
        renderer.domElement.addEventListener("pointerdown", (event) => {
          if (getIntersection(event)){
            console.log("speed up");
            this.speedParams.isRunning = true;
            this.display();
            this.speedParams.speedDir = this.speedParams.speedUp;
          }
        });
        renderer.domElement.addEventListener("pointerup", (event) => {
          if (getIntersection(event)){
            console.log("slow down");
            this.speedParams.speedDir = this.speedParams.speedDown;
          }
        })
      // <interaction>
    
      this.display();
      
      
    // <body>
  }
  
  update(dt){
    const params = this.speedParams;
    
    params.speedScale += params.speedDir * dt;
    if (params.speedScale <= 0 && params.isRunning == true){
      this.showResult();
      params.isRunning = false;
    }
    this.spinButtonUniforms.transition.value = params.speedScale;
    params.speedScale = THREE.MathUtils.clamp(params.speedScale, 0, 1);
    
    const easedScale = params.easing(params.speedScale);
    const speedVal = dt * easedScale * params.speedMultiplier;
    this.wheel.rotation.z += speedVal;
  }
  
  display(number){
    console.log(number);
    const c = this.screenCanvas;
    const ctx = c.getContext("2d");
    const u = val => val * 0.01 * c.height;
    
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.save();
    
      ctx.translate(c.width * 0.5, c.height * 0.5);

      if (number != undefined) {
        ctx.fillStyle = "#88f";
        ctx.font = `${u(55)}px Anta`;
        ctx.fillText(number, 0, 0);
      } else {
        ctx.fillStyle = "#000";
        ctx.font = `${u(14)}px Anta`;
        ctx.fillText("spinning", 0, 0);
      }
    
    ctx.restore();
    
    const tex = this.screenTexture;
    tex.needsUpdate = true;
  }
  
  showResult(){
    const aSector = (Math.PI * 2) / this.amountSectors;
    const sectorId = Math.ceil(
      (
        (this.wheel.rotation.z + (aSector * 0.5)) 
        % 
        (Math.PI * 2)
      ) / aSector
    );
    this.display(sectorId);
  }
  
  
}

class BackStuff extends THREE.Mesh{
  constructor(){
    super();
    const amount = 10;
    const a = Math.PI / (amount - 1);
    const c = new THREE.Color();
    this.geometry = mergeGeometries(Array.from({length: amount}, (_, idx) => {
      const roundness = Math.random() * 0.5 + 0.1;
      const w = 5 + Math.random() * 5 + roundness;
      const h = 8 + Math.random() * 8 + roundness;
      const d = 0.5 + Math.random() + roundness;
      const dist = 15;
      const gBox = new RoundedBoxGeometry(w, h, d, 5, roundness)
        .rotateY((Math.random() - 0.5) * Math.PI)
        .translate(
          Math.cos(a * idx) * dist, 
          h * 0.5 - 6, 
          Math.sin(-a * idx) * dist
        );
      
      c.setHSL((Math.random() - 0.5) * 0.2 + ((1 / 3) * 2), 0.5, 0.25);
      gBox.setAttribute(
        "color", 
        new THREE.Float32BufferAttribute(
          Array.from(
            {length: gBox.attributes.position.count}, 
            () => {return [...c]}
          ).flat(), 
          3
        )
      );
      return gBox;
    }));
    this.material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      metalness: 0.9,
      roughness: 0.1
    });
  }
}

const scene = new THREE.Scene();
scene.background = new THREE.Color("#556");
const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 1, 100);
camera.position.set(-0.25, 0.1, 1).setLength(30);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

addEventListener("resize", event => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
})

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const pmremGenerator = new THREE.PMREMGenerator( renderer );
const room = new RoomEnvironment();
room.children[0].color.set("#a8a");
console.log(room)
const bgTexture = pmremGenerator.fromScene( room, 0.04 ).texture;
scene.environment = bgTexture;
scene.background = bgTexture;
scene.backgroundIntensity = 0.05;

const backStuff = new BackStuff();
scene.add(backStuff);

const wheelMachine = new WheelMachine();
scene.add(wheelMachine);

const clock = new THREE.Clock();
let t = 0;

renderer.setAnimationLoop(() => {
  const dt = clock.getDelta();
  t += dt;
  
  controls.update();
  
  wheelMachine.update(dt);
  
  renderer.render(scene, camera);
});
