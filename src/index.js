import * as THREE from "../node_modules/three/build/three.module.js"
import * as ANIMATIONS from "./animation_moves.js"
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

var cityAdmin = new CityAdmin()
var lightAdmin = new LightAdmin()
var cameraAdmin = new CameraAdmin(sizes)
var rendererAdmin = new RendererAdmin(canvas, sizes)

cityAdmin.addToScene(scene)
lightAdmin.addToScene(scene)
cameraAdmin.addToScene(scene)

function animate() {
    requestAnimationFrame(animate);
  
    ANIMATIONS.translate(cameraAdmin);
    ANIMATIONS.rotate(sizes, cameraAdmin)
    
    rendererAdmin.renderer.render(scene, cameraAdmin.camera);
  }

animate()