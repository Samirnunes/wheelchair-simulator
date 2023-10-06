import * as CANNON from "../node_modules/cannon/build/cannon.js"

export function CreateCannonShape(geometry) {
    let vertices;

    if (geometry.index === null) {
        vertices = geometry.attributes.position.array;
    } else {
        const nonIndexedGeometry = geometry.clone().toNonIndexed();
        vertices = nonIndexedGeometry.attributes.position.array;
    }

    const indices = Object.keys(vertices).map(Number);
    
    return new CANNON.Trimesh(vertices.map(v => Number(v)), indices);
}