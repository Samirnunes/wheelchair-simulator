import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon/build/cannon.js"
import * as ANIMATIONS from "./animations.js"
import {CityAdmin} from "./city_admin.js"
import {LightAdmin} from "./light_admin.js"
import {CameraAdmin} from "./camera_admin.js"
import {RendererAdmin} from "./renderer_admin.js"

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const world = new CANNON.World();
world.gravity.set(0, -9.81, 0);

var cityAdmin = new CityAdmin();
var lightAdmin = new LightAdmin();
var cameraAdmin = new CameraAdmin(sizes);
var rendererAdmin = new RendererAdmin(canvas, sizes);

cityAdmin.addToScene(scene, world);
lightAdmin.addToScene(scene);
cameraAdmin.addToScene(scene, world);

var meshBodyPairs = cityAdmin.getMeshBodyPairs();
var cameraBody = cameraAdmin.getCameraBody();

function animate() {
    requestAnimationFrame(animate);
  
    ANIMATIONS.translateCamera(cameraAdmin);
    ANIMATIONS.rotateCamera(sizes, cameraAdmin);
    ANIMATIONS.moveCameraBody(cameraBody, cameraAdmin);
    ANIMATIONS.moveCityBodies(meshBodyPairs);
    
    rendererAdmin.renderer.render(scene, cameraAdmin.camera);
  }

animate()