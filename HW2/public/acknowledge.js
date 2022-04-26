"use strict";

let continueButton = document.getElementById("contButton");
continueButton.addEventListener("click",clicked);

function clicked(){
    location.href = "/tiktokpets.html";
}

let data = sessionStorage.getItem("content");

console.log("Sohan",data);

const myArray = data.split("-[");
let word = myArray[2];
let pos = document.getElementById("dynamicContent")
pos.innerHTML = word