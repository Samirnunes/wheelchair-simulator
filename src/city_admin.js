import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"
import { Admin } from "./admin.js";
import { threeToCannon, ShapeType } from '../node_modules/three-to-cannon';
import {GLTFLoader} from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js"

export class CityAdmin extends Admin{
    constructor(scene, world){
        super(scene, world);
        this.meshBodyPairs = [];
        this.#configureLoader()
        this.#configureCityPath()
    }

    addToScene() {
        this.loader.load(this.city_path, glb => {
            glb.scene.traverse(mesh => {
                if (mesh instanceof THREE.Mesh) {
                    mesh.receiveShadow = true;
                    mesh.castShadow = true;
                    this.#modifyMaterial(mesh);
                    const body = this.#getBody(mesh);
                    this.world.addBody(body);
                    this.meshBodyPairs.push([mesh, body]);
                }
            });
            this.scene.add(glb.scene);
        })
    }

    moveCityBodies(){
        for(var pair of this.meshBodyPairs){
            var mesh = pair[0];
            var body = pair[1];
            mesh.position.copy(body.position);
            mesh.quaternion.copy(body.quaternion);
        }
    }

    #configureLoader(){
        this.loader = new GLTFLoader();
    }

    #configureCityPath(){
        this.city_path = "../assets/city1/city.glb";
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