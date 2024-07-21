export class ButtonClear extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div id="button">C</div>

<style>
  @import url("/shared/buttons.css") layer(generic)
</style>
        `
    }
}
