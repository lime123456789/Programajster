export class App extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<screen-></screen->
<keys-></keys->
<buttonoperation></buttonoperation->


<style>
  :host {
      display: flex;
      position: absolute;
      inset: 0 0;
      //border: solid #f72929 1px;
  }
  :host > *{
    flex-grow: 1;
  }
  
  
  
</style>
        `
    }
}
