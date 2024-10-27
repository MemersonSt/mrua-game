import router from "../main";

document.getElementById("presentacion").innerHTML = `
  <div class="container presentacion">
    <h1>Bienevenido a un Mini Simulador de Fisica</h1>
    <p>Veremos de manera Grafica sobre el Movimiento Rectilineo Uniforma Acelerado.</p>
    <div class="card">
      <button id="navegar-menu" type="button">Comenzar</button>
    </div>
  </div>
`;

document.getElementById("navegar-menu").addEventListener("click", () => {
    router.loadRoute("menu");
});
