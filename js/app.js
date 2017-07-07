// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    "use strict";
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
    "use strict";
    //enemies now move accorss the playground
    for (var i = 0; i < 5; i++) {
        this.x = this.x + dt * this.speed;

    }
    // let enemies go back to start line if they move outside the playground
    if (this.x > 507) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};
Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            this.x = this.x - 15;
            console.log(this.x);
            break;
        case "right":
            this.x = this.x + 15;
            console.log(this.x);
            break;
        case "down":
            this.y = this.y + 15;
            console.log(this.x);
            break;
        default: //top
            this.y = this.y - 15;
            console.log(this.x);
    }
}
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// enemy instances
var enemy1 = new Enemy(0, 60, 20);
var enemy2 = new Enemy(0, 110, 40);
var enemy3 = new Enemy(0, 120, 10);
var enemy4 = new Enemy(0, 210, 30);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// player object
var player = new Player(200, 375);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
