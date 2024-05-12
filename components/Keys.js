export class Keys extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `

  
    

<button-number-></button-number->
<div class="cyfry-ostatni-wiersz">

</div>

<style>

  :host{
    display: grid;
  }
  .cyfry-ostatni-wiersz{
    display: flex;
    border: solid 3px cyan;
  }
  
  


</style>
        `
	
    }
}
