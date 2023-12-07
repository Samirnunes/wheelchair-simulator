import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"
import CannonDebugger from '../node_modules/cannon-es-debugger/dist/cannon-es-debugger.js'

export class WorldBuilder{
    #canvas;
    #scene;
    #sizes;
    #world;
    #cannonDebugger;
    #renderer;

    constructor(){
        this.#configureCanvas()
        this.#configureScene()
        this.#configureSizes()
        this.#configureWorld()
        this.#configureDebugger()
        this.#configureRenderer()
    }

    getCanvas(){
        return this.#canvas
    }

    getScene(){
        return this.#scene
    }

    getSizes(){
        return this.#sizes
    }

    getWorld(){
        return this.#world
    }

    getDebugger(){
        return this.#cannonDebugger
    }

    getRenderer(){
        return this.#renderer
    }

    #configureCanvas(){
        this.#canvas = document.querySelector('.webgl')
    }

    #configureScene(){
        this.#scene = new THREE.Scene()
    }

    #configureSizes(){
        this.#sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    #configureWorld(){
        this.#world = new CANNON.World();
        this.#world.broadphase = new CANNON.NaiveBroadphase();
        this.#world.solver.iterations = 10;
        this.#world.defaultContactMaterial.contactEquationStiffness = 1e10
        this.#world.defaultContactMaterial.contactEquationRelaxation = 10
        this.#world.broadphase.useBoundingBoxes = true;
        const yGravity = 0;
        this.#world.gravity.set(0, yGravity, 0);
    }

    #configureDebugger(){
        this.#cannonDebugger = new CannonDebugger(this.#scene, this.#world)
    }

    #configureRenderer(){
        this.#renderer = new THREE.WebGL1Renderer({
            canvas: this.#canvas,
            alpha: true, 
            depth: true
        });
        this.#renderer.setSize(this.#sizes.width, this.#sizes.height)
        this.#renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.#renderer.shadowMap.enabled = true
        this.#renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.#renderer.gammaOutput = true
    }
}