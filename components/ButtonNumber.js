export class ButtonNumber extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div id="button"></div>

<style>
  :host{
      display: block;
      width: min-content;
      height: min-content;
  }
  #button {
      --padding: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #00f;
      padding: var(--padding);
      height: calc(100% - var(--padding) * 2);
      width: calc(100% - var(--padding) * 2);
  }
</style>
        `
    }
    static observedAttributes = ["data-value"];
    attributeChangedCallback(name) {
	this.shadowRoot.querySelector("#button").textContent = this.dataset.value
    }
}

