import {router} from "../main.js";

document.getElementById("menu").innerHTML = `
    <div class="">
        <header class="header-menu">
            <div></div>
            <h2 class="header-title">Menu</h2>
            <nav class="header-nav">
                <a id="regresar">Regresar</a>
            </nav>
        </header>
        <div class="container-menu">
        <div class="container-menu-text">
            <p class="menu-indicaciones">Bienvenido a este mini juego sobre física.</p>
            <p class="menu-indicaciones">En este juego podras ver de manera grafica el movimiento rectilineo uniforme acelerado.</p>
            <p class="menu-indicaciones">Que constara de dos niveles</p>
        </div>
        <div class="card">
            <div class="card-nivel">
                <p>Nivel 1</p>
                <button class="navegar-nivel" id="navegar-nivel-1" type="button">Comenzar</button>
            </div>
<!--            <div class="card-nivel">-->
<!--                <p>Nivel 2</p>-->
<!--                <button id="navegar-nivel-2" type="button">Comenzar</button>-->
<!--            </div>-->
        </div>
        </div>
    </div>
`;

document.getElementById("regresar").addEventListener("click", () => {
    router.loadRoute(""); // Regresar a la presentación
});

document.getElementById("navegar-nivel-1").addEventListener("click", () => {
    router.loadRoute("game"); // Navegar a nivel 1
});

// Agregar evento al botón de Nivel 2
document.getElementById("navegar-nivel-2").addEventListener("click", () => {
    router.loadRoute("game?nivel=2"); // Navegar a nivel 2
});
