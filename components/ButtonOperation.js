export class ButtonOperation extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `

 <div style="border: solid pink 3px">cos </div>

<style>
  :host{
    display: grid;
  }
  
  
</style>
        `
	//data-representation - dla obrazka

    }
}
