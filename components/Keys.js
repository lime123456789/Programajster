export class Keys extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<button-number- data-value="0"></button-number->
<button-number- data-value="1"></button-number->
<button-number- data-value="2"></button-number->
<button-number- data-value="3"></button-number->
<button-number- data-value="4"></button-number->
<button-number- data-value="5"></button-number->
<button-number- data-value="6"></button-number->
<button-number- data-value="7"></button-number->
<button-number- data-value="8"></button-number->
<button-number- data-value="9"></button-number->
<style>
  :host{
      display: grid;
      overflow: auto;
  }
</style>
        `
    }
}
