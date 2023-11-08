import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"
import { Admin } from "./admin.js";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js"

export class CameraAdmin extends Admin{
    constructor(scene, world, sizes){
        super(scene, world);
        this.sizes = sizes;
        this.#configureCamera();
        this.#configureBody();
        this.#configureMesh();
        this.#addEventListeners();
        console.log(this.cameraMesh)
    }

    addToScene(){
        this.scene.add(this.camera);
        this.world.addBody(this.cameraBody);
        this.scene.add(this.cameraMesh);
    }

    translateCamera(){
        const movementKeys = this.movementKeys;
        const cameraMovementSpeed = this.cameraMovementSpeed;
        var cameraQuaternion = this.cameraQuaternion;
    
        // Define movement vectors relative to the camera's orientation
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(cameraQuaternion);
        const backward = new THREE.Vector3(0, 0, 1).applyQuaternion(cameraQuaternion);
        const impulseForce = new CANNON.Vec3(0, 0, 0);
    
        // Update camera position based on ASWD key presses
        if (movementKeys.s && !this.sKeyPressed) {
            this.cameraBody.velocity.copy(new CANNON.Vec3(0, 0, 0));
            backward.y = 0;
            backward.normalize();
            const backwardImpulse = backward.multiplyScalar(cameraMovementSpeed);
            impulseForce.vadd(backwardImpulse, impulseForce);
            this.sKeyPressed = true;
        }
        if (movementKeys.w && !this.wKeyPressed) {
            // Project the forward movement onto the XZ plane
            this.cameraBody.velocity.copy(new CANNON.Vec3(0, 0, 0));
            forward.y = 0;
            forward.normalize();
            const forwardImpulse = forward.multiplyScalar(cameraMovementSpeed);
            impulseForce.vadd(forwardImpulse, impulseForce);
            this.wKeyPressed = true;
        }
    
        if(!movementKeys.s){
            this.sKeyPressed = false;
        }
    
        if (!movementKeys.w) {
            this.wKeyPressed = false;
        }
    
        const cameraGravity = -1
        this.cameraBody.velocity.vadd(this.cameraBody.velocity, new CANNON.Vec3(0, cameraGravity, 0));
        this.cameraBody.applyImpulse(impulseForce, new CANNON.Vec3(0, 0, 0));
    }

    rotateCamera(){
        var mouse = this.mouse;
        const previousMouse = this.previousMouse;
        var cameraRotation = this.cameraInitialRotation;
        var cameraQuaternion = this.cameraQuaternion;
        const initialCameraQuaternion = new THREE.Quaternion();
        const cameraSensitivity = this.cameraSensitivity;
    
        // Calculate the change in mouse position
        const delta = new THREE.Vector2().subVectors(mouse, previousMouse);
    
        // Determine which axis to rotate based on the mouse movement
        if (Math.abs(delta.x) > Math.abs(delta.y) & Math.abs(mouse.x) * this.sizes.width > 0.5 * this.sizes.width/2) {
            // Update camera rotation based on horizontal mouse movement (around Y-axis)
            cameraRotation.y -= delta.x * cameraSensitivity;
        } else if(Math.abs(delta.x) <= Math.abs(delta.y) & Math.abs(mouse.y) * this.sizes.height > 0.5 * this.sizes.height/2){
            // Update camera rotation based on vertical mouse movement (around X-axis)
            cameraRotation.x += delta.y * cameraSensitivity;
    
            // Limit vertical rotation to prevent camera flipping
            cameraRotation.x = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, cameraRotation.x));
        }
    
        // Calculate the camera's quaternion
        cameraQuaternion.setFromRotationMatrix(
            new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(cameraRotation.x, cameraRotation.y, 0, 'YXZ'))
        );
    
        // Set the camera's new rotation
        this.camera.rotation.set(0, 0, 0); // Reset the rotation
        this.camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), cameraRotation.y);
        this.camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), cameraRotation.x);
        this.cameraBody.quaternion.copy(initialCameraQuaternion);
    }

    overlapCamera(){
        this.camera.position.copy(this.cameraBody.position);
        // To see the wheelchair
        this.camera.position.y += 1.7;
        
        this.cameraMesh.position.copy(this.cameraBody.position);
        this.cameraMesh.quaternion.copy(this.camera.quaternion);
        // To avoid rotations in xz plane
        this.cameraMesh.quaternion.x = 0; 
        this.cameraMesh.quaternion.z = 0;
        // Adjust mesh rotation
        const angleInRadians = Math.PI; // 180 degrees in radians
        const axis = new THREE.Vector3(0, 1, 0); // y-axis
        const additionalRotation = new THREE.Quaternion().setFromAxisAngle(axis, angleInRadians);
        this.cameraMesh.quaternion.multiply(additionalRotation)
    }

    #configureCamera(){
        this.camera = new THREE.PerspectiveCamera(80, this.sizes.width/this.sizes.height, 0.1, 10000)
        this.cameraInitialPosition = new THREE.Vector3(90, 2, 110);
        this.cameraInitialRotation = new THREE.Vector3(0, 0, 0);
        this.cameraQuaternion = new THREE.Quaternion();
        this.cameraMovementSpeed = 500;
        this.camera.position.set(this.cameraInitialPosition.x, this.cameraInitialPosition.y, this.cameraInitialPosition.z);
        this.camera.rotation.set(this.cameraInitialRotation.x, this.cameraInitialRotation.y, this.cameraInitialRotation.z);
        this.cameraSensitivity = 0.04;
        this.mouse = new THREE.Vector2();
        this.previousMouse = new THREE.Vector2();
        this.movementKeys = { a: false, s: false, w: false, d: false };
        this.wKeyPressed = false;
        this.sKeyPressed = false;
    }

    #configureBody(){
        this.cameraBody = new CANNON.Body({
            mass: 70,
            shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
            linearDamping: 0.3,
        });
        this.cameraBody.position.copy(this.camera.position);
    }

    #configureMesh(){
        this.loader = new GLTFLoader();
        this.mesh_path = "../assets/wheelchair/wheelchair.glb";
        this.loader.load(this.mesh_path, glb => {
            this.scene.add(glb.scene)
            this.cameraMesh = glb.scene.children[0]
        })
    }

    #addEventListeners(){
        document.addEventListener("mousemove", (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          });
        
        document.addEventListener("keydown", (event) => {
            if (event.key === "a") this.movementKeys.a = true;
            if (event.key === "d") this.movementKeys.d = true;
            if (event.key === "w") this.movementKeys.w = true;
            if (event.key === "s") this.movementKeys.s = true;
        });
          
        document.addEventListener("keyup", (event) => {
            if (event.key === "a") this.movementKeys.a = false;
            if (event.key === "d") this.movementKeys.d = false;
            if (event.key === "w") this.movementKeys.w = false;
            if (event.key === "s") this.movementKeys.s = false;
        });
    }
}