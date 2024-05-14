import { saveEquation } from "/js/paper.js"
import { listOperations, run } from "/shared/calcEngine.js"
    // Obaługa przycisków
    export let operators =  ["+", "-", "/",  "*"];
    export let equationRegex = /([*\/]|\b\s*-|\b\s*\+)/g;
    export let keyList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "+", "-", "/",  "*", "=", "DELETE"];

    let charBtns = document.querySelectorAll(".char");

    for (let i = 0; i < charBtns.length; i++) {
        charBtns[i].onclick = charClick;
    }

    function charClick() {
        if(document.calc.type.value != "HEX") {
            return;
        }
        let value = this.id;
        document.calc.txt.value += value;
    }

    let numberBtns = document.querySelectorAll(".num");

    for (let i = 0; i < numberBtns.length; i++) {
        numberBtns[i].onclick = numberClick;
    }

    function numberClick() {
        let value = this.id;
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
            document.calc.txt.value += " / ";
        }
    };

    document.querySelector(".multiplication").onclick = function() { 
        if(!lastCharIsOperator()) {
            document.calc.txt.value += " * ";
        }  
    };

    document.querySelector(".minus").onclick = function() {
        if(!lastCharIsOperator()) {
            document.calc.txt.value += " - ";
        }
    };

    document.querySelector(".plus").onclick = function() {
        if(!lastCharIsOperator()) {
            document.calc.txt.value += " + ";
        }
    };

    document.querySelector(".equal").onclick = async function() {
        if(document.calc.txt.value.length == 0) {
            return;
        }
        if(!lastCharIsOperator()) {
            let type = document.calc.type.value
            let equation = calc.txt.value
            let result = 0;
            switch (type) {
                case "HEX":
                    result = await hexResult();
                    break;
                case "DEC":
                    result = await decResult();
                    break;
                case "OCT":
                    result = await octResult();
                    break;
                case "BIN":
                    result = await binResult();
                    break;
            }
            if(result == "NAN" || result == "INFINITY") {
		document.calc.txt.value = "NIE MOŻNA DZIELIĆ PRZEZ ZERO"
                return;
            }
	    if(result.match(/[^ABCDEFGabcdefg123457890]+/)) {
		document.calc.txt.value = result
                return;		
	    }
            document.calc.txt.value = result;
            saveEquation(type, equation, result);
        }
    };

    function lastCharIsOperator() {
        const lastChar = document.calc.txt.value.trim().slice(-1);
        return listOperations("*").includes(lastChar);
    }

    async function hexResult() {
        let result = 0
        // let eqSplit = calc.txt.value.split(equationRegex);
        // result = eval( Number(`0x${eqSplit[0]}`) + eqSplit[1] + Number("0x" + eqSplit[2]) );
	result = await run(calc.txt.value, 16)
        // if(eqSplit.length > 0) {
        //     for (let i = 4; i < eqSplit.length; i += 2) {
        //         result = eval(result + eqSplit[i-1] + Number("0x" + eqSplit[i]));
        //     }
        // }
        return result?.toString(16)?.toUpperCase();
    }

async function decResult() {
        return (await run(calc.txt.value)).toString()?.toUpperCase();
    }

    async function octResult() {
        // let result = 0,
        //     eqSplit = calc.txt.value.split(equationRegex);
        // result = eval( Number("0o" + eqSplit[0]) + eqSplit[1] + Number("0o" + eqSplit[2]) );
        // if(eqSplit.length > 0) {
        //     for (let i = 4; i < eqSplit.length; i += 2) {
        //         result = eval(result + eqSplit[i-1] + Number("0o" + eqSplit[i]));
        //     }
        // }
        return (await run(calc.txt.value, 8))?.toString(8)?.toUpperCase();
    }

    async function binResult() {
        // let result = 0,
        //     eqSplit = calc.txt.value.split(equationRegex);
        // result = eval( Number("0b" + eqSplit[0]) + eqSplit[1] + Number("0b" + eqSplit[2]) );
        // if(eqSplit.length > 0) {
        //     for (let i = 4; i < eqSplit.length; i += 2) {
        //         result = eval(result + eqSplit[i-1] + Number("0b" + eqSplit[i]));
        //     }
        // }
        // result = result.toString(2);
        // if(result.length % 4 == 1) {
        //     result = "000" + result;
        // } else if(result.length % 4 == 2) {
        //     result = "00" + result;
        // } else if(result.length % 4 == 3) {
        //     result = "0" + result;
        // }
        // return result.match(/.{1,4}/g).join(" ");
	return (await run(calc.txt.value, 2))?.toString(2)?.toUpperCase()
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

