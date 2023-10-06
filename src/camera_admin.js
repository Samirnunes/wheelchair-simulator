import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon/build/cannon.js"

export class CameraAdmin{
    constructor(sizes){
        this.camera = new THREE.PerspectiveCamera(80, sizes.width/sizes.height, 0.1, 10000)
        this.cameraInitialPosition = new THREE.Vector3(0, 1, 2);
        this.cameraInitialRotation = new THREE.Vector3(0, 0, 0);
        this.cameraQuaternion = new THREE.Quaternion();
        this.camera.position.set(this.cameraInitialPosition.x, this.cameraInitialPosition.y, this.cameraInitialPosition.z);
        this.camera.rotation.set(this.cameraInitialRotation.x, this.cameraInitialRotation.y, this.cameraInitialRotation.z);
        this.cameraSpeed = 0.3;
        this.cameraSensitivity = 0.04;
        this.mouse = new THREE.Vector2();
        this.previousMouse = new THREE.Vector2();
        this.movementKeys = { a: false, s: false, w: false, d: false };
        const cameraShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
        this.cameraBody = new CANNON.Body({
            mass: 1,
            shape: cameraShape
          });
        this.#addEventListeners()
    }

    addToScene(scene, world){
        scene.add(this.camera)
        world.addBody(this.cameraBody);
    }

    getCameraBody(){
        return this.cameraBody;
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