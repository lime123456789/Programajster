export class Screen extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `

    <burgir-></burgir->


<style>
  :host {
      display: block;
      border: red solid 1px;
  }
  input {
      all: unset;
      display: block;
      width: 100%;
      padding: .5em;
  }
  body {
    background: rgb(19, 19, 19);
    color: #fff;
    font-family: 'Noto Sans', sans-serif;
  }
  
</style>
        `
	this.shadowRoot.querySelector("input").addEventListener("change", _ => console.log(this.shadowRoot.querySelector("input").value))
    }
}
