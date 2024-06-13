export class Burgir extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div class="button"></div>
<style>
  :host {
      position: absolute;
  }
  .button {
      background: #f00;
      width: 2em;
      height: 2em;
      border-radius: 0.3em;
  }
</style>
        `
    }
}
