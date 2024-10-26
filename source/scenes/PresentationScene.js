import * as three from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import Button from "../components/Button";

export default class PresentationScene {
  constructor() {
    this.scene = new three.Scene();

    // Crear una Camara
    this.camera = new three.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Cargar la fuente y crear el título en 3D
    const fontLoader = new FontLoader();
    fontLoader.load("./gentilis_regular.typeface.json", (font) => {
      const geometry = new TextGeometry("Veamos sobre fisica", {
        font: font,
        size: 1,
        height: 0.2,
      });

      const material = new three.MeshBasicMaterial({ color: 0xffffff });
      const title = new three.Mesh(geometry, material);
      // Centrar el título
      title.position.set(-5.5, 2, 1);
      this.scene.add(title);
    });

    // Fondo
    const backgroundColor = new three.Color(0x87ceeb);
    this.scene.background = backgroundColor;

    // Luz simple
    const light = new three.AmbientLight(0x404040);
    this.scene.add(light);

    // Boton para cambiar de escena
    const button = document.createElement("custom-button");
    document.body.appendChild(button);
  }

  // Método para actualizar la escena
  update() {
    // Rotar la esfera para animar un poco la presentación
    this.sphere.rotation.x += 0.01;
    this.sphere.rotation.y += 0.01;
  }

  // Método para limpiar la escena si es necesario
  clear() {
    this.scene.remove(this.sphere);
  }
}
