import { WorldBuilder } from "./world_builder.js"
import { CityAdmin } from "./city_admin.js"
import { LightAdmin } from "./light_admin.js"
import { CameraAdmin } from "./camera_admin.js"

const worldBuilder = new WorldBuilder()
const scene = worldBuilder.getScene()
const sizes = worldBuilder.getSizes()
const world = worldBuilder.getWorld()
const cannonDebugger = worldBuilder.getDebugger()
const renderer = worldBuilder.getRenderer()

var cityAdmin = new CityAdmin(scene, world);
var lightAdmin = new LightAdmin(scene, world);
var cameraAdmin = new CameraAdmin(scene, world, sizes);

cityAdmin.addToScene();
lightAdmin.addToScene();
cameraAdmin.addToScene();

function animate() {
    requestAnimationFrame(animate);
    
    cameraAdmin.translateCamera();
    cameraAdmin.rotateCamera();
    cameraAdmin.overlapCamera();

    world.step(1/60);
    cannonDebugger.update() 
    renderer.render(scene, cameraAdmin.camera);
}

animate()