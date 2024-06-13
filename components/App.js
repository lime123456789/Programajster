export class App extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<screen-></screen->
<keys-></keys->

<style>
  :host {
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: absolute;
      width: 100%;
      inset: 0 0;
  }
</style>
        `
    }
}
