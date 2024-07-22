export class Burgir extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div id="button"></div>
<div id="sidebar"></div>
<style>
  :host {
      position: absolute;
      --button-size: 2em;
      --button-margin: 4px;
      --button-hitbox: calc(var(--button-size) + var(--button-margin) * 2);
  }
  #button {
      position: relative;
      background: #f00;
      inset: var(--button-margin);
      width: var(--button-size);
      height: var(--button-size);
      border-radius: 0.3em;
      z-index: 1;
  }
  #sidebar {
      z-index: 0;
      position: fixed;
      inset: 0 0;
      background: #b00;
      height: calc(100% - var(--button-hitbox));
      width: 25%;
      padding: var(--button-hitbox) 0 0 0;
  }
</style>
        `
	this.shadowRoot.querySelector("#button").addEventListener("click", () => {
	    const sidebar = this.shadowRoot.querySelector("#sidebar")
	    sidebar.style.display = sidebar.style.display ? "" : "none"
	})
    }
}
