import { screenReceiver } from "/components/Screen.js"

export class ButtonNumber extends HTMLElement {
    constructor() {
	super()
	if (this.dataset.value === undefined) {
	    throw "value required"
	}
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div id="button"></div>

<style>
  @import url("/shared/buttons.css") layer(generic)
</style>
        `
	this.shadowRoot.querySelector("#button").addEventListener("click", () => {
	    screenReceiver.hook("screen-main", subject => {
		subject.dispatchEvent(new CustomEvent("insertNumber", {
		    detail: this.dataset.value,
		    bubbles: false,
		}))
	    })
	})
    }
    static observedAttributes = ["data-value"];
    attributeChangedCallback(name) {
	this.shadowRoot.querySelector("#button").textContent = this.dataset.value
    }
}

