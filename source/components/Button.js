// components/Button.js
class CButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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
      <button>Iniciar</button>
    `;

    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      window.location.href = '/simulation.html';
    });
  }
}

customElements.define('custom-button', CButton);

export default CButton;