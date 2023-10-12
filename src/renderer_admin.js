import * as THREE from "../node_modules/three/build/three.module.js"

export class RendererAdmin{
    constructor(canvas, sizes){
        this.renderer = new THREE.WebGL1Renderer({
            canvas: canvas,
            alpha: true, 
            depth: true
        });
        this.renderer.setSize(sizes.width, sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.gammaOutput = true
    }
}