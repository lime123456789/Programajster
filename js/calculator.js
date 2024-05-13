document.addEventListener("DOMContentLoaded", () => {
    
    // Obaługa przycisków
    window.operators =  ["+", "-", "/",  "*"];
    window.equationRegex = /([*\/]|\b\s*-|\b\s*\+)/g;
    window.keyList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "+", "-", "/",  "*", "=", "DELETE"];

    var charBtns = document.querySelectorAll(".char");

    for (i = 0; i < charBtns.length; i++) {
        charBtns[i].onclick = charClick;
    }

    function charClick() {
        if(document.calc.type.value != "HEX") {
            return;
        }
        var value = this.id;
        document.calc.txt.value += value;
    }

    var numberBtns = document.querySelectorAll(".num");

    for (i = 0; i < numberBtns.length; i++) {
        numberBtns[i].onclick = numberClick;
    }

    function numberClick() {
        var value = this.id;
        if(document.calc.type.value == "OCT" && ["8", "9"].includes(value)) {
            return;
        }
        if(document.calc.type.value == "BIN" && ["2", "3", "4", "5", "6", "7", "8", "9"].includes(value)) {
            return;
        }
        document.calc.txt.value += value;
    }

    document.querySelector(".clear").onclick = function() {
        document.calc.txt.value = "";
    };

    document.querySelector(".division").onclick = function() {
        if(!lastCharIsOperator()) {
            document.calc.txt.value += "/";
        }
    };

    document.querySelector(".multiplication").onclick = function() { 
        if(!lastCharIsOperator()) {
            document.calc.txt.value += "*";
        }  
    };

    document.querySelector(".minus").onclick = function() {
        if(!lastCharIsOperator()) {
            document.calc.txt.value += "-";
        }
    };

    document.querySelector(".plus").onclick = function() {
        if(!lastCharIsOperator()) {
            document.calc.txt.value += "+";
        }
    };

    document.querySelector(".equal").onclick = function() {
        if(document.calc.txt.value.length == 0) {
            return;
        }
        if(!lastCharIsOperator()) {
            var type = document.calc.type.value,
                equation = calc.txt.value,
                result = 0;
            switch (type) {
                case "HEX":
                    result = hexResult();
                    break;
                case "DEC":
                    result = decResult();
                    break;
                case "OCT":
                    result = octResult();
                    break;
                case "BIN":
                    result = binResult();
                    break;
            }
            if(result == "NAN") {
                return;
            }
            document.calc.txt.value = result;
            saveEquation(type, equation, result);
        }
    };

    function lastCharIsOperator() {
        const lastChar = document.calc.txt.value.slice(-1);
        return operators.includes(lastChar);
    }

    function hexResult() {
        var result = 0,
            eqSplit = calc.txt.value.split(equationRegex);
        result = eval( Number("0x" + eqSplit[0]) + eqSplit[1] + Number("0x" + eqSplit[2]) );
        if(eqSplit.length > 0) {
            for (let i = 4; i < eqSplit.length; i += 2) {
                result = eval(result + eqSplit[i-1] + Number("0x" + eqSplit[i]));
            }
        }
        return result.toString(16).toUpperCase();
    }

    function decResult() {
        return eval(calc.txt.value);
    }

    function octResult() {
        var result = 0,
            eqSplit = calc.txt.value.split(equationRegex);
        result = eval( Number("0o" + eqSplit[0]) + eqSplit[1] + Number("0o" + eqSplit[2]) );
        if(eqSplit.length > 0) {
            for (let i = 4; i < eqSplit.length; i += 2) {
                result = eval(result + eqSplit[i-1] + Number("0o" + eqSplit[i]));
            }
        }
        return result.toString(8);
    }

    function binResult() {
        var result = 0,
            eqSplit = calc.txt.value.split(equationRegex);
        result = eval( Number("0b" + eqSplit[0]) + eqSplit[1] + Number("0b" + eqSplit[2]) );
        if(eqSplit.length > 0) {
            for (let i = 4; i < eqSplit.length; i += 2) {
                result = eval(result + eqSplit[i-1] + Number("0b" + eqSplit[i]));
            }
        }
        result = result.toString(2);
        if(result.length % 4 == 1) {
            result = "000" + result;
        } else if(result.length % 4 == 2) {
            result = "00" + result;
        } else if(result.length % 4 == 3) {
            result = "0" + result;
        }
        return result.match(/.{1,4}/g).join(" ");
    }

    // Obsługa wpisywania z klawiatury 
    document.addEventListener("keydown", (event) => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        } 
        const key = event.key.toUpperCase();
        if(keyList.includes(key)) {
            if(key.length == 1 && (!isNaN(key) || key.match(/[A-F]/))) {
                document.getElementById(key).click();
            } else if(key == "DELETE") {
                document.calc.txt.value = "";
            } else if(key == "=") {
                document.querySelector(".equal").click();
            } else if(key == "+") {
                document.querySelector(".plus").click();
            } else if(key == "-") {
                document.querySelector(".minus").click();
            } else if(key == "/") {
                document.querySelector(".division").click();
            } else if(key == "*") {
                document.querySelector(".multiplication").click();
            }
        }
    });

});