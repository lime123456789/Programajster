export class ButtonNumber extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<input type="button">

<style>
  :host{
      display: block;
  }
  input {
      all: unset;
      display: block;
      background: #00f;
      padding: 1em;
  }
</style>
        `
    }
    static observedAttributes = ["data-value"];
    attributeChangedCallback(name) {
      this.shadowRoot.querySelector("input").value = this.dataset.value
    }
}
