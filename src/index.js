import * as THREE from "../node_modules/three/build/three.module.js"
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js"

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const loader = new GLTFLoader()
loader.load("../assets/city.glb", function(glb){
    console.log(glb)
    const root = glb.scene;
    scene.add(root);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
    console.log("An error occurred")
})

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,2,5)
scene.add(light)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0, 1, 2)
scene.add(camera)

const cameraPosition = new THREE.Vector3(0, 1, 2);
const cameraSpeed = 0.1;

const arrowKeys = { left: false, right: false, up: false, down: false };

document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") arrowKeys.left = true;
  if (event.key === "ArrowRight") arrowKeys.right = true;
  if (event.key === "ArrowUp") arrowKeys.up = true;
  if (event.key === "ArrowDown") arrowKeys.down = true;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") arrowKeys.left = false;
  if (event.key === "ArrowRight") arrowKeys.right = false;
  if (event.key === "ArrowUp") arrowKeys.up = false;
  if (event.key === "ArrowDown") arrowKeys.down = false;
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
  
    // Update camera position based on arrow key presses
    if (arrowKeys.left) cameraPosition.x -= cameraSpeed;
    if (arrowKeys.right) cameraPosition.x += cameraSpeed;
    if (arrowKeys.up) cameraPosition.z -= cameraSpeed;
    if (arrowKeys.down) cameraPosition.z += cameraSpeed;
  
    // Set the camera's new position
    camera.position.copy(cameraPosition);
  
    renderer.render(scene, camera);
  }

animate()