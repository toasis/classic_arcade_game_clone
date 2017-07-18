// Enemies our player must avoid
var gameOver = false;
var playerWon = false;
var playerOutofBorder = false;
var gameStart = true;
var playerLife = 3;

var GameIndicator = function(x, y, width, height) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/GameOver.png';
    this.width = 213;
    this.height = 22;
};

GameIndicator.prototype.display = function(indicator) {
    switch (indicator) {
        case "Game Over":
            console.log("You hits bug!Game Over--!");

            break;
        case "Out of border":
            console.log("reach the border, game Over! please play again--!");
            break;
        case "Won":
            console.log("You Won!--");

            break;
        default: //start
            console.log("Game start--!");
            gameOver = false;
            playerWon = false;

    }
};

//display "You hits bug!Game Over--!" in console and a "game over" PNG on screen
//if player hit bugs.
var hitBugs = function() {
    gameOverIndicator.display("Game Over");
    gameOver = true;
    setTimeout(function() {
        player.reset();
    }, 1500);


};
//display ""You Won!--" if player reach water.
var setWon = function() {
    gameWonIndicator.display("Won!");
    playerWon = true;
    gameOver = false;
    setTimeout(function() {
        player.reset();
    }, 1500);
};

//display ""reach the border, game Over! please play again--!" if player go out
//of borders.
var outOfBorders = function() {
    gameOutBorderIndicator.display("Out of border");
    playerOutofBorder = true;
    setTimeout(function() {
        player.reset();
    }, 1500);
};

GameIndicator.prototype.render = function() {
    "use strict";
    if (gameOver) {
        ctx.drawImage(Resources.get(gameOverIndicator.sprite), gameOverIndicator.x,
            gameOverIndicator.y, gameOverIndicator.width, gameOverIndicator.height);
    } else {
        ctx.drawImage(Resources.get(gameStartIndicator.sprite), gameStartIndicator.x,
            gameStartIndicator.y, gameStartIndicator.width, gameStartIndicator.height);
    }
    if (playerOutofBorder) {
        ctx.drawImage(Resources.get(gameOutBorderIndicator.sprite), gameOutBorderIndicator.x,
            gameOutBorderIndicator.y, gameOutBorderIndicator.width, gameOutBorderIndicator.height);
    }
    if (playerWon) {
        ctx.drawImage(Resources.get(gameWonIndicator.sprite), gameWonIndicator.x,
            gameWonIndicator.y, gameWonIndicator.width, gameWonIndicator.height);
    } else {
        ctx.drawImage(Resources.get(gameStartIndicator.sprite), gameStartIndicator.x,
            gameStartIndicator.y, gameStartIndicator.width, gameStartIndicator.height);
    }
};

//GameIndicator instances
var gameOverIndicator = new GameIndicator(153, 200);
var gameStartIndicator = new GameIndicator(160, 400);
var gameWonIndicator = new GameIndicator(150, 100);
var gameOutBorderIndicator = new GameIndicator(160, 100);

gameStartIndicator.sprite = "images/GameStart.png";
gameWonIndicator.sprite = "images/GameWon.png";
gameOutBorderIndicator.sprite = "images/GameOutBorder.png";

var gameIndicators = [gameStartIndicator, gameOverIndicator, gameWonIndicator, gameOutBorderIndicator];

/*******************************************************************************/
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
        hitBugs();

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
// enemy instances
// var enemy1 = new Enemy(0, 60, 20);
// var enemy2 = new Enemy(0, 110, 40);
var enemy3 = new Enemy(0, 50, 10);
// var enemy4 = new Enemy(0, 210, 30);
var allEnemies = [enemy3];

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
        outOfBorders();
    } else if (this.y < 50 && this.x > 0) {
        console.log(this.x, this.y);
        //Show won message in console if player reach water.
        setWon();

    }

};
Player.prototype.reset = function() {
    gameStartIndicator.display();
    this.x = 200;
    this.y = 375;

};
Player.prototype.update = function() {
    "use strict";

};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// player instance
var player = new Player(200, 375);
/*******************************************************************************/
// var PlayerLife = function(x, y) {
//     "use strict";
//     this.x = x;
//     this.y = y;
//     this.sprite = 'images/Heart.png';
//     this.width = 101;
//     this.height = 171;
// };
// PlayerLife.prototype.update = function() {
//     "use strict";

// };
// PlayerLife.prototype.render = function() {

//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
// var playerLife1 = new PlayerLife(0,500);
// var playerLife2 = new PlayerLife(0,450);
// var playerLife3 = new PlayerLife(0,400);
// var playerLifes = [playerLife1, playerLife2, playerLife3];
/*******************************************************************************/
// var Gem = function(x, y) {
//     "use strict";
//     this.x = x;
//     this.y = y;
//     this.sprite = 'images/Gem_Orange.png';
//     this.width = 101;
//     this.height = 101;
// };
// Gem.prototype.checkCollisions = function() {
//     "use strict";
//     console.log("Gem Location:" + this.x + this.y);
//     if (this.x < player.x + player.width &&
//         this.x + this.width > player.x &&
//         this.y < player.y + player.height &&
//         this.height + this.y > player.y) {


//     }

// };
// Gem.prototype.update = function() {
//     "use strict";
//     this.checkCollisions();
// };
// Gem.prototype.render = function() {

//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
/*******************************************************************************/



//gem instances
// var gem1 = new Gem(100, 120);
// var gem2 = new Gem(200, 130);
// gem2.sprite = 'images/Gem_Green.png';
// var allGems = [gem1, gem2];



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
