class GameStateManager {
  constructor() {
    this.state = "presentation"; // Estado inicial
    this.score = 0;
    this.level = 1;
  }

  // Método para cambiar el estado
  changeState(newState) {
    this.state = newState;
    console.log(`El estado del juego cambió a: ${this.state}`);
  }

  // Método para iniciar el juego
  startGame() {
    this.changeState("playing");
    this.score = 0;
    this.level = 1;
  }

  // Método para pausar el juego
  pauseGame() {
    this.changeState("paused");
  }

  // Método para finalizar el juego
  endGame() {
    this.changeState("GameOver");
  }

  // Método para avanzar al siguiente nivel
  nextLevel() {
    this.level++;
    console.log(`Avanzando al nivel: ${this.level}`);
  }

  // Método para actualizar el estado durante la animación
  update() {
    if (this.state === "playing") {
      // Aquí puedes actualizar los objetos del juego si está en modo 'playing'
      playScene.update();
    } else if (this.state === "paused") {
      // Lógica para el estado de pausa (si se necesita)
    }
  }
}

export default GameStateManager;
