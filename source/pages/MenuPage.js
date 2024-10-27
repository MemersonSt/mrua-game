import router from "../main";

document.getElementById("menu").innerHTML = `
    <div class="">
        <header class="header-menu">
            <h2>Menu</h2>
        </header>
        <div class="container-menu-text">
            <p>Bienvenido a este mini juego sobre física.</p>
            <p>En este juego podras ver de manera grafica el movimiento rectilineo uniforme acelerado.</p>
            <p>Que constara de dos niveles</p>
        </div>
        <div class="card">
            <div class="card-nivel">
                <p>Nivel 1</p>
                <button id="navegar-nivel-1" type="button">Comenzar</button>
            </div>
            <div class="card-nivel">
                <p>Nivel 2</p>
                <button id="navegar-nivel-2" type="button">Comenzar</button>
            </div>
        </div>
    </div>
`;

document.getElementById("navegar-nivel-1").addEventListener("click", () => {
  router.loadRoute("game"); // Navegar a nivel 1
});

// Agregar evento al botón de Nivel 2
document.getElementById("navegar-nivel-2").addEventListener("click", () => {
  router.loadRoute("game?nivel=2"); // Navegar a nivel 2
});
