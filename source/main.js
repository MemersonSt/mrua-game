import * as THREE from "three";
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

  animate();
  // setTimeout(SwitchToMenu, 5000);
}

function SwitchToMenu() {
  // scene.clear();
  const menuScene = new MenuScene();
  scene = menuScene.scene;
  camera = menuScene.camera;
  gameStateManager.changeState("menu");
}

function SwitchToPresentation() {
  // scene.clear();
  const presentationScene = new PresentationScene();
  scene = presentationScene.scene;
  camera = presentationScene.camera;
  gameStateManager.changeState("presentation");
}

function animate() {
  requestAnimationFrame(animate);

  // Actualizar la animación de la escena
  switch (gameStateManager.state) {
    case "presentation":
      SwitchToPresentation();
      break;
    case "menu":
      SwitchToMenu();
      break;
    case "playing":
      // scene.update();
      break;
    case "paused":
      // Lógica para el estado de pausa
      break;
    case "gameOver":
      // Lógica para el estado de fin del juego
      break;
  }
  renderer.render(scene, camera);
}

init();
