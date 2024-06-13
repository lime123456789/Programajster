import { run } from "/shared/calcEngine.js"

export class Screen extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<burgir-></burgir->
<input>

<style>
  :host {
      display: block;
      background: #0f0;
  }
  input {
      --padding: .5em;
      all: unset;
      display: flex;
      padding: var(--padding);
      text-align: right;
      width: calc(100% - var(--padding) * 2);
  }
</style>
        `
	this.shadowRoot.querySelector("input").addEventListener("change", async _ => {
	    const input = this.shadowRoot.querySelector("input")
	    input.value = await run(input.value)
	})
    }
}
