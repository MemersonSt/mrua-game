import * as three from "three"

export default class PhysicScene {
    constructor() {
        this.scene = new three.Scene();

        this.camera = new three.PerspectiveCamera(
            100,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );

        this.camera.position.z = 5;

        const backgroundColor = new three.Color(0x87ceeb);
        this.scene.background = backgroundColor;
    
        const light = new three.AmbientLight(0x404040);
        this.scene.add(light);

        const customButton = document.querySelector('custom-button');
        if (customButton){
            customButton.remove();
        }

        const imgElement = document.createElement('img');
        imgElement.src = "source/assets/ai-generated-cat-clip-art-free-png.webp";
        imgElement.style.width = "50px";
        imgElement.style.height = "50px";
        imgElement.style.position = "absolute";
        imgElement.style.left = "100px";
        imgElement.style.top = "100px";
        document.body.appendChild(imgElement);

        let posX = 100;
        let posY = 100;
        const moveDistance = 5;

        document.addEventListener("keydown", (event) => {
            console.log(event.key);
            if (event.key == "W" || event.key == "w" || event.key == "ArrowUp") {
                posY -= moveDistance;
            }
            else if (event.key == "S" || event.key == "s" || event.key == "ArrowDown") {
                posY += moveDistance;
            }
            else if (event.key == "A" || event.key == "a" || event.key == "ArrowLeft") {
                posX -= moveDistance;
            }
            else if (event.key == "D" || event.key == "d" || event.key == "ArrowRight") {
                posX += moveDistance;
            }

            imgElement.style.left = `${posX}px`;
            imgElement.style.top = `${posY}px`;
        });
    }
}