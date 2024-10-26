// import '../style.css'
// import javascriptLogo from '../javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from '../counter.js'
//
// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector('#counter'))
import * as THREE from "three";
import PresentationScene from "./scenes/PresentationScene";

let scene, camera, renderer;

function init() {
  // Crear la escena de presentación
  const presentationScene = new PresentationScene();
  scene = presentationScene.scene;
  camera = presentationScene.camera;
  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Escuchar cambios de tamaño de pantalla
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Actualizar la animación de la escena
  if (scene && scene.update) {
    scene.update();
  }

  renderer.render(scene, camera);
}

init();
