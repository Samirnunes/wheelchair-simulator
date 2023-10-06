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

var cityAdmin = new CityAdmin();
var lightAdmin = new LightAdmin();
var cameraAdmin = new CameraAdmin(sizes);
var rendererAdmin = new RendererAdmin(canvas, sizes);

cityAdmin.addToScene(myScene, myWorld);
lightAdmin.addToScene(myScene);
cameraAdmin.addToScene(myScene, myWorld);

const boxBody = new CANNON.Body({
  mass: 2,
  shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
});
boxBody.position.set(1, 20, 0);
myWorld.addBody(boxBody);
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshNormalMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
myScene.add(boxMesh);

var meshBodyPairs = cityAdmin.getMeshBodyPairs();

function animate() {
    requestAnimationFrame(animate);
  
    ANIMATIONS.translateCamera(cameraAdmin, myWorld.gravity);
    ANIMATIONS.rotateCamera(cameraAdmin, sizes);
    ANIMATIONS.moveCityBodies(meshBodyPairs);
    boxMesh.position.copy(boxBody.position);
    boxMesh.quaternion.copy(boxBody.quaternion);
    //ANIMATIONS.handleCameraCollisions(cameraAdmin, myWorld)
    
    myWorld.step(1/60);
    rendererAdmin.renderer.render(myScene, cameraAdmin.camera);
}

animate()