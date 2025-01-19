"use strict";

function setup() {
    console.log("go")

    createCanvas(500, 500);
    background(0);

    drawEllipse(50, 50, 50, 50, 250, 150, 255);
    drawEllipse(150, 150, 100, 100, 172, 255, 150);
    drawEllipse(300, 300, 150, 150, 253, 188, 136);

}

function drawEllipse(x, y, w, h, r, g, b) {
    fill(r, g, b);
    ellipse(x, y, w, h);
}