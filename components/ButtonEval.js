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
    }
}
