export class Screen extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<input>
<style>
  :host {
      display: block;
      border: #000 solid 1px;
  }
  input {
      all: unset;
      display: block;
      width: 100%;
      padding: .5em;
  }
</style>
        `
	this.shadowRoot.querySelector("input").addEventListener("change", _ => console.log(this.shadowRoot.querySelector("input").value))
    }
}
