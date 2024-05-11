export class Keys extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `
<div style="width: 80%; border: blue solid 3px">
    <div class="basic-grid">
      <div class="cyfry">1</div>
      <div class="cyfry">2</div>
      <div class="cyfry">3</div>
      <div class="cyfry">4</div>
      <div class="cyfry">5</div>
      <div class="cyfry">6</div>
      <div class="cyfry">7</div>
      <div class="cyfry">8</div>
      <div class="cyfry">9</div>
    </div>
    <div class="cyfry-ostatni-wiersz"></div>
</div>
<div class="operator"></div>

<style>

  :host{
    display: grid;
  }
  .cyfry-ostatni-wiersz{
    display: flex;
    color: green;
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

  .cyfry:hover {
    box-shadow: red 0px 0.35em 1.175em, red 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.1);
  }

  .basic-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(240px, 1fr));
  }

</style>
        `
	
    }
}
