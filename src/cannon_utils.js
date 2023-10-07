import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"

export function meshToCannonShape(mesh) {
    var boundingBox = new THREE.Box3();
    boundingBox.setFromObject(mesh);
    // Extract the bounding box
    const { min, max } = boundingBox;

    // Calculate the dimensions of the box
    const width = max.x - min.x;
    const height = max.y - min.y;
    const depth = max.z - min.z;
  
    // Create a Cannon.js Box shape based on the dimensions
    const shape = new CANNON.Box(
      new CANNON.Vec3(width, height, depth) 
    );
  
    return shape;
  }