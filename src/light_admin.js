import * as THREE from "../node_modules/three/build/three.module.js"

export class LightAdmin{
    constructor(){
        this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 ); 
        this.dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
        this.dirLight1.position.set(50, 100, -50);
        this.dirLight1.castShadow = true;
        this.dirLight1.shadow.camera.top = 2;
        this.dirLight1.shadow.camera.bottom = - 2;
        this.dirLight1.shadow.camera.left = - 2;
        this.dirLight1.shadow.camera.right = 2;
        this.dirLight1.shadow.camera.near = 0.1;
        this.dirLight1.shadow.camera.far = 40;
    }

    addToScene(scene){
        scene.add(this.hemiLight);
        scene.add(this.dirLight1);
    }
}

