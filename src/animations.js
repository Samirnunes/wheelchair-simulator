import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon/build/cannon.js"

export function moveCityBodies(meshBodyPairs){
    for(var pair of meshBodyPairs){
        var mesh = pair[0];
        var body = pair[1];
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
    }
}

export function handleCameraCollisions(cameraAdmin, world) {
    const cameraPosition = cameraAdmin.camera.position.clone();
    const cameraQuaternion = cameraAdmin.cameraQuaternion;

    // Define the ray's direction (e.g., the camera's forward direction)
    const raycastDirection = new CANNON.Vec3(0, 0, -1).applyQuaternion(cameraQuaternion);

    // Set the ray's length (adjust as needed)
    const rayLength = 1; // Adjust the length as needed to cover the expected collision distance

    // Calculate the ray's end position
    const rayEndPosition = new CANNON.Vec3();
    raycastDirection.mult(rayLength, rayEndPosition);
    rayEndPosition.vadd(cameraPosition, rayEndPosition);

    // Create a ray for collision detection
    const result = new CANNON.RaycastResult();

    // Iterate through all bodies in the world
    for (const body of world.bodies) {
        // Cast the ray to detect collisions with this body
        if (body.shapes.length > 0) {
            const intersectionFound = body.raycastClosest(
                cameraPosition, // Start position of the ray
                rayEndPosition, // End position of the ray
                result // Store the result
            );

            if (intersectionFound) {
                cameraAdmin.camera.position.copy(result.hitPointWorld);
                // Handle collision response here
                // You can adjust camera position, direction, or apply forces to simulate collisions
                // Example: cameraAdmin.camera.position.copy(result.hitPointWorld);
                
                // Prevent the camera from moving through the collided object
                // You can adjust the camera's direction as needed
                // Example: cameraQuaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI);
            }
        }
    }
}

export function translateCamera(cameraAdmin, gravity){
    const movementKeys = cameraAdmin.movementKeys;
    var cameraQuaternion = cameraAdmin.cameraQuaternion;
    var cameraPosition = cameraAdmin.cameraInitialPosition;
    const cameraSpeed = cameraAdmin.cameraSpeed;

    // Define movement vectors relative to the camera's orientation
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(cameraQuaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cameraQuaternion);
  
    // Update camera position based on ASWD key presses
    if (movementKeys.a) cameraPosition.sub(right.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.d) cameraPosition.add(right.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.s) cameraPosition.sub(forward.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.w) cameraPosition.add(forward.clone().multiplyScalar(cameraSpeed));
    
    if (gravity) {
        cameraPosition.sub(gravity.clone());
    }

    // Set the camera's new position
    cameraAdmin.camera.position.copy(cameraPosition);
}

export function rotateCamera(cameraAdmin, sizes){
    var mouse = cameraAdmin.mouse;
    const previousMouse = cameraAdmin.previousMouse;
    var cameraRotation = cameraAdmin.cameraInitialRotation;
    var cameraQuaternion = cameraAdmin.cameraQuaternion;
    const cameraSensitivity = cameraAdmin.cameraSensitivity;

    // Calculate the change in mouse position
    const delta = new THREE.Vector2().subVectors(mouse, previousMouse);

    // Determine which axis to rotate based on the mouse movement
    if (Math.abs(delta.x) > Math.abs(delta.y) & Math.abs(mouse.x) * sizes.width > 0.5 * sizes.width/2) {
        // Update camera rotation based on horizontal mouse movement (around Y-axis)
        cameraRotation.y -= delta.x * cameraSensitivity;
    } else if(Math.abs(delta.x) <= Math.abs(delta.y) & Math.abs(mouse.y) * sizes.height > 0.5 * sizes.height/2){
        // Update camera rotation based on vertical mouse movement (around X-axis)
        cameraRotation.x += delta.y * cameraSensitivity;

        // Limit vertical rotation to prevent camera flipping
        cameraRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraRotation.x));
    }

    // Calculate the camera's quaternion
    cameraQuaternion.setFromRotationMatrix(
        new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(cameraRotation.x, cameraRotation.y, 0, 'YXZ'))
    );

    // Set the camera's new rotation
    cameraAdmin.camera.rotation.set(0, 0, 0); // Reset the rotation
    cameraAdmin.camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), cameraRotation.y);
    cameraAdmin.camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), cameraRotation.x);
}