import {router} from "../main.js";

document.getElementById("presentacion").innerHTML = `
  <div class="container presentacion">
    <h1>Movimiento Rectilineo Uniforme Acelerado</h1>
    <p>Ejemplo nasico sobre el Movimiento Rectilineo Uniforma Acelerado.</p>
    <div class="">
      <button id="navegar-menu" type="button">Comenzar</button>
    </div>
  </div>
`;

document.getElementById("navegar-menu").addEventListener("click", () => {
    router.loadRoute("menu");
});
