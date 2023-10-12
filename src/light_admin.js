import * as THREE from "../node_modules/three/build/three.module.js"

export class LightAdmin{
    constructor(){
        this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 ); 
    }

    addToScene(scene){
        scene.add(this.hemiLight);
    }
}

