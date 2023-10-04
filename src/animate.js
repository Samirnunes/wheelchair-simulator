import * as THREE from "../node_modules/three/build/three.module.js"

function animate(scene, sizes, cameraAdmin, movementAdmin, rendererAdmin) {
    requestAnimationFrame(animate);

    var mouse = movementAdmin.mouse;
    console.log(mouse);
    const previousMouse = movementAdmin.previousMouse;
    const movementKeys = movementAdmin.movementKeys;
    var cameraQuaternion = cameraAdmin.cameraQuaternion;
    var cameraPosition = cameraAdmin.camera.position;
    var cameraRotation = cameraAdmin.camera.rotation;
    const cameraSensitivity = cameraAdmin.cameraSensitivity;
    const cameraSpeed = cameraAdmin.cameraSpeed;
    const initialY = cameraPosition.y;
  
    // Calculate the change in mouse position
    const delta = new THREE.Vector2().subVectors(mouse, previousMouse);
  
    // Define movement vectors relative to the camera's orientation
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(cameraQuaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cameraQuaternion);
  
    // Update camera position based on ASWD key presses
    if (movementKeys.a) cameraPosition.sub(right.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.d) cameraPosition.add(right.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.s) cameraPosition.sub(forward.clone().multiplyScalar(cameraSpeed));
    if (movementKeys.w) cameraPosition.add(forward.clone().multiplyScalar(cameraSpeed));

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
    
    // Set the camera's new position
    cameraAdmin.camera.position.copy(cameraPosition);
  
    // Restore the initial Y position
    cameraAdmin.camera.position.y = initialY;
  
    // Set the camera's new rotation
    cameraAdmin.camera.rotation.set(cameraRotation.x, cameraRotation.y, 0);

    // Set the camera's new rotation
    cameraAdmin.camera.rotation.set(0, 0, 0); // Reset the rotation
    cameraAdmin.camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), cameraRotation.y);
    cameraAdmin.camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), cameraRotation.x);
    
    rendererAdmin.renderer.render(scene, cameraAdmin.camera);
  }