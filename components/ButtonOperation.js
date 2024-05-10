export class ButtonOperation extends HTMLElement {
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
	//data-representation - dla obrazka

    }
}
