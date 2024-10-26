import * as THREE from "three";
import PhysicScene from "./scenes/PhysicScene";
import PresentationScene from "./scenes/PresentationScene";
import GameStateManager from "./state/gameStateManager";
import MenuScene from "./scenes/MenuScene";

let scene, camera, renderer;

const gameStateManager = new GameStateManager();

const presentationScene = new PresentationScene();
const menuScene = new MenuScene();

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = presentationScene.camera;
  scene = presentationScene.scene;

  animate();
  // setTimeout(SwitchToMenu, 5000);
  setTimeout(SwitchToPhysicScene, 5000);
}

function SwitchToMenu() {
  scene.clear();
  const menuScene = new MenuScene();
  scene = menuScene.scene;
  camera = menuScene.camera;
  gameStateManager.changeState("menu");
}

function SwitchToPhysicScene() {
  if (scene) scene.clear();
  const physicScene = new PhysicScene();
  scene = physicScene.scene;
  camera = physicScene.camera;
  gameStateManager.changeState("Escena de fisica");

  
}

function animate() {
  requestAnimationFrame(animate);

  // Actualizar la animación de la escena
  // switch (gameStateManager.state) {
  //   case "presentation":
  //     presentationScene.update();
  //     break;
  //   case "menu":
  //     // scene.update();
  //     break;
  //   case "playing":
  //     // scene.update();
  //     break;
  //   case "paused":
  //     // Lógica para el estado de pausa
  //     break;
  //   case "gameOver":
  //     // Lógica para el estado de fin del juego
  //     break;
  // }
  renderer.render(scene, camera);
}

init();
