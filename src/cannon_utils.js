import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"

export function geometryToCannonShape(geometry) {
    // Extract the bounding box from the geometry
    geometry.computeBoundingBox();
    const { min, max } = geometry.boundingBox;
  
    // Calculate the dimensions of the box
    const width = max.x - min.x;
    const height = max.y - min.y;
    const depth = max.z - min.z;
  
    // Create a Cannon.js Box shape based on the dimensions
    const shape = new CANNON.Box(
      new CANNON.Vec3(0.1, 0.1, 0.1) 
    );
  
    return shape;
  }

/*

In Cannon.js:

The x-axis corresponds to the Three.js x-axis (right).
The y-axis corresponds to the Three.js z-axis (forwards).
The z-axis corresponds to the Three.js y-axis (upwards).

*/