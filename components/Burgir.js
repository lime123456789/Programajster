export class Burgir extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `


<style>
  :host{
    display: grid;
  }
  
</style>
        `
	
    }
}
