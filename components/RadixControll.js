import { radixesAllowed, DEFAULT_RADIX } from "/shared/calcEngine.js"
import { keysReceiver } from "/components/Keys.js"
import { screenReceiver } from "/components/Screen.js"

const subjects = []
export const radixControllReceiver = {
    hook(idName, fn) {
	subjects
	    .filter(a => a.id == idName)
	    .map(fn)
    }
}

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
	;[...this.shadowRoot.querySelectorAll("#radixes input")]
	    .map(a => a.addEventListener("change", event => {
		keysReceiver.hook("keys-main", subject => {
		    subject.dispatchEvent(new CustomEvent("systemChange", {
			detail: event.target.value,
			bubbles: false,
		    }))
		})
		screenReceiver.hook("screen-main", subject => {
		    subject.dispatchEvent(new CustomEvent("systemChange", {
			detail: event.target.value,
			bubbles: false,
		    }))
		})
	    }))
	this.addEventListener("getRadixResponse", event => {
	    const input = this.shadowRoot.querySelector(`#radixes input[value="${event.detail}"]`)
	    input.checked = true
	})
    }
    connectedCallback() {
    	subjects.push(this)
	keysReceiver.hook(`keys-${this.id.match(/^radix-controll-(.*)/)[1]}`, subject => {
	    subject.dispatchEvent(new CustomEvent("getRadix", {
		bubbles: false,
	    }))
	})
    }
    disconnectedCallback() {
	subjects.splice(subjects.indexOf(this), 1)
    }
}
