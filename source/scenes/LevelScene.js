import * as THREE from "three";

export default class LevelScene {
  constructor() {
    this.scene = new THREE.Scene();

    // Crear cámara
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Crear objetos para el nivel 1
    this.createLevel(1);
  }

  // Crear un nivel basado en su número
  createLevel(level) {
    if (level === 1) {
      this.createLevel1();
    } else if (level === 2) {
      this.createLevel2();
    }
    // Añadir más niveles según sea necesario
  }

  // Nivel 1: Ejemplo de un nivel básico
  createLevel1() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  // Nivel 2: Otro ejemplo de un nivel diferente
  createLevel2() {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);
  }

  // Actualizar la animación del nivel
  update() {
    if (this.cube) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }
  }

  // Limpiar la escena
  clear() {
    if (this.cube) {
      this.scene.remove(this.cube);
    }
    if (this.sphere) {
      this.scene.remove(this.sphere);
    }
  }
}
