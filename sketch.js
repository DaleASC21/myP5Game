let objX = 500;
let objY = 250;
let safeX = objX;
let safeY = 250;
let myX = 125;
let myY = 250;
let objTop, objBot, objLeft, objRight;
let safeTop, safeBot, safeLeft, safeRight;
let myTop, myBot, myLeft, myRight;
let score = 0;
let speed = 3;
let state = 0;

function setup() {
    createCanvas(500, 500);
    rectMode(CENTER);
    noStroke();
}

function draw() {
    background(0);

    fill(0, 170, 0);
    rect(objX, objY, 70, 500);
    fill(0);
    rect(safeX, safeY, 72, 100);
    fill(200, 200, 0);
    rect(myX, myY, 50, 50);

    objX -= speed;
    safeX -= speed;

    if (state == 0) {
        if (keyIsDown(UP_ARROW) && myY > 25) {
            myY -= 6;
        }
    }
    // gravity
    if (myY < 475) {
        myY += speed;
    }
    // loop obstacle
    if (objX < -50) {
        objX = 535;
        safeX = 536;
        safeY = random(100, 400);
    }

    // obstacle collision
    objTop = objY - 250;
    objBot = objY + 250;
    objLeft = objX - 35;
    objRight = objX + 35;
    // "safe spot" collision
    safeTop = safeY - 2;
    safeBot = safeY + 2;
    safeLeft = safeX - 36;
    safeRight = safeX + 36;
    // player collision
    myTop = myY - 25;
    myBot = myY + 25;
    myLeft = myX - 25;
    myRight = myX + 25;

    // prioritizes safe spot over obstacle
    if (myLeft > safeRight || myRight < safeLeft || myTop > safeBot || myBot < safeTop) {
        if (myLeft > objRight || myRight < objLeft || myTop > objBot || myBot < objTop) {
            fill(255);
            textSize(50);
            text(score, 225, 50);
        }
        else {
            state = 1;
            speed = 0;
            fill(255);
            score = 0
            textSize(50);
            text(score, 225, 50);
        }
    }
    else {
        fill(255);
        score++;
        textSize(50);
        text(score, 225, 50); 
    }

    if (state == 1) {
        textSize(25);
        text("Click anywhere to try again.", 100, 250); 
    }
}

function mouseClicked() {
    if (state == 1) {
        state = 0;
        speed = 3;
        objX = 535;
        safeX = 536;
    }
}