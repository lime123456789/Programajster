export class Burgir extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `

    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="link-text">Cats</span>
          </a>
        </li>
      </ul>
    </nav>


<style>
  :host{
    display: grid;
  }
  :root {
    font-size: 16px;
    font-family: 'Open Sans';
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
    --bg-primary: #23232e;
    --bg-secondary: #141418;
    --transition-speed: 600ms;
  }
  
  body {
    color: green;
    background-color: white;
    margin: 0;
    padding: 0;
  }

  main {
    margin-left: 5rem;
    padding: 1rem;
  }

 .navbar {
    position: fixed;
    width: 5rem;
    height: 100vh;
    background-color: gray;
    //transition: width 600ms ease;
    //overflow: scroll;
  }

</style>
        `
	
    }
}
