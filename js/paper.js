import { equationRegex } from "/js/calculator.js"

    // Obaługa notesu
    document.querySelector(".eraser").onclick = function() {
        document.querySelector(".paper .text").textContent = "";
    };

export function saveEquation(type, equation, relult) {
        const newDiv = document.createElement("div");
        newDiv.append(`${type} | ${equation.split(equationRegex).join(" ")} = ${relult}`);
        document.querySelector(".paper .text").appendChild(newDiv);
    }
    
