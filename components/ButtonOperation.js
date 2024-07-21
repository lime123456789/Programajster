export class ButtonOperation extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div id="button"></div>

<style>
  @import url("/shared/buttons.css") layer(generic)
</style>
        `
    }
    static observedAttributes = ["data-value"];
    attributeChangedCallback(name) {
	this.shadowRoot.querySelector("#button").textContent = this.dataset.value
    }
}
