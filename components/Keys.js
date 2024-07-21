import { listOperations } from "/shared/calcEngine.js"

export class Keys extends HTMLElement {
    #systemGlyphs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    #systemTypes = ["bin", "oct", "dec", "hex"]
    #typesToRanges = {bin: 2, oct: 8, dec: 10, hex: 16}
    #numberLayoutWidthButtonWise = 3

    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div class="numbers">
  <div id="number"></div>
  <div id="overflow"></div>
</div>
<div class="operators">
  <button-clear-></button-clear->
  <div id="operator">${
listOperations("*")
    .map(a => `<button-operation- data-value="${a}"></button-operation->`)
    .join('')
  }</div>
  <button-eval-></button-eval->
</div>
<style>
  :host {
      display: grid;
      overflow: auto;
      grid-template-columns: 3fr 1fr;
  }
  .numbers {
      display: flex;
      flex-direction: column;
  }
  #number {
      display: grid;
      grid-template-columns: repeat(${this.#numberLayoutWidthButtonWise}, 1fr);
  }
  #number > * {
      width: 100%;
      height: 100%;
  }
  #overflow {
      display: flex;
      flex-grow: 1;
  }
  #overflow > * {
      flex-grow: 1;
      height: 100%;
  }
  .operators {
      height: 100%;
      display: grid;
      grid-template: min-content 1fr min-content / 1fr;
  }
  .operators > :not(#operator) {
      width: 100%;
  }
  #operator {
      display: flex;
      flex-direction: column;
      height: 100%;
  }
  #operator > * {
      width: 100%;
      height: 100%;
  }
</style>
        `
    }

    static observedAttributes = ["data-system"]
    attributeChangedCallback(name) {
	if (this.#systemTypes.includes(this.dataset.system)) {
	    const number = this.shadowRoot.querySelector("#number")
	    const overflow = this.shadowRoot.querySelector("#overflow")
	    const numberSet = this.#systemGlyphs
		  .toSpliced(this.#typesToRanges[this.dataset.system])
		  .toReversed()
	    , overflowSet = numberSet.splice(-(numberSet.length % this.#numberLayoutWidthButtonWise))
	    
	    number.style.flexGrow = Math.floor(numberSet.length / this.#numberLayoutWidthButtonWise)
	    number.innerHTML = numberSet
		.map(a => `<button-number- data-value="${a}"></button-number->`)
		.join('')
	    overflow.innerHTML = overflowSet
		.map(a => `<button-operation- data-value="${a}"></button-operation->`)
		.join('')
	} else {
	    throw "system not present"
	}
    }

    connectedCallback() {
	if (this.dataset.system === undefined) {
	    this.setAttribute("data-system", "dec")
	}
    }
}
