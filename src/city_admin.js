import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"
import * as CANNON_UTILS from "./cannon_utils.js"
import {GLTFLoader} from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js"

export class CityAdmin{
    constructor(){
        this.loader = new GLTFLoader()
        this.city_path = "../assets/city.glb"
        this.meshBodyPairs = [];
    }

    addToScene(scene, world) {
        this.loader.load(this.city_path, glb => {
            glb.scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    this.#modifyMaterial(child);
                    const body = this.#getBody(child);
                    world.addBody(body);
                    this.meshBodyPairs.push([child, body]);
                }
            });
            scene.add(glb.scene);
        })
    }

    getMeshBodyPairs(){
        return this.meshBodyPairs;
    }

    #modifyMaterial(mesh){
        if(mesh.material){
            mesh.material.metalness = 0;
            mesh.material.side = THREE.DoubleSide;
        }
    }

    #getBody(mesh){
        const bodyShape = CANNON_UTILS.geometryToCannonShape(mesh.geometry)
        var body = new CANNON.Body({
            mass: 0,
            shape: bodyShape,
        })
        body.position.copy(mesh.position);
        body.quaternion.copy(mesh.quaternion);

        return body
    }
}