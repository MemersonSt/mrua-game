// components/Button.js
class CButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["nombre", "operacion"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "nombre") {
      this.nombre = newValue;
      this.updateButton();
    } else if (name === "operacion") {
      this.operacion = new Function("return " + newValue)();
      this.updateButton();
    }
  }

  connectedCallback() {
    this.nombre = this.getAttribute("nombre") || "Botón";
    this.operacion =
      new Function("return " + this.getAttribute("operacion"))() || (() => {});

    this.shadowRoot.innerHTML = `
      <style>
        button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 10px;
          border: none;
          background-color: #87ceeb;
          color: white;
          font-family: Arial;
          font-size: 20px;
          cursor: pointer;
        }
      </style>
      <button>${this.nombre}</button>
    `;

    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", this.operacion);
  }

  updateButton() {
    if (this.shadowRoot) {
      const button = this.shadowRoot.querySelector("button");
      if (button) {
        button.textContent = this.nombre;
        button.removeEventListener("click", this.operacion);
        button.addEventListener("click", this.operacion);
      }
    }
  }
}

customElements.define("custom-button", CButton);

export default CButton;
