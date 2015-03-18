var x = 0, y, xvelocity = 0, yvelocity = 0, xaccel = 0, yaccel = 0, ctx, repeat, move, counter = 0, gravity = 0.3, canjump, groundHeight = 5, keyHandle, platformy = 145, platformx = 0, platformHeight = 5, platformxVelocity = -1, platformNexty;
var pWidth = 10, pHeight = 10;

var main = function () {
    "use strict";
    move = 0;
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    y = platformy;
    ctx.fillRect(x, y, pWidth, pHeight);
    document.addEventListener('keydown', keyHandle, true);
    setTimeout(repeat, 10);
    platformNexty = Math.floor(Math.min(Math.max((80 * (Math.random() - 0.5)) + platformy, 0), ctx.canvas.height - platformHeight));
};

var stop = function () {
    "use strict";
    xvelocity = 0;
    xaccel = 0;
    yvelocity = 0;
    yaccel = 0;
    platformxVelocity = 0;
};

repeat = function () {
    "use strict";
    //alert("repeat");
    setTimeout(repeat, 10);
    var p = document.getElementById('does this work');
    p.innerHTML = platformNexty;
    x += xvelocity;
    y += yvelocity;
    xvelocity += xaccel;
    yvelocity += yaccel;
    platformx += platformxVelocity;


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
    //ctx.fillRect(0, ctx.canvas.height - groundHeight, ctx.canvas.width, groundHeight);


    ctx.fillRect(platformx, platformy, ctx.canvas.width, platformHeight);
    // and the next platform too
    ctx.fillRect(platformx + ctx.canvas.width, platformNexty, ctx.canvas.width, platformHeight);


    // jumping stuph
    if (y !== platformy - pHeight) {
        if (y > platformy - pHeight) {
            y = platformy - pHeight;
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


    // finding out max height
    if (y !== 135 && yvelocity <= 0.5 && yvelocity >= -0.5) {
        p.innerHTML = 135 - y;
    }
};


keyHandle = function (event) {
    "use strict";
    /*if (event.keyCode === 37) {
        //alert("left key pressed");
        //xvelocity = -1.5;
        //var p = document.getElementById('does this work');
        //p.innerHTML = y + " " + xvelocity;
    } else if (event.keyCode === 39) {
        //alert("right key pressed");
        //xvelocity = 1.5;
    } else */
    if (event.keyCode === 32 && canjump) {
        yvelocity = -5;
    }
};



var gameLoop = function () {
    "use strict";
};
