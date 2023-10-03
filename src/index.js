import * as THREE from "../node_modules/three/build/three.module.js"
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js"

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const loader = new GLTFLoader()
loader.load("../assets/city.glb", function(glb){
    const root = glb.scene;
    scene.add(root);
}, function(error){
    console.log("An error occurred")
})

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('../assets/cubemaps/sky_front.jpg')
let texture_bk = new THREE.TextureLoader().load('../assets/cubemaps/sky_back.jpg')
let texture_up = new THREE.TextureLoader().load('../assets/cubemaps/sky_up.jpg')
let texture_dn = new THREE.TextureLoader().load('../assets/cubemaps/sky_down.jpg')
let texture_rt = new THREE.TextureLoader().load('../assets/cubemaps/sky_right.jpg')
let texture_lf = new THREE.TextureLoader().load('../assets/cubemaps/sky_left.jpg')

materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

for(let i=0;i<6;i++) 
    materialArray[i].side = THREE.DoubleSide;

var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);

const hemLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add( hemLight );

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(2, 2, 5)
scene.add(dirLight)

const ambLight = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
scene.add( ambLight );

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0, 1, 2)
scene.add(camera)

const cameraPosition = new THREE.Vector3(0, 1, 2);
const cameraSpeed = 0.1;

const mouse = new THREE.Vector2();
const previousMouse = new THREE.Vector2();
const cameraRotation = new THREE.Vector2(0, 0);
const sensitivity = 0.02; // Adjust sensitivity to control rotation speed
const cameraQuaternion = new THREE.Quaternion();

const movementKeys = { a: false, s: false, w: false, d: false };

document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

document.addEventListener("keydown", (event) => {
    if (event.key === "a") movementKeys.a = true;
    if (event.key === "d") movementKeys.d = true;
    if (event.key === "w") movementKeys.w = true;
    if (event.key === "s") movementKeys.s = true;
});
  
document.addEventListener("keyup", (event) => {
    if (event.key === "a") movementKeys.a = false;
    if (event.key === "d") movementKeys.d = false;
    if (event.key === "w") movementKeys.w = false;
    if (event.key === "s") movementKeys.s = false;
});

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.render(scene, camera)

function animate() {
    requestAnimationFrame(animate);
  
    // Calculate the change in mouse position
    const delta = new THREE.Vector2().subVectors(mouse, previousMouse);
  
    // Define movement vectors relative to the camera's orientation
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(cameraQuaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cameraQuaternion);
  
    // Store the camera's initial Y position
    const initialY = camera.position.y;
  
    // Update camera position based on ASWD key presses
    if (movementKeys.a) cameraPosition.sub(right.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.d) cameraPosition.add(right.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.s) cameraPosition.sub(forward.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.w) cameraPosition.add(forward.clone().multiplyScalar(cameraSpeed));

    // Determine which axis to rotate based on the mouse movement
    if (Math.abs(delta.x) > Math.abs(delta.y) & Math.abs(mouse.x) * sizes.width > 0.5 * sizes.width/2) {
        // Update camera rotation based on horizontal mouse movement (around Y-axis)
        cameraRotation.y -= delta.x * sensitivity;
    } else if(Math.abs(delta.x) <= Math.abs(delta.y) & Math.abs(mouse.y) * sizes.height > 0.5 * sizes.height/2){
        // Update camera rotation based on vertical mouse movement (around X-axis)
        cameraRotation.x += delta.y * sensitivity;

        // Limit vertical rotation to prevent camera flipping
        cameraRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraRotation.x));
    }

    // Calculate the camera's quaternion
    cameraQuaternion.setFromRotationMatrix(
        new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(cameraRotation.x, cameraRotation.y, 0, 'YXZ'))
    );
    
    // Set the camera's new position
    camera.position.copy(cameraPosition);
  
    // Restore the initial Y position
    camera.position.y = initialY;
  
    // Set the camera's new rotation
    camera.rotation.set(cameraRotation.x, cameraRotation.y, 0);

    // Set the camera's new rotation
    camera.rotation.set(0, 0, 0); // Reset the rotation
    camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), cameraRotation.y);
    camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), cameraRotation.x);
    
    renderer.render(scene, camera);
  }

animate()