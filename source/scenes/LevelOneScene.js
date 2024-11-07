import * as THREE from "three";
import Auto from "../objets/Auto";
import Swal from "sweetalert2"
import {stateUser} from "../main.js";

class LevelOneScene {
    constructor() {
        this.autoPosition = new THREE.Vector3(0, 0.25, 5); // Initial car position
        this.velocity = new THREE.Vector3(0, 0, 0); // Initial car velocity
        this.acceleration = 0.02; // Car acceleration
        this.maxVelocity = 0.5; // Maximum car velocity
        this.decelerationRate = 0.95; // Deceleration rate
        this.auto = new Auto();
        this.distanciaMeta = 30; // Distance to the goal
        this.zonaMeta = 30; // Goal area
        this.isAccelerating = false; // Flag to check if accelerating
        this.accumulatedTime = 0; // Time accumulator for acceleration
        this.dataUser = stateUser;
    }

    create() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            100,
            window.innerWidth / window.innerHeight,
            0.5,
            1000
        );
        this.camera.position.z = 10;
        this.camera.position.y = 5;
        this.camera.lookAt(this.autoPosition);

        // Create the ground
        const ground = this.createGround();
        this.scene.add(ground);

        // Create the car
        this.auto.create((car) => {
            car.position.copy(this.autoPosition);
            this.scene.add(car);
        });

        // Add light
        const ambientLight = this.createLight();
        this.scene.add(ambientLight);

        const directionalLight = this.createLight();
        this.scene.add(directionalLight);

        const sky = this.createSky();
        this.scene.add(sky);

        this.createGoalArea();

        // Add event listeners to move the car
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));
        document.addEventListener("keyup", (event) => this.handleKeyUp(event));

        // Render the scene
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.animate();
    }

    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(400, 400);
        const groundMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color(0xffa500) }, // Orange color
                color2: { value: new THREE.Color(0xffffff) }  // White color
            },
            vertexShader: `
                varying vec3 vPosition;
                void main() {
                  vPosition = position;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
            fragmentShader: `
                uniform vec3 color1;
                uniform vec3 color2;
                varying vec3 vPosition;
                void main() {
                  float mixRatio = (vPosition.x + 200.0) / 400.0; // Adjust the range as needed
                  gl_FragColor = vec4(mix(color1, color2, mixRatio), 1.0);
                }
              `,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal

        return ground;
    }

    createLight() {
        const ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
        directionalLight.position.set(5, 10, 7.5);

        return directionalLight;
    }

    createSky() {
        const sky = new THREE.Mesh(
            new THREE.SphereGeometry(100, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x87ceeb })
        );
        sky.material.side = THREE.BackSide; // Render the sky on the back side

        return sky;
    }

    createGoalArea() {
        const metaGeometry = new THREE.PlaneGeometry(5, 5);
        const metaMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
        this.areaMeta = new THREE.Mesh(metaGeometry, metaMaterial);
        this.areaMeta.rotation.x = Math.PI / 2;
        this.areaMeta.position.z = this.distanciaMeta;
        this.areaMeta.position.y = 0.01; // Slightly above the ground
        this.scene.add(this.areaMeta);
    }

    handleKeyDown(event) {
        if (event.key === "ArrowUp") {
            this.isAccelerating = true; // Start accelerating
        }
    }

    handleKeyUp(event) {
        if (event.key === "ArrowUp") {
            this.isAccelerating = false; // Stop accelerating
            this.accumulatedTime = 0; // Reset accumulated time
            this.auto.move(this.autoPosition.x, this.autoPosition.y, this.autoPosition.z);
        }
    }

    updateAcceleration(deltaTime) {
        if (this.isAccelerating) {
            // Aumenta la velocidad en función del tiempo presionado
            this.accumulatedTime += deltaTime;
            const currentAcceleration = this.acceleration * this.accumulatedTime;
            this.velocity.z = Math.min(currentAcceleration, this.maxVelocity); // Agrega la aceleración al movimiento
        } else {
            // Si no está acelerando, reduce gradualmente la velocidad (simulando inercia)
            this.velocity.z *= this.decelerationRate; // Factor de desaceleración
            if (Math.abs(this.velocity.z) < 0.001) this.velocity.z = 0; // Detener casi por completo si es muy lento
        }
    }

    checkGoal() {
        const distanceToTarget = this.distanciaMeta - this.autoPosition.z;
        const distaciaRecorrida = (this.velocity.z * this.accumulatedTime) + (0.50 * this.velocity.z * Math.pow(this.accumulatedTime, 2)) 

        const message = "Felicidades! has llegado a la meta \n" + "Velocidad: " + this.velocity.z + "\n" + "Tiempo: " + this.accumulatedTime + "\n" + "Distancia recorrida: " + distaciaRecorrida;
        // Check if in the goal area
        if (this.autoPosition.z >= this.zonaMeta) {
            Swal.fire({
                text: message
            })
          this.reset();
        }
    }

    reset() {
        // Reset car position and velocity
        this.autoPosition.set(0, 0.25, 5);
        this.velocity.set(0, 0, 0);
    }

    updateCamera() {
        this.camera.position.x = this.autoPosition.x;
        this.camera.position.z = this.autoPosition.z + 10; // Adjust the offset as needed
        this.camera.lookAt(this.autoPosition);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const deltaTime = 0.016; // Assume 60 FPS, so ~16ms per frame

        this.updateAcceleration(deltaTime);

        // Update car position based on velocity
        this.autoPosition.add(this.velocity);

        // Visually update the car
        this.auto.getAuto().position.copy(this.autoPosition);

        // Update the camera to follow the car
        this.updateCamera();

        // Check if goal is reached or passed
        this.checkGoal();

        this.renderer.render(this.scene, this.camera);
    }

    init() {
        this.create();
    }
}

export default LevelOneScene;