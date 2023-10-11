import * as THREE from "../node_modules/three/build/three.module.js"
import * as CANNON from "../node_modules/cannon-es/dist/cannon-es.js"

export function moveCityBodies(meshBodyPairs){
    for(var pair of meshBodyPairs){
        var mesh = pair[0];
        var body = pair[1];
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
    }
}

export function translateCamera(cameraAdmin){
    const movementKeys = cameraAdmin.movementKeys;
    var cameraQuaternion = cameraAdmin.cameraQuaternion;
    var cameraVelocity = new CANNON.Vec3(0, 0, 0);;

    // Define movement vectors relative to the camera's orientation
    const forward = new THREE.Vector3(0, 0, -10).applyQuaternion(cameraQuaternion);
    const backward = new THREE.Vector3(0, 0, 10).applyQuaternion(cameraQuaternion);
    const right = new THREE.Vector3(10, 0, 0).applyQuaternion(cameraQuaternion);
    const left = new THREE.Vector3(-10, 0, 0).applyQuaternion(cameraQuaternion);
  
    // Update camera position based on ASWD key presses
    if (movementKeys.a) cameraVelocity.copy(left.clone());
    if (movementKeys.d) cameraVelocity.copy(right.clone());
    if (movementKeys.s) cameraVelocity.copy(backward.clone());
    if (movementKeys.w) cameraVelocity.copy(forward.clone());

    // Set the camera's new position
    cameraAdmin.cameraBody.velocity.copy(cameraVelocity);
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
    cameraAdmin.cameraBody.quaternion.copy(cameraQuaternion);
    cameraAdmin.cameraMesh.quaternion.copy(cameraQuaternion);
}
