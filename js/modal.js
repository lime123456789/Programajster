
    // Obaługa okna modalnego i zmiany trybu kalkulatora
    document.querySelector(".type").onclick = function() {
        document.querySelector(".calculator-modal").style.display = "block";
    };

    document.querySelector(".close-modal").onclick = function() {
        document.querySelector(".calculator-modal").style.display = "none";
    };

    let typeBtns = document.querySelectorAll(".type-select");

    for (let i = 0; i < typeBtns.length; i++) {
        typeBtns[i].onclick = closeModal;
    }

    function closeModal() {
        switch (this.id) {
            case "HEX":
                enableCharBtns();
                enableNumerBtns();
                break;
            case "DEC":
                disableCharBtns();
                enableNumerBtns();
                break;
            case "OCT":
                disableCharBtns();
                enableOCTNumerBtns();
                break;
            case "BIN":
                disableCharBtns();
                enableBINNumerBtns();
                break;
        }
        document.querySelector("span.type i").textContent = this.id;
        document.calc.type.value = this.id;
        document.calc.txt.value = "";
        document.querySelector(".calculator-modal").style.display = "none";
    }

    function enableCharBtns() {
        let charBtns = document.getElementsByClassName("char");
        for (let i = 0; i < charBtns.length; i++) {
            charBtns[i].classList.remove("disable");
        }
    }

    function disableCharBtns() {
        let charBtns = document.getElementsByClassName("char");
        for (let i = 0; i < charBtns.length; i++) {
            charBtns[i].classList.add("disable");
        }
    }

    function enableNumerBtns() {
        let numBtns = document.getElementsByClassName("num");
        for (let i = 0; i < numBtns.length; i++) {
            numBtns[i].classList.remove("disable");
        }
    }

    function enableOCTNumerBtns() {
        enableNumerBtns();
        document.getElementById("9").classList.add("disable");
        document.getElementById("8").classList.add("disable");
    }

    function enableBINNumerBtns() {
        enableNumerBtns();
        document.getElementById("9").classList.add("disable");
        document.getElementById("8").classList.add("disable");
        document.getElementById("7").classList.add("disable");
        document.getElementById("6").classList.add("disable");
        document.getElementById("5").classList.add("disable");
        document.getElementById("4").classList.add("disable");
        document.getElementById("3").classList.add("disable");
        document.getElementById("2").classList.add("disable");
    }
    
