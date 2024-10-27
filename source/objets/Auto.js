import * as THREE from "three";

class Auto {
  constructor() {
    this.auto = new THREE.Group(); // Agrupa todas las partes del auto
  }

  create() {
    // Crear la geometría del cuerpo del auto
    const carGeometry = new THREE.BoxGeometry(1, 0.5, 2);
    const carMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const carBody = new THREE.Mesh(carGeometry, carMaterial);
    carBody.position.y = 0.25;

    // Crear las ruedas del auto
    const wheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
    const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    // Crear y posicionar las cuatro ruedas
    const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontLeftWheel.position.set(0.5, 0, 1);
    frontLeftWheel.rotation.z = Math.PI / 2;

    const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontRightWheel.position.set(-0.5, 0, 1);
    frontRightWheel.rotation.z = Math.PI / 2;

    const backLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    backLeftWheel.position.set(0.5, 0, -1);
    backLeftWheel.rotation.z = Math.PI / 2;

    const backRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    backRightWheel.position.set(-0.5, 0, -1);
    backRightWheel.rotation.z = Math.PI / 2;

    // Agrupar todas las partes del auto
    this.auto.add(carBody);
    this.auto.add(
      frontLeftWheel,
      frontRightWheel,
      backLeftWheel,
      backRightWheel
    );
  }

  getAuto() {
    return this.auto;
  }

  move(x, y, z) {
    this.auto.position.set(x, y, z);
  }
}

export default Auto;
