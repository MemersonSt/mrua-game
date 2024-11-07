import Routes from "./routes";
import "./index.css";
import GameStateManager from "./state/gameStateManager.js";

const routes = [
  {
    path: "/",
    template: '<div id="presentacion"></div>',
    load: () => import("./pages/PresentacioPage"),
  },
  {
    path: "/menu",
    template: '<div id="menu"></div>',
    load: () => import("./pages/MenuPage"),
  },
  {
    path: "/game",
    template: '<div id="game-container"></div>',
    load: () => import("./pages/GamePage"),
  },
];

const router = new Routes(routes);
const stateUser = new GameStateManager();

document.querySelectorAll("a").forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const path = e.target.getAttribute("href").substring(1);
    router.loadRoute(path);
  });
});

export { router, stateUser };
// export default router;
