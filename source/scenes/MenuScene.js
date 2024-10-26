import * as THREE from "three";

export default class MenuScene {
  constructor() {
    this.scene = new THREE.Scene();

    // Crear una cámara
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Crear un plano que represente el menú
    const geometry = new THREE.PlaneGeometry(5, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.menuBackground = new THREE.Mesh(geometry, material);
    this.menuBackground.position.set(0, 0, 0);
    this.scene.add(this.menuBackground);

    // Texto "Niveles" como título del menú
    const textGeometry = new THREE.TextGeometry("Niveles", {
      font: new THREE.FontLoader().parse(
        require("./helvetiker_regular.typeface.json")
      ),
      size: 1,
      height: 0.2,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.title = new THREE.Mesh(textGeometry, textMaterial);
    this.title.position.set(-2, 1, 0.1);
    this.scene.add(this.title);
  }

  // Método de actualización
  update() {
    // Podemos animar el menú o mantenerlo estático
  }

  // Limpiar la escena si es necesario en el futuro
  clear() {
    this.scene.remove(this.menuBackground);
    this.scene.remove(this.title);
  }
}
