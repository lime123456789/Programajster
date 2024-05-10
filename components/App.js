export class App extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<screen-></screen->
<keys-></keys->
<style>
  :host {
      display: flex;
      position: absolute;
      inset: 0 0;
      border: solid black 3px;
  }
  :host > *{
    flex-grow: 1;
  }
  .testowy{
      padding: auto;
      border: black solid 1px;
  }
</style>
        `
    }
}
