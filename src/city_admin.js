import * as THREE from "../node_modules/three/build/three.module.js"
import {GLTFLoader} from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js"

export class CityAdmin{
    constructor(){
        this.loader = new GLTFLoader()
        this.city_path = "../assets/city.glb"
    }

    addToScene(scene) {
        this.loader.load(this.city_path, function(glb){
            glb.scene.traverse( child => {
                if ( child.material ){
                    child.material.metalness = 0;
                    child.material.side = THREE.DoubleSide;
                } 
            } );
            scene.add(glb.scene);
        }, function(error){
            console.log("An error occurred")
        })
    }
}