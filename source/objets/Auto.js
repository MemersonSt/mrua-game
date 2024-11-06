import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

class Auto {
    constructor() {
        this.auto = new THREE.Group();
        this.modelPath = './assets/model/Car.glb';
        this.loader = new GLTFLoader();
    }

    create(onLoadCallback) {
        this.loader.load(this.modelPath, (gltf) => {
            this.auto = gltf.scene;
            this.auto.scale.set(1, 1, 1);
            this.auto.position.set(0, 10, 2);

            if (onLoadCallback) {
                onLoadCallback(this.auto);
            }
        }, undefined, (error) => {
            console.error("Error loading the 3D model:", error);
        });
    }

    getAuto() {
        return this.auto;
    }

    move(x, y, z) {
        const newPosition = new THREE.Vector3(x, y, z);
        const direction = newPosition.clone().sub(this.auto.position).normalize();
        this.auto.position.copy(newPosition);

        if (direction.length() > 0) {
            const angle = Math.atan2(direction.x, direction.z);
            this.auto.rotation.y = angle;
        }
    }
}

export default Auto;