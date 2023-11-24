import { WorldBuilder } from "./world_builder.js"
import { CityAdmin } from "./city_admin.js"
import { LightAdmin } from "./light_admin.js"
import { CameraAdmin } from "./camera_admin.js"
import { TextAdmin } from "./text_admin.js"

const worldBuilder = new WorldBuilder()
const scene = worldBuilder.getScene()
const sizes = worldBuilder.getSizes()
const world = worldBuilder.getWorld()
const cannonDebugger = worldBuilder.getDebugger()
const renderer = worldBuilder.getRenderer()

const cityAdmin = new CityAdmin(scene, world);
const lightAdmin = new LightAdmin(scene, world);
const cameraAdmin = new CameraAdmin(scene, world, sizes);
const textAdmin = new TextAdmin(scene, world);

cityAdmin.addToScene();
lightAdmin.addToScene();
cameraAdmin.addToScene();

textAdmin.modifyText("Esse é o nosso texto. Podemos escondê-lo (hideText) e mostrá-lo (showText) também!");
textAdmin.hideText();
textAdmin.showText();

function animate() {
    requestAnimationFrame(animate);

    cameraAdmin.translateCamera();
    cameraAdmin.rotateCamera();
    cameraAdmin.overlapCamera();

    console.log(cameraAdmin.camera.position)

    world.step(1/60);
    cannonDebugger.update() 
    renderer.render(scene, cameraAdmin.camera);
}

animate()