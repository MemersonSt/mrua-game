import * as THREE from "three";
import Auto from "../objets/Auto";

class LevelOneScene {
  constructor() {
    this.level = 1;
    this.autoPosition = new THREE.Vector3(0, 0.25, 0); // Posición inicial del auto
    this.moveDistance = 0.1;
    this.auto = new Auto();
  }

  create() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;
    this.camera.position.y = 5;
    this.camera.lookAt(0, 0, 0);

    // Cargar la textura del suelo
    const textureLoader = new THREE.TextureLoader();
    const groundTexture = textureLoader.load(
      "/source/scenes/texture/grasslight-big.jpg"
    );

    // Crear el suelo
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotar para que sea horizontal
    this.scene.add(ground);

    // Crear la carretera
    const roadGeometry = new THREE.PlaneGeometry(20, 5);
    const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2; // Rotar para que sea horizontal
    road.position.z = 3; // Elevar la carretera para que esté sobre el suelo
    this.scene.add(road);

    // Crear el auto
    this.auto.create();
    this.auto.getAuto().position.copy(this.autoPosition);
    this.scene.add(this.auto.getAuto());

    // Agregar luz
    const ambientLight = new THREE.AmbientLight(0x404040); // Luz ambiental
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional
    directionalLight.position.set(5, 10, 7.5);
    this.scene.add(directionalLight);

    // Cargar la textura del cielo
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(100, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x87ceeb })
    );
    sky.material.side = THREE.BackSide; // Renderizar el cielo en la parte de atrás
    this.scene.add(sky);

    // Agregar evento para mover el auto
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));

    // Renderizar la escena
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.animate();
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        this.autoPosition.z -= this.moveDistance;
        break;
      case "ArrowDown":
        this.autoPosition.z += this.moveDistance;
        break;
      case "ArrowLeft":
        this.autoPosition.x -= this.moveDistance;
        break;
      case "ArrowRight":
        this.autoPosition.x += this.moveDistance;
        break;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Interpolación para suavizar el movimiento
    this.auto.getAuto().position.lerp(this.autoPosition, 0.1);

    this.renderer.render(this.scene, this.camera);
  }

  init() {
    this.create();
  }
}

export default LevelOneScene;
