"use strict";

let word = "test";
const white = 255;

function setup() {
    console.log("go")
    createCanvas(600, 550);
}

function draw() {
    background("black");
    textSize(28);
    textAlign(CENTER, CENTER);
    fill(white);
    text(word, width/2, height/2);
    forLoop();
}

function forLoop() {
    for (let i = 0; i < 10; i++) {
        let x = 20 * (i + 1);
        text(i, x + 30, 50);
    }
    for (let i = 1; i < 16; i++) {
        let y = 30 * (i + 1);
        text(i, 50, y + 20);
    }
}