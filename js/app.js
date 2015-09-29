"use strict";

// global variables
var numberOfEnemies = 5;
var xStart = 202; // player start location x
var yStart = 404; // player start location y
var leftRightStep = 101; // arrow key input
var upDownStep = 83; // arrow key input

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // initial location
    this.x = -101;
    this.y = 63 + (Math.floor(Math.random() * 3) * 83);

    // set enemy speed
    this.speed = 1 + Math.random() * 3;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + (100 * dt * this.speed)) % 1010;

    // make enemies start movement off screen
    if (this.x > 700) {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    // initial location
    this.x = xStart;
    this.y = yStart;

    // initiate player by loading image
    this.sprite = 'images/char-boy.png';
};
// This class requires an update(), render() and
// a handleInput() method

// update player location
Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < (allEnemies[i].x + 40) && (this.x + 65) > (allEnemies[i].x)
            && (this.y + 135) > (allEnemies[i].y + 140) && (this.y + 65) < (allEnemies[i].y + 80)) {
                this.x = xStart;
                this.y = yStart;
            }
    };

    // send player back to start when reaching water
    if (this.y <= 0) {
        this.x = xStart;
        this.y = yStart;
    }

    // TODO: make player appear on water before returning to start
}

// TODO: add number of lives

// draw player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// receive user input
Player.prototype.handleInput = function(key) {

    // keep player from going off left of screen
    if (key === 'left' && (this.x - leftRightStep >= 0)) {
        this.x -= leftRightStep;
    }

    // keep player from going off top of screen
    if (key === 'up' && (this.y - upDownStep >= -11)) {
        this.y -= upDownStep;
    }

    // keep player from going off right of screen
    if (key === 'right' && (this.x + leftRightStep < 505)) {
        this.x += leftRightStep;
    }

    // keep player from going off bottom of screen
    if (key === 'down' && (this.y + upDownStep < 487)) {
        this.y += upDownStep;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < numberOfEnemies; i++) {
    var enemyObject = new Enemy();
    allEnemies.push(enemyObject);
}

// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
