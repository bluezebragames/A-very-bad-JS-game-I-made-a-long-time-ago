var x = 0, y, xvelocity = 0, yvelocity = 0, xaccel = 0, yaccel = 0, ctx, repeat, move, counter = 0, gravity = 0.3, canjump;
var pWidth = 10, pHeight = 10;

var main = function () {
    "use strict";
    move = 0;
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    y = ctx.canvas.height - pHeight;
    ctx.fillRect(x, y, pWidth, pHeight);
    setTimeout(repeat, 10);
};

var stop = function () {
    "use strict";
    xvelocity = 0;
    xaccel = 0;
    yvelocity = 0;
    yaccel = 0;
};

repeat = function () {
    "use strict";
    xvelocity += xaccel;
    yvelocity += yaccel;
    x += xvelocity;
    y += yvelocity;

    var p = document.getElementById('does this work');
    p.innerHTML = y;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillRect(x, y, pWidth, pHeight);
    if (x > ctx.canvas.width - pWidth) {
        ctx.fillRect(x - ctx.canvas.width, y, pWidth, pHeight);
    }
    if (x < pWidth) {
        ctx.fillRect(x + ctx.canvas.width, y, pWidth, pHeight);
    }
    if (x > ctx.canvas.width) {
        x -= ctx.canvas.width;
    }
    if (x < 0) {
        x += ctx.canvas.width;
    }
    if (y !== ctx.canvas.height - pHeight) {
        if (y > ctx.canvas.height - pHeight) {
            y = ctx.canvas.height - pHeight;
            yaccel = 0;
            yvelocity = 0;
            canjump = true;
        } else {
            yaccel = gravity;
            canjump = false;
        }
    } else {
        yaccel = 0;
        yvelocity = 0;
        canjump = true;
    }

    setTimeout(repeat, 10);
};


var keyHandle = function (event) {
    "use strict";
    if (event.keyCode === 37) {
        //alert("left key pressed");
        xvelocity = -1.5;
    } else if (event.keyCode === 39) {
        //alert("right key pressed");
        xvelocity = 1.5;
    } else if (event.keyCode === 32 && canjump) {
        yvelocity = -5;
    }
};

document.addEventListener('keydown', keyHandle, true);

var gameLoop = function () {
    "use strict";
};
