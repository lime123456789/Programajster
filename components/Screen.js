import { DEFAULT_RADIX } from "/shared/calcEngine.js"
import { run } from "/shared/calcEngine.js"

const subjects = []
export const screenReceiver = {
    hook(idName, fn) {
	subjects
	    .filter(a => a.id == idName)
	    .map(fn)
    }
}

export class Screen extends HTMLElement {
    #radix = DEFAULT_RADIX
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<burgir-></burgir->
<div contenteditable id="input"></div>

<style>
  :host {
      display: block;
      background: #0f0;
  }
  #input {
      --padding: .5em;
      all: unset;
      display: flex;
      padding: var(--padding);
      text-align: right;
      justify-content: right;
      width: calc(100% - var(--padding) * 2);
      height: calc(100% - var(--padding) * 2);
  }
</style>
        `
	this.shadowRoot.querySelector("#input").addEventListener("keydown", event => {
	    const input = this.shadowRoot.querySelector("#input")
	    if (event.key == "Enter") {
		event.preventDefault()
		input.dispatchEvent(new Event("change"))
	    }
	})
	this.shadowRoot.querySelector("#input").addEventListener("change", _ => {
	    this.dispatchEvent(new CustomEvent("eval", {
		bubbles: false,
	    }))
	})
	this.addEventListener("clear", event => {
	    this.shadowRoot.querySelector("#input").textContent = ""
	})
	this.addEventListener("eval", async event => {
	    const input = this.shadowRoot.querySelector("#input")
	    input.textContent = await run(input.textContent, this.#radix)
	})
	this.addEventListener("insertNumber", event => {
	    const input = this.shadowRoot.querySelector("#input")
	    input.textContent += String(event.detail)
	})
	this.addEventListener("insertOperation", event => {
	    const input = this.shadowRoot.querySelector("#input")
	    input.textContent += ` ${event.detail} `
	})
	this.addEventListener("systemChange", event => {
	    this.#radix = event.detail
	})
    }
    connectedCallback() {
	subjects.push(this)
    }
    disconnectedCallback() {
	subjects.splice(subjects.indexOf(this), 1)
    }
}
