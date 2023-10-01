import * as THREE from './node_modules/three';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load your city model (replace 'city.glb' with your actual model file)
const loader = new THREE.GLTFLoader();
loader.load('./models/city.glb', (gltf) => {
    const model = gltf.scene;
    scene.add(model);
});

// Camera position
camera.position.z = 5;

// Arrow key controls
const moveSpeed = 0.1;
const arrowKeys = {
    left: false,
    right: false,
    up: false,
    down: false
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') arrowKeys.left = true;
    if (event.key === 'ArrowRight') arrowKeys.right = true;
    if (event.key === 'ArrowUp') arrowKeys.up = true;
    if (event.key === 'ArrowDown') arrowKeys.down = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') arrowKeys.left = false;
    if (event.key === 'ArrowRight') arrowKeys.right = false;
    if (event.key === 'ArrowUp') arrowKeys.up = false;
    if (event.key === 'ArrowDown') arrowKeys.down = false;
});

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    if (arrowKeys.left) camera.position.x -= moveSpeed;
    if (arrowKeys.right) camera.position.x += moveSpeed;
    if (arrowKeys.up) camera.position.y += moveSpeed;
    if (arrowKeys.down) camera.position.y -= moveSpeed;

    renderer.render(scene, camera);
};

animate();
