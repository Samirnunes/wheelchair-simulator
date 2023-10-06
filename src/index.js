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
const myWorld = new CANNON.World();
myWorld.gravity.set(0, 0.1, 0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper)

var cityAdmin = new CityAdmin();
var lightAdmin = new LightAdmin();
var cameraAdmin = new CameraAdmin(sizes);
var rendererAdmin = new RendererAdmin(canvas, sizes);

cityAdmin.addToScene(scene, myWorld);
lightAdmin.addToScene(scene);
cameraAdmin.addToScene(scene, myWorld);

var meshBodyPairs = cityAdmin.getMeshBodyPairs();
var cameraBody = cameraAdmin.getCameraBody();
meshBodyPairs = meshBodyPairs.filter(item => item !== cameraBody);

function animate() {
    requestAnimationFrame(animate);
  
    ANIMATIONS.translateCamera(cameraAdmin, myWorld.gravity);
    ANIMATIONS.rotateCamera(sizes, cameraAdmin);
    ANIMATIONS.moveCameraBody(cameraBody, cameraAdmin);
    //ANIMATIONS.moveCityBodies(meshBodyPairs);
    
    rendererAdmin.renderer.render(scene, cameraAdmin.camera);
    myWorld.step(1/60);
  }

animate()