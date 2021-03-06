var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var game = document.getElementById("game");
var gameCtx = game.getContext("2d");
var player = document.getElementById("player");
var playerCtx = player.getContext("2d");

var imgSprite = new Image();
imgSprite.src = "http://s6.postimg.org/dvhgnkaal/Sprite_Sheet.png";
var background = new Image();
window.Game = {};
angle = 0;

background.src = "http://s6.postimg.org/f0bisxwrl/test.png";

// wrapper for "class" Rectangle
(function () {
    function Rectangle(left, top, width, height) {
        this.left = left || 0;
        this.top = top || 0;
        this.right = (left + width) || 0;
        this.bottom = (top + height) || 0;
    }

    Rectangle.prototype.set = function (left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    }

    Rectangle.prototype.within = function (r) {
        return (r.left <= this.left && r.right >= this.right && r.top <= this.top && r.bottom >= this.bottom);
    }

    Rectangle.prototype.overlaps = function (r) {
        return (this.left < r.right && r.left < this.right && this.top < r.bottom && r.top < this.bottom);
    }

    // add "class" Rectangle to our Game object
    Game.Rectangle = Rectangle;
})();

// wrapper for "class" Camera (avoid global objects)
(function () {

    // possibles axis to move the camera
    var AXIS = {
        NONE: "none",
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        BOTH: "both"
    };

    // Camera constructor
    function Camera(xView, yView) {
        // position of camera (left-top coordinate)
        this.xView = xView || 0;
        this.yView = yView || 0;

        // distance from followed object to border before camera starts move
        this.xDeadZone = 0; // min distance to horizontal borders
        this.yDeadZone = 0; // min distance to vertical borders

        // viewport dimensions
        this.wView = game.width;
        this.hView = game.height;

        // allow camera to move in vertical and horizontal axis
        this.axis = AXIS.BOTH;

        // object that should be followed
        this.followed = null;

        // rectangle that represents the viewport
        this.viewportRect = new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);

        // rectangle that represents the world's boundary (room's boundary)
        this.worldRect = new Game.Rectangle(this.xView, this.yView, this.wView, this.hView);

    }

    // gameObject needs to have "x" and "y" properties (as world(or room) position)
    Camera.prototype.follow = function (gameObject, xDeadZone, yDeadZone) {
        this.followed = gameObject;
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    }

    Camera.prototype.update = function () {
        // keep following the player (or other desired object)
        if (this.followed != null) {
            if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
                // moves camera on horizontal axis based on followed object position
                if (this.followed.x - this.xView + this.xDeadZone > this.wView) this.xView = this.followed.x - (this.wView - this.xDeadZone);
                else if (this.followed.x - this.xDeadZone < this.xView) this.xView = this.followed.x - this.xDeadZone;

            }
            if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
                // moves camera on vertical axis based on followed object position
                if (this.followed.y - this.yView + this.yDeadZone > this.hView) this.yView = this.followed.y - (this.hView - this.yDeadZone);
                else if (this.followed.y - this.yDeadZone < this.yView) this.yView = this.followed.y - this.yDeadZone;
            }

        }

        // update viewportRect
        this.viewportRect.set(this.xView, this.yView);

        // don't let camera leaves the world's boundary
        if (!this.viewportRect.within(this.worldRect)) {
            if (this.viewportRect.left < this.worldRect.left) this.xView = this.worldRect.left;
            if (this.viewportRect.top < this.worldRect.top) this.yView = this.worldRect.top;
            if (this.viewportRect.right > this.worldRect.right) this.xView = this.worldRect.right - this.wView;
            if (this.viewportRect.bottom > this.worldRect.bottom) this.yView = this.worldRect.bottom - this.hView;
        }

    }

    // add "class" Camera to our Game object
    Game.Camera = Camera;

})();
// wrapper for "class" Player
(function () {
    function Player(x, y) {
        // (x, y) = center of object
        // it represents the player position on the world(room), not the canvas position
        this.x = x;
        this.y = y;
        // move speed in pixels per second
        this.speed = 2;

        // render properties
        this.width = 50;
        this.height = 50;
    }

    Player.prototype.update = function (step, xView, yView) {
        // parameter step is the time between frames ( in seconds )
        // check controls and move the player accordingly
        /// Move this check together
        if (Game.controls.left) {
            angle -= 10;
        } else  if (Game.controls.right) {
            angle += 10;
        }

        /// Add both here as angle with correctly use neg/pos
        if (Game.controls.up) {
            this.x += this.speed * Math.cos(angle * Math.PI / 180);
            this.y += this.speed * Math.sin(angle * Math.PI / 180);
        }

        /// Sub both here as angle with correctly use neg/pos
        if (Game.controls.down) {
            this.x -= this.speed * Math.cos(angle * Math.PI / 180);
            this.y -= this.speed * Math.sin(angle * Math.PI / 180);
        }

        // don't let player leaves the world's boundary
        if (this.x - this.width / 2 < 0) {
            this.x = this.width / 2;
        }
        if (this.y - this.height / 2 < 0) {
            this.y = this.height / 2;
        }
        if (this.x + this.width / 2 > canvas.width) {
            this.x = canvas.width - this.width / 2;
        }
        if (this.y + this.height / 2 > canvas.height) {
            this.y = canvas.height - this.height / 2;
        }
    }

    Player.prototype.draw = function (context, xView, yView) {

        /// Add this instead of subtract it
        xView = this.x + this.width / 2;
        yView = this.y + this.height / 2;

        /// not needed as you clear the canvas in the next step
        //playerCtx.drawImage(imgSprite, 0, 0, this.width, this.height, xView, yView, this.width, this.height);
        playerCtx.save();
        playerCtx.clearRect(0, 0, game.width, game.height);

        /// make sure pivot is moved to center
        playerCtx.translate(xView, yView);

        /// rotate, you should make new sprite where direction
        /// points to the right. I'm add 90 here to compensate
        playerCtx.rotate((angle + 90) * Math.PI / 180);

        /// translate back before drawing the sprite
        playerCtx.translate(-xView, -yView);
        playerCtx.drawImage(imgSprite, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        playerCtx.restore();
    }

    // add "class" Player to our Game object
    Game.Player = Player;

})();
// wrapper for "class" Map
(function () {
    function Map() {
        // map dimensions
        this.width = canvas.width;
        this.height = canvas.height;
    }

    // draw the map adjusted to camera
    Map.prototype.draw = function (context, xView, yView) {
        var sx, sy, dx, dy;
        var sWidth, sHeight, dWidth, dHeight;

        // offset point to crop the image
        sx = xView;
        sy = yView;

        // dimensions of cropped image
        sWidth = game.width;
        sHeight = game.height;

        // if cropped image is smaller than canvas we need to change the source dimensions
        if (this.width - sx < sWidth) {
            sWidth = this.width - sx;
        }
        if (this.height - sy < sHeight) {
            sHeight = this.height - sy;
        }

        // location on canvas to draw the croped image
        dx = 0;
        dy = 0;
        // match destination with source to not scale the image
        dWidth = sWidth;
        dHeight = sHeight;
        gameCtx.drawImage(background, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    // add "class" Map to our Game object
    Game.Map = Map;

})();


// Game Script
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / FPS);
    };
})();

var FPS = 0;
var INTERVAL = 1000 / FPS; // milliseconds
var STEP = INTERVAL / 1000 // seconds

// setup an object that represents the room
var room = {
    width: game.width,
    height: game.height,
    map: new Game.Map(game.width, game.height)
};

// setup player
var player = new Game.Player(50, 50);

// setup the magic camera !!!
var camera = new Game.Camera(0, 0, game.width, game.height, canvas.width, canvas.height);
camera.follow(player, game.width / 2, game.height / 2);

// Game update function
var update = function () {
    player.update(STEP, room.width, room.height);
    camera.update();
}

// Game draw function
var draw = function () {
    // clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // redraw all objects
    room.map.draw(ctx, camera.xView, camera.yView);
    player.draw(ctx, camera.xView, camera.yView);
}

// Game Loop
var gameLoop = function () {
    requestAnimFrame(gameLoop);
    update();
    draw();
}

Game.play = function () {
    gameLoop();
    console.log("play");
}

// <-- configure Game controls:

Game.controls = {
    left: false,
    up: false,
    right: false,
    down: false,
};

window.addEventListener("keydown", function (e) {
    e.preventDefault();
    switch (e.keyCode) {
        case 37:
            // left arrow
            Game.controls.left = true;
            break;
        case 38:
            // up arrow
            Game.controls.up = true;
            break;
        case 39:
            // right arrow
            Game.controls.right = true;
            break;
        case 40:
            // down arrow
            Game.controls.down = true;
            break;
    }
}, false);

window.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 37:
            // left arrow
            Game.controls.left = false;
            break;
        case 38:
            // up arrow
            Game.controls.up = false;
            break;
        case 39:
            // right arrow
            Game.controls.right = false;
            break;
        case 40:
            // down arrow
            Game.controls.down = false;
            break;
    }
    return false;
}, false);



// start the game when page is loaded
window.onload = function () {
    Game.play();
}
// setup the magic camera !!!
var camera = new Game.Camera(0, 0, canvas.width, canvas.height, canvas.width, canvas.height);
camera.follow(player, game.width / 2, game.height / 2);
