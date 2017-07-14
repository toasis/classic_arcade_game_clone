// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    "use strict";
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.width = 97;
    this.height = 65;
};

Enemy.prototype.checkCollision = function() {
    "use strict";
    // console.log("checkCollisions invoked!");
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
        // console.log("You hits bug! CheckCollisions invoked!Game Over!");
        // game_Over_Indicator.over();
        game_Over_Indicator.display("Game Over");
        player.reset();


    }

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
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*******************************************************************************/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.width = 68;
    this.height = 78;
};

Player.prototype.handleInput = function(key) {
    "use strict";
    //use key on keyboard to control the movement of the player
    switch (key) {
        case "left":
            this.x = this.x - 25;

            break;
        case "right":
            this.x = this.x + 25;

            break;
        case "down":
            this.y = this.y + 25;

            break;
        default: //top
            this.y = this.y - 25;

    }
    //let the player go back to his original position if he reaches the border
    // of the playground or water.
    if (this.y < 0 || this.x < 0 || this.x > 440 || this.y > 448) {
       game_OutBorder_Indicator.display("Out of border");
       player.reset();
    } else if (this.y < 45 && this.x > 0) {
        //Show won message in console if player reach water.
        game_Won_Indicator.display("Won");
    }

};
Player.prototype.reset = function() {
    game_Start_Indicator.display();
    this.x = 200;
    this.y = 375;

};
Player.prototype.update = function() {
    "use strict";

};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*******************************************************************************/
var Gem = function(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem_Orange.png';
    this.width = 101;
    this.height = 101;
};
Gem.prototype.checkCollisions = function() {
    "use strict";
    console.log("Gem Location:" + this.x + this.y);
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {


    }

};
Gem.prototype.update = function() {
    "use strict";
    this.checkCollisions();
};
Gem.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*******************************************************************************/
var GameIndicator = function(x, y, width, height) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/GameOver.png';
    this.width = 213;
    this.height = 22;
};

GameIndicator.prototype.display = function(indicator){
    switch (indicator) {
        case "Game Over":
            this.sprite = 'images/GameOver.png';
            console.log("You hits bug!Game Over--!");

            break;
        case "Out of border":
            this.sprite = 'images/GameOutBorder.png';
            console.log("reach the border, game Over! please play again--!");
            break;
        case "Won":
            this.sprite = 'images/GameWon.png';
            console.log("You Won!--");

            break;
        default: //start
            this.sprite = 'images/GameStart.png';
            console.log("Game start--!");

    }
};
GameIndicator.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

/*******************************************************************************/
// enemy instances
// var enemy1 = new Enemy(0, 60, 20);
// var enemy2 = new Enemy(0, 110, 40);
var enemy3 = new Enemy(0, 50, 10);
// var enemy4 = new Enemy(0, 210, 30);
var allEnemies = [enemy3];


//gem instances
var gem1 = new Gem(100, 120);
var gem2 = new Gem(200, 130);
gem2.sprite = 'images/Gem_Green.png';
var allGems = [gem1, gem2];

//GameIndicator instance
var game_Over_Indicator = new GameIndicator(153, 200);
var game_Start_Indicator = new GameIndicator(160, 400);
var game_Won_Indicator = new GameIndicator(150, 100);
var game_OutBorder_Indicator = new GameIndicator(150, 100);

game_Start_Indicator.sprite = "images/GameStart.png";
game_Won_Indicator.sprite = "images/GameWon.png";
game_OutBorder_Indicator.sprite = "images/GameOutBorder.png";

var gameIndicators = [game_Start_Indicator, game_Over_Indicator, game_Won_Indicator];

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
