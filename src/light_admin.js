import * as THREE from "../node_modules/three/build/three.module.js"

export class LightAdmin{
    constructor(){
        this.ambLight = new THREE.AmbientLight('white', 2);
    }

    addToScene(scene){
        scene.add(this.ambLight);
    }
}

