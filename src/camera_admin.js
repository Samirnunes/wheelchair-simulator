import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"

export class CameraAdmin{
    constructor(sizes){
        this.camera = new THREE.PerspectiveCamera(80, sizes.width/sizes.height, 0.1, 10000)
        this.cameraInitialPosition = new THREE.Vector3(90, 2, 110);
        this.cameraInitialRotation = new THREE.Vector3(0, 0, 0);
        this.cameraQuaternion = new THREE.Quaternion();
        this.cameraMovementSpeed = 10;
        this.camera.position.set(this.cameraInitialPosition.x, this.cameraInitialPosition.y, this.cameraInitialPosition.z);
        this.camera.rotation.set(this.cameraInitialRotation.x, this.cameraInitialRotation.y, this.cameraInitialRotation.z);
        this.cameraSensitivity = 0.04;
        this.mouse = new THREE.Vector2();
        this.previousMouse = new THREE.Vector2();
        this.movementKeys = { a: false, s: false, w: false, d: false };

        this.#configureBody()
        this.#configureMesh()
        this.#addEventListeners()
    }

    addToScene(scene, world){
        scene.add(this.camera);
        scene.add(this.cameraMesh);
        world.addBody(this.cameraBody);
    }

    #configureBody(){
        this.cameraBody = new CANNON.Body({
            mass: 70,
            shape: new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5)),
        });
        this.cameraBody.position.copy(this.camera.position);
    }

    #configureMesh(){
        const cameraGeometry = new THREE.BoxGeometry(2, 2, 2);
        const cameraMaterial = new THREE.MeshNormalMaterial();
        this.cameraMesh = new THREE.Mesh(cameraGeometry, cameraMaterial);
        this.cameraMesh.position.copy(this.cameraBody.position)
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