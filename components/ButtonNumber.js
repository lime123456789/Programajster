export class ButtonNumber extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
  
<span id="value"></span>
<style>
  :host{
    display: flex;
    flex-grow: 1;
  }
  
  
</style>
        `
    }
    static observedAttributes = ["data-value"];
    // connectedCallback(name) {
    //   this.shadowRoot.querySelector("#value").textContent=this.dataset.value
    // }
    attributeChangedCallback(name) {
      this.shadowRoot.querySelector("#value").textContent = this.dataset.value
    }
}
