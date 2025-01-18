"use strict";

let rect1 = {
    x: 0,
    y: 0,
    size: 400,
    height: 400,
}

let rect2 = {
    x: 200,
    y: 0,
    size: 400,
    height: 400,
}

let rect3 = {
    x: 400,
    y: 0,
    size: 400,
    height: 400,
}

let rect1Colour = {
    r: 0,
    g: 0,
    b: 255
}

let rect2Colour = {
    r: 0,
    g: 0,
    b: 200
}

let rect3Colour = {
    r: 0,
    g: 0,
    b: 100
}

function setup() {
    createCanvas(600, 400);
    console.log("go")
}

function draw() {
    background(220);
    drawRect1();
    drawRect2();
    drawRect3();
}

function mouseMoved() {
    if (dist (rect1.x, rect1.y, mouseX, mouseY) < rect1.size) {
        rect1Colour.r = 255;
        rect1Colour.g = 255;
        rect1Colour.b = 255;
    }
    else if (dist (rect2.x, rect2.y, mouseX, mouseY) < rect2.size) {
        rect2Colour.r = 255;
        rect2Colour.g = 255;
        rect2Colour.b = 255;
    }
    else if (dist (rect3.x, rect3.y, mouseX, mouseY) < rect3.size) {
        rect3Colour.r = 255;
        rect3Colour.g = 255;
        rect3Colour.b = 255;
    }
    else {
        rect1Colour.r = 0;
        rect1Colour.g = 0;
        rect1Colour.b = 255;
        rect2Colour.r = 0;
        rect2Colour.g = 0;
        rect2Colour.b = 200;
        rect3Colour.r = 0;
        rect3Colour.g = 0;
        rect3Colour.b = 100;
    }
}

function drawRect1() {
    push();
    noStroke();
    fill(rect1Colour.r, rect1Colour.g, rect1Colour.b);
    rect(rect1.x, rect1.y, rect1.size, rect1.height);
    pop();
}

function drawRect2() {
    push();
    noStroke();
    fill(rect2Colour.r, rect2Colour.g, rect2Colour.b);
    rect(rect2.x, rect2.y, rect2.size, rect2.height);
    pop();
}

function drawRect3() {
    push();
    noStroke();
    fill(rect3Colour.r, rect3Colour.g, rect3Colour.b);
    rect(rect3.x, rect3.y, rect3.size, rect3.height);
    pop();
}