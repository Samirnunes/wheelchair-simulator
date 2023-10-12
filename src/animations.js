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
    const cameraMovementSpeed = cameraAdmin.cameraMovementSpeed;
    var cameraQuaternion = cameraAdmin.cameraQuaternion;

    // Define movement vectors relative to the camera's orientation
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(cameraQuaternion);
    const backward = new THREE.Vector3(0, 0, 1).applyQuaternion(cameraQuaternion);
    const impulseForce = new CANNON.Vec3(0, 0, 0);

    // Update camera position based on ASWD key presses
    if (movementKeys.s && !cameraAdmin.sKeyPressed) {
        cameraAdmin.cameraBody.velocity.copy(new CANNON.Vec3(0, 0, 0));
        backward.y = 0;
        backward.normalize();
        const backwardImpulse = backward.multiplyScalar(cameraMovementSpeed);
        impulseForce.vadd(backwardImpulse, impulseForce);
        cameraAdmin.sKeyPressed = true;
    }
    if (movementKeys.w && !cameraAdmin.wKeyPressed) {
        // Project the forward movement onto the XZ plane
        cameraAdmin.cameraBody.velocity.copy(new CANNON.Vec3(0, 0, 0));
        forward.y = 0;
        forward.normalize();
        const forwardImpulse = forward.multiplyScalar(cameraMovementSpeed);
        impulseForce.vadd(forwardImpulse, impulseForce);
        cameraAdmin.wKeyPressed = true;
    }

    if(!movementKeys.s){
        cameraAdmin.sKeyPressed = false;
    }

    if (!movementKeys.w) {
        cameraAdmin.wKeyPressed = false;
    }

    const cameraGravity = -1
    cameraAdmin.cameraBody.velocity.vadd(cameraAdmin.cameraBody.velocity, new CANNON.Vec3(0, cameraGravity, 0));
    cameraAdmin.cameraBody.applyImpulse(impulseForce, new CANNON.Vec3(0, 0, 0));
}

export function rotateCamera(cameraAdmin, sizes){
    var mouse = cameraAdmin.mouse;
    const previousMouse = cameraAdmin.previousMouse;
    var cameraRotation = cameraAdmin.cameraInitialRotation;
    var cameraQuaternion = cameraAdmin.cameraQuaternion;
    const initialCameraQuaternion = new THREE.Quaternion();
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
    cameraAdmin.cameraBody.quaternion.copy(initialCameraQuaternion);
}
