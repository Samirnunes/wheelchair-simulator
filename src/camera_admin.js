import * as THREE from "../node_modules/three/build/three.module.js"

export class CameraAdmin{
    constructor(sizes){
        this.camera = new THREE.PerspectiveCamera(80, sizes.width/sizes.height, 0.1, 10000)
        this.cameraInitialPosition = new THREE.Vector3(0, 1, 2);
        this.cameraInitialRotation = new THREE.Vector3(0, 0, 0);
        this.camera.position.set(this.cameraInitialPosition.x, this.cameraInitialPosition.y, this.cameraInitialPosition.z);
        this.camera.rotation.set(this.cameraInitialRotation.x, this.cameraInitialRotation.y, this.cameraInitialRotation.z);
        this.cameraSpeed = 0.1;
        this.cameraSensitivity = 0.02;
        this.cameraQuaternion = new THREE.Quaternion();
    }

    addToScene(scene){
        scene.add(this.camera)
    }
}