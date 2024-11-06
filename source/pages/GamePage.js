import LevelOneScene from "../scenes/LevelOneScene";

document.getElementById("game-container").innerHTML = `
    <canvas id="game-canvas"></canvas>
`;

const canvas = document.getElementById("game-canvas");
const levelOneScene = new LevelOneScene(canvas);

levelOneScene.init();