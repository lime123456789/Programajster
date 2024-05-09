export class App extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div>
  <p>Witaj Świecie</p>
  <h1>Hello world</h1>
  <h2>test</h2>
  <div class="testowy">cos</div>
  <style>
    p {
	background: red;
    }
    .testowy{
	padding: auto;
	border: black solid 1px;
    }
  </style>
</div>
        `
    }
}
