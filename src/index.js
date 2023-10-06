import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon/build/cannon.js"
import * as ANIMATIONS from "./animations.js"
import {CityAdmin} from "./city_admin.js"
import {LightAdmin} from "./light_admin.js"
import {CameraAdmin} from "./camera_admin.js"
import {RendererAdmin} from "./renderer_admin.js"

const canvas = document.querySelector('.webgl')
const myScene = new THREE.Scene()
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const myWorld = new CANNON.World();
myWorld.gravity.set(0, 0.1, 0);

const axesHelper = new THREE.AxesHelper(100);
myScene.add(axesHelper)

var cityAdmin = new CityAdmin();
var lightAdmin = new LightAdmin();
var cameraAdmin = new CameraAdmin(sizes);
var rendererAdmin = new RendererAdmin(canvas, sizes);

cityAdmin.addToScene(myScene, myWorld);
lightAdmin.addToScene(myScene);
cameraAdmin.addToScene(myScene, myWorld);

var meshBodyPairs = cityAdmin.getMeshBodyPairs();

function animate() {
    requestAnimationFrame(animate);
  
    ANIMATIONS.translateCamera(cameraAdmin, myWorld.gravity);
    ANIMATIONS.rotateCamera(cameraAdmin, sizes);
    ANIMATIONS.moveCityBodies(meshBodyPairs);
    //ANIMATIONS.handleCameraCollisions(cameraAdmin, myWorld)
    
    rendererAdmin.renderer.render(myScene, cameraAdmin.camera);
    myWorld.step(1/60);
  }

animate()