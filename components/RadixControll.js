import { radixesAllowed } from "/shared/calcEngine.js"

export class RadixControll extends HTMLElement {
    #radixNames = {
	"2": { short: "bin", long: "binary" },
	"8": { short: "oct", long: "octal" },
	"10": { short: "dec", long: "decimal" },
	"16": { short: "hex", long: "hexadecimal" },
    }
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div id="radixes">${
  radixesAllowed
      .map(a => `
  <label>
    ${this.#radixNames[a].short}
    <input type="radio" name="radix" value="${a}">
  </label>
	    `)
.join('')

}</div>
<style>
  :host {
      --lable-padding-inline: 1ch;
      --lable-padding-block: 4px;
  }
  label {
      display: block;
      padding: var(--lable-padding-block) var(--lable-padding-inline);
  }
</style>
        `
    }
}
