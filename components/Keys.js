export class Keys extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div>
    <div class="cyfry">
        <button-number- data-value="9"></button-number->
    </div>
    <div class="cyfry-ostatni-wiersz"></div>
</div>
<div class="operator"></div>
<style>
  :host{
    display: grid;
  }
  .cyfry-ostatni-wiersz{
    display: flex;
  }
  
</style>
        `
	
    }
}
