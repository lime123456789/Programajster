export class App extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<p>Witaj Świecie</p>
<h1>Hello world</h1>
<h2>test</h2>
<div class="testowy">cos</div>
<style>
  :host {
      display: block;
      position: absolute;
      inset: 0 0;
  }
  .testowy{
      padding: auto;
      border: black solid 1px;
  }
</style>
        `
    }
}
