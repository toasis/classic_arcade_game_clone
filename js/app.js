// Enemies our player must avoid
var gameOver = false;
var playerWon = false;
var playerOutofBorder = false;
var gameStart = true;
var meetEnemy =false;
// var playerLife = 3;

var GameIndicator = function(x, y, width, height) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/GameOver.png';
    this.width = 213;
    this.height = 22;
};

var hitBugs = function() {
    "use strict";
    console.log("Meet enemy! Game Over!");
    gameOver = true;
    meetEnemy =true;
    gameStart = false;
    setTimeout(function() {
        player.reset();
    }, 1500);


};
//display ""You Won!--" if player reach water.
var setWon = function() {
    "use strict";
    console.log("You Won!");
    playerWon = true;
    gameOver = false;
    gameStart = false;
    setTimeout(function() {
        player.reset();
    }, 1500);
};

//display ""reach the border, game Over! please play again--!" if player go out
//of borders.
var outOfBorders = function() {
    console.log("You reach the borders,please play again!");
    gameStart = false;
    playerOutofBorder = true;
    gameOver = true;
    setTimeout(function() {
        player.reset();
    }, 1500);
};

GameIndicator.prototype.render = function() {
    "use strict";
    var drawGameStart = function(){
        ctx.drawImage(Resources.get(gameStartIndicator.sprite), gameStartIndicator.x,
            gameStartIndicator.y, gameStartIndicator.width, gameStartIndicator.height);
    };
    var drawGameOver = function(){
        ctx.drawImage(Resources.get(gameOverIndicator.sprite), gameOverIndicator.x,
            gameOverIndicator.y, gameOverIndicator.width, gameOverIndicator.height);
    };
    var drawMeetEnemy =function(){
        ctx.drawImage(Resources.get(meetEnemyIndicator.sprite), meetEnemyIndicator.x,
            meetEnemyIndicator.y, meetEnemyIndicator.width, meetEnemyIndicator.height);
    };
    var drawOutofBorder= function(){
        ctx.drawImage(Resources.get(gameOutBorderIndicator.sprite), gameOutBorderIndicator.x,
            gameOutBorderIndicator.y, gameOutBorderIndicator.width, gameOutBorderIndicator.height);
    };
    var drawPlayerWon = function(){
        ctx.drawImage(Resources.get(gameWonIndicator.sprite), gameWonIndicator.x,
            gameWonIndicator.y, gameWonIndicator.width, gameWonIndicator.height);
    };

    if (gameStart) {
        drawGameStart();
    } else {

    }

    if (meetEnemy) {
        drawMeetEnemy();
        drawGameOver();
    } else {
        drawGameStart();
    }

    if (playerOutofBorder) {
        drawOutofBorder();
        drawGameOver();
    }else{
        drawGameStart();
    }

    if (playerWon) {
        drawPlayerWon();
    } else {
        drawGameStart();
    }
};

//GameIndicator instances
var gameOverIndicator = new GameIndicator(250, 10);
var gameStartIndicator = new GameIndicator(160, 400);
var gameWonIndicator = new GameIndicator(160, 10);
var gameOutBorderIndicator = new GameIndicator(60, 10);
var meetEnemyIndicator = new GameIndicator(60,10);

gameStartIndicator.sprite = "images/GameStart.png";
gameWonIndicator.sprite = "images/GameWon.png";
gameOutBorderIndicator.sprite = "images/GameOutBorder.png";
meetEnemyIndicator.sprite = "images/hitbug.png";

var gameIndicators = [gameStartIndicator, gameOverIndicator, gameWonIndicator,
gameOutBorderIndicator, meetEnemyIndicator];

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
    } else if (this.y < 20 && this.x > 0) {
        console.log(this.x, this.y);
        //Show won message in console if player reach water.
        setWon();

    }

};
Player.prototype.reset = function() {
    // gameStartIndicator.display();
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
var PlayerLife = function(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
    this.width = 101;
    this.height = 171;
};
PlayerLife.prototype.update = function() {
    "use strict";

};
PlayerLife.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var playerLife1 = new PlayerLife(0,500);
var playerLife2 = new PlayerLife(0,450);
var playerLife3 = new PlayerLife(0,400);
var playerLives = [playerLife1, playerLife2, playerLife3];
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
