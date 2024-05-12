export class ButtonNumber extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
  
      <div >
        <div class="basic-grid">
          <button class="b">1</button>
          <div class="cyfry">2</div>
          <div class="cyfry">3</div>
          <div class="cyfry">4</div>
          <div class="cyfry">5</div>
          <div class="cyfry">6</div>
          <div class="cyfry">7</div>
          <div class="cyfry">8</div>
          <div class="cyfry">9</div>
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
