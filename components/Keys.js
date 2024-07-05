export class Keys extends HTMLElement {
    #systemGlyphs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    #systemTypes = ["bin", "oct", "dec", "hex"]
    #typesToRanges = {bin: 2, oct: 8, dec: 10, hex: 16}

    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div id="number"></div>
<style>
  :host{
      display: grid;
      overflow: auto;
  }
</style>
        `
    }

    static observedAttributes = ["data-system"]
    attributeChangedCallback(name) {
	if (this.#systemTypes.includes(this.dataset.system)) {
	    const number = this.shadowRoot.querySelector("#number")
	    number.innerHTML = this.#systemGlyphs
		.toSpliced(this.#typesToRanges[this.dataset.system])
		.map(a => `<button-number- data-value="${a}"></button-number->`)
		.join('')
	} else {
	    throw "system not present"
	}
    }

    connectedCallback() {
	this.dataset.system !== undefined ?0: this.setAttribute("data-system", "dec")
    }
}
