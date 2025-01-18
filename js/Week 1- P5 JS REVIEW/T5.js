"use strict";
/**
 this is task 5  
 */


//counter 
let counter = 0;

//square left 
const squareLeft = {
    x: 50,
    y: 50,
    size: 50,
    color: {
        R: 235,
        G: 168,
        B: 101
    },
    colorHover: {
        R: 235,
        G: 101,
        B: 28
    },


}

//square right 
const squareRight = {
    x: 120,
    y: 50,
    size: 50,
    color: {
        R: 235,
        G: 78,
        B: 73,
    },
    colorHover: {
        R: 234,
        G: 21,
        B: 14,
    },
}

//ellipse 
const ellipse = {
    x: undefined,
    y: undefined,
    radius: 30,
    color: 255,
    alpha: 20,
    alphaSpeed: 10,
    radiusAddingSpeed: 55
}



function setup() {
    createCanvas(800, 600);
    ellipse.x = width / 2;
    ellipse.y = height / 2;
}

function draw() {
    background(0);
    if (checkCollisionWithSquare() === "increase") {
        displaySquare(squareLeft.x, squareLeft.y, squareLeft.size, squareLeft.colorHover.R, squareLeft.colorHover.G, squareLeft.colorHover.B);
        displaySquare(squareRight.x, squareRight.y, squareRight.size, squareRight.color.R, squareRight.color.G, squareRight.color.B);
    }
    else if (checkCollisionWithSquare() === "decrease") {
        displaySquare(squareLeft.x, squareLeft.y, squareLeft.size, squareLeft.color.R, squareLeft.color.G, squareLeft.color.B);
        displaySquare(squareRight.x, squareRight.y, squareRight.size, squareRight.colorHover.R, squareRight.colorHover.G, squareRight.colorHover.B);
    }
    else {
        displaySquare(squareLeft.x, squareLeft.y, squareLeft.size, squareLeft.color.R, squareLeft.color.G, squareLeft.color.B);
        displaySquare(squareRight.x, squareRight.y, squareRight.size, squareRight.color.R, squareRight.color.G, squareRight.color.B);
    }
    for (let i = 0; i < counter; i++) {

        let tmpAlpha = ellipse.alpha + i * ellipse.alphaSpeed;
        let tmpRadius = ellipse.radius + i * ellipse.radiusAddingSpeed;
        drawCircle(ellipse.x, ellipse.y, tmpRadius, tmpAlpha);
        // console.log(counter);
    }

}

function displaySquare(x, y, size, r, g, b) {
    push();
    fill(r, g, b);
    square(x, y, size);
    pop();
}

function checkCollisionWithSquare() {
    let squareLeftRangeX1 = squareLeft.x;
    let squareLeftRangeX2 = squareLeft.x + squareLeft.size;
    let squareRightRangeX1 = squareRight.x;
    let squareRightRangeX2 = squareRight.x + squareRight.size;
    let rangeY1 = squareLeft.y;
    let rangeY2 = squareLeft.y + squareLeft.size;

    //left square hover 
    if (mouseX >= squareLeftRangeX1 && mouseX <= squareLeftRangeX2 && mouseY >= rangeY1 && mouseY <= rangeY2) {
        return "increase";
    }
    else if (mouseX >= squareRightRangeX1 && mouseX <= squareRightRangeX2 && mouseY >= rangeY1 && mouseY <= rangeY2) {
        return "decrease";
    }
    else {
        return "notHover";
    }
}

function mouseClicked() {
    if (checkCollisionWithSquare() === "increase") {
        counter += 1;
    }
    else if (checkCollisionWithSquare() === "decrease") {
        counter -= 1
    }
    // console.log(counter);
}

function drawCircle(x, y, radius, alpha) {
    if (counter <= 10 && counter >= 1) {

        push();
        fill(ellipse.color, alpha);
        stroke(255);
        strokeWeight(4);
        circle(x, y, radius);
        pop();
    }
    else {
        return;
    }

}