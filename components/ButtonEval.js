import { screenReceiver } from "/components/Screen.js"

export class ButtonEval extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div id="button">=</div>

<style>
  @import url("/shared/buttons.css") layer(generic)
</style>
        `
	this.shadowRoot.querySelector("#button").addEventListener("click", () => {
	    screenReceiver.hook("screen-main", subject => {
		subject.dispatchEvent(new CustomEvent("eval", {
		    bubbles: false,
		}))
	    })
	})
    }
}
