import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"
import { threeToCannon, ShapeType } from '../node_modules/three-to-cannon';
import {GLTFLoader} from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js"

export class CityAdmin{
    constructor(){
        this.loader = new GLTFLoader()
        this.city_path = "../assets/city2/city.glb"
        this.meshBodyPairs = [];
    }

    addToScene(scene, world) {
        this.loader.load(this.city_path, glb => {
            glb.scene.traverse(mesh => {
                if (mesh instanceof THREE.Mesh) {
                    this.#modifyMaterial(mesh);
                    const body = this.#getBody(mesh);
                    world.addBody(body);
                    this.meshBodyPairs.push([mesh, body]);
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
        const {shape, offset, quaternion} = threeToCannon(mesh, {type: ShapeType.HULL});
        var body = new CANNON.Body({
            mass: 0
        })
        body.position.copy(mesh.position);
        body.quaternion.copy(mesh.quaternion);
        body.addShape(shape, offset, quaternion);

        return body
    }
}