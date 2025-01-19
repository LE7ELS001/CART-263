"use strict";

//mouse click, position change

let rec1X = 50;
let rec1Y = 50;
let rec1Size = 50;
let rec1R = 255;
let rec1G = 0;
let rec1B = 0;



//space bar press, position change 

let rec2X = 600;
let rec2Y = 150;
let rec2Size = 50;
let rec2R = 0;
let rec2G = 255;
let rec2B = 0;



// color change with mouse move, every frame move on y, reach the bottom back to top

let rec3X = 400;
let rec3Y = 200;
let rec3Size = 50;
let rec3R = 0;
let rec3G = 0;
let rec3B = 255;




function setup() {
    createCanvas(800, 600);

}

function draw() {
    background(0);
    drawRect(rec1X, rec1Y, rec1Size, rec1R, rec1G, rec1B);
    drawRect(rec2X, rec2Y, rec2Size, rec2R, rec2G, rec2B);
    drawRect(rec3X, rec3Y, rec3Size, rec3R, rec3G, rec3B);

    rec3Movement();

}

function drawRect(x, y, size, R, G, B) {
    push();
    fill(R, G, B);
    rect(x, y, size);
    pop();
}

function mouseClicked() {
    if (rec1X >= 0 && rec1X <= 800 && rec1Y >= 0 && rec1Y <= 600) {
        rec1X += 3;
        rec1Y += 3;
    }
    else {
        rec1X = 50;
        rec1Y = 50;
    }

}

function keyPressed() {
    if (keyCode === 32) {
        if (rec2X >= 0 && rec2X <= 800 && rec2Y >= 0 && rec2Y <= 600) {
            rec2X -= 3;
            rec2Y += 5;
        }
        else {
            rec2X = 600;
            rec2Y = 150;
        }
    }

}

function rec3Movement() {
    if (rec3Y <= 600) {
        rec3Y += 6;
    }
    else {
        rec3Y = 0;
    }

}

function mouseMoved() {
    if (mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 600) {
        let tmpR = random(0, 255);
        let tmpG = random(0, 255);
        let tmpB = random(0, 255);
        rec3R = tmpR;
        rec3B = tmpG;
        rec3B = tmpG;
    }
}

