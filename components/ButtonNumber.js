export class ButtonNumber extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
  
      <div class="znaki">
        <div class="basic-grid">
          <button class="cyfry">1</button>
          <button class="cyfry">2</button>
          <button class="cyfry">3</button>
          <button class="cyfry">4</button>
          <button class="cyfry">5</button>
          <button class="cyfry">6</button>
          <button class="cyfry">7</button>
          <button class="cyfry">8</button>
          <button class="cyfry">9</button>
        </div>

      </div>
  

<span id="value"></span>
<style>
  :host{
    display: flex;
    flex-grow: 1;
  }
  .basic-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(240px, 1fr));
  }

  .znaki{
    //display: block;
    width: 100%;
    height: 100%;
    border: solid 3px lime;
    //overflow: scroll;
  }

  .cyfry{
    color: green;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #353535;
    font-size: 3rem;
    color: #fff;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    transition: all 500ms;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5;
  }

  .cyfry:hover {
    box-shadow: red 0px 0.35em 1.175em, red 0px 0.175em 0.5em;
    opacity: 1;
  }

</style>
        `
    }
    static observedAttributes = ["data-value"];
    // connectedCallback(name) {
    //   this.shadowRoot.querySelector("#value").textContent=this.dataset.value
    // }
    attributeChangedCallback(name) {
      this.shadowRoot.querySelector("#value").textContent = this.dataset.value
    }
}

//fdjhgfsdjkhgfsdjkgfsdkjh
