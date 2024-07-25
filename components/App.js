export class App extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<screen- id="screen-main"></screen->
<keys- id="keys-main"></keys->

<style>
  :host {
      display: grid;
      grid-template: 1fr / 1fr 1fr;
      position: absolute;
      width: 100%;
      inset: 0 0;
  }
</style>
        `
    }
}
