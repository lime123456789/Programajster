export class ButtonOperation extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `

 <div class="scrollmenu">
      
</div>



<style>
  :host{
    display: grid;
  }
  
  .scrollmenu{
    border: solid red 3px;
    displa
  }
  
</style>
        `
	//data-representation - dla obrazka

    }
}
