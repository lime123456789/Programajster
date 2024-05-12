export class Burgir extends HTMLElement {
    constructor() {
	super()
	this.attachShadow({ mode: "open" })
	this.shadowRoot.innerHTML = `

    <nav class="navbar">
      <ul class="navbar-nav">

        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="link-text">Hex</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="link-text">Dec</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="link-text">Oct</span>
          </a>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="link-text">Bin</span>
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
    background-color: #4E575A;
    //transition: width 600ms ease;
    //overflow: scroll;
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .nav-item{
    width: 100%;
  }

  .nav-item:last-child{
    margin-top: auto;
  }
</style>
        `
	
    }
}
