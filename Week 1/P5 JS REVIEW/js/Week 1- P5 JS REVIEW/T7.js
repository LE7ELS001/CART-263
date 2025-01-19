/**
 * Task 7
 */
"use strict";

//circle 
const myCircle = {
    x: 25,
    y: 25,
    size: 50,
    color: {
        R: 120,
        G: 120,
        B: 120,
    }
}

//gap 
let horizontalNum;
let verticalNum;

/**
 * statement 
 * take the first row as reference 
 */

const shapeState = {
    currentState: undefined,
    recState: "rectangle",
    circleState: "circle"
}

function setup() {
    createCanvas(800, 600);
    horizontalNum = width / myCircle.size;
    verticalNum = height / myCircle.size;

    shapeState.currentState = shapeState.circleState;
    // console.log(horizontalNum);

}

function draw() {
    background(0);
    for (let i = 0; i < horizontalNum; i++) {
        let tmpX = myCircle.x + i * myCircle.size;
        for (let j = 0; j < verticalNum; j++) {

            let tmpY = myCircle.y + j * myCircle.size;
            let colNum = j % 2;
            drawShape(colNum, tmpX, tmpY, myCircle.size, myCircle.color.R, myCircle.color.G, myCircle.color.B);
        }
    }
}

function keyPressed() {
    if (keyCode === 32) {
        let tmpR = random(0, 255);
        let tmpG = random(0, 255);
        let tmpB = random(0, 255);

        myCircle.color.R = tmpR;
        myCircle.color.G = tmpG;
        myCircle.color.B = tmpB;

    }
}

function drawCircle(x, y, size, R, G, B) {
    push();
    fill(R, G, B);
    circle(x, y, size);
    pop();

}

function drawRec(x, y, size, R, G, B) {
    push();
    rectMode(CENTER);
    fill(R, G, B);
    rect(x, y, size);
    pop();

}

function drawShape(number, x, y, size, R, G, B) {
    if (shapeState.currentState === shapeState.circleState) {
        if (number === 0) {
            drawCircle(x, y, size, R, G, B);
        }
        else {
            drawRec(x, y, size, R, G, B);
        }
    }
    else {
        if (number === 0) {
            drawRec(x, y, size, R, G, B);
        }
        else {
            drawCircle(x, y, size, R, G, B);
        }
    }


}


function mouseClicked() {
    if (shapeState.currentState === shapeState.circleState) {
        shapeState.currentState = shapeState.recState;
    }
    else {
        shapeState.currentState = shapeState.circleState;
    }
}