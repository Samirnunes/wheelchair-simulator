import * as THREE from "../node_modules/three/build/three.module.js"

export class MovementAdmin{
    constructor(){
        this.mouse = new THREE.Vector2();
        this.previousMouse = new THREE.Vector2();
        this.movementKeys = { a: false, s: false, w: false, d: false };

        document.addEventListener("mousemove", (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          });
        
        document.addEventListener("keydown", (event) => {
            if (event.key === "a") this.movementKeys.a = true;
            if (event.key === "d") this.movementKeys.d = true;
            if (event.key === "w") this.movementKeys.w = true;
            if (event.key === "s") this.movementKeys.s = true;
        });
          
        document.addEventListener("keyup", (event) => {
            if (event.key === "a") this.movementKeys.a = false;
            if (event.key === "d") this.movementKeys.d = false;
            if (event.key === "w") this.movementKeys.w = false;
            if (event.key === "s") this.movementKeys.s = false;
        });
    }
}