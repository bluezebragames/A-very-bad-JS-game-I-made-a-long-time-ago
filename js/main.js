// all the variables
var x = 5, y, xvelocity = 0, yvelocity = 0, xaccel = 0, yaccel = 0, ctx, repeat, move, counter = 0, gravity = 0.3, canjump, groundHeight = 5, keyHandle, platformy = 60, platformx = 0, platformHeight = 5, platformxVelocity = -3, platformNexty, stopped = false, backupYaccel, backupplatformxVelocity, die, dead = false, test = false, score = 0, generateNextPlatformY, total, inshop;
var pWidth = 10, pHeight = 10;

var main = function () {
    "use strict";
    inshop = false;
    move = 0;
    // so that we can draw stuph
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    y = platformy;
    ctx.fillRect(x, y, pWidth, pHeight);
    // standard key listener
    document.addEventListener('keydown', keyHandle, true);
    generateNextPlatformY();
    // deal with localstorage
    if (!localStorage.getItem("total"))
    {
        localStorage.setItem("total", 0);
    }
    if (!localStorage.getItem("highscore"))
    {
        localStorage.setItem("highscore", 0);
    }
    total = 0;
    total = parseInt(localStorage.getItem("total"));
    setTimeout(repeat, 10);
    test = true;
};

/*var stop = function () {
    "use strict";
    var button;
    if (dead) {
        dead = false;
        button = document.getElementById("button");
        button.innerHTML = "Press me to stop!";
        y = 55;
        yaccel = 0;
        score = 0;
        platformxVelocity = -1;
        platformy = 140;
        yvelocity = 0;
        generateNextPlatformY();
        //main();
        return;
    }
    if (!stopped) {
        backupYaccel = yaccel;
        backupplatformxVelocity = platformxVelocity;
        xvelocity = 0;
        xaccel = 0;
        yvelocity = 0;
        yaccel = 0;
        platformxVelocity = 0;
        stopped = true;
        button = document.getElementById("button");
        button.innerHTML = "Press me to start!";
        return;
    }
    if (stopped) {
        yaccel = backupYaccel;
        platformxVelocity = backupplatformxVelocity;
        stopped = false;
        button = document.getElementById("button");
        button.innerHTML = "Press me to stop!";
        return;
    }
};*/

repeat = function () {
    "use strict";
    platformxVelocity -= 0.0005;
    if (dead || stopped) {platformxVelocity = 0; }
    test = false;
    //alert("repeat");
    setTimeout(repeat, 10);
    var yolo = document.getElementById('yolt');
    yolo.innerHTML = "This game's score: " + score + '\n' + "All-time: " + total;
    //var p = document.getElementById('does this work');
    //p.innerHTML = dead + " " + y + " " + platformxVelocity;
    x += xvelocity;
    //y += yvelocity;
    platformy -= yvelocity;
    platformNexty -= yvelocity;

    xvelocity += xaccel;
    yvelocity += yaccel;
    platformx += platformxVelocity;


    if(!inshop){ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);}
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

    //var grass = document.getElementById("grass"), counter = 0;
    // draw most of the platform
    //while(counter < ctx.canvas.width-41) {
        //ctx.drawImage(grass, platformx + counter, platformy-4);
    ctx.fillRect(platformx, platformy, ctx.canvas.width, platformHeight);
        // and the next platform too
    ctx.fillRect(platformx + ctx.canvas.width, platformNexty, ctx.canvas.width, platformHeight);
        //ctx.drawImage(grass, platformx + ctx.canvas.width + counter, platformNexty-4);
        //counter += 41;
    //}
    // draw the last segment of the platform
    //ctx.drawImage(grass, 0, 0, ctx.canvas.width - counter, 15, platformx + counter, platformy-4);


    // jumping stuph
    if (y !== platformy - pHeight) {
        if (y > platformy) {
            yaccel = gravity;
            canjump = false;
            //console.log("hi");
        } else if (y > platformy - pHeight && yvelocity > 0) {
            var gap = platformNexty - platformy;
            platformy = y + pHeight;
            platformNexty = platformy + gap;
            yvelocity = 0;
            yaccel = 0;
            canjump = true;
        } else {
            yaccel = gravity;
            canjump = false;
        }
    } else if (yvelocity > 0) {
        yaccel = 0;
        yvelocity = 0;
        canjump = true;
    }

    // there's a time to die guys
    if (platformy < 0) {
        die();
    }

    // is it time to switch to the other platform?
    if (x >= platformx + ctx.canvas.width) {
        platformx += ctx.canvas.width;
        platformy = platformNexty;
        generateNextPlatformY();
        score += 1;
        total += 1;
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
    if (event.keyCode === 32 && dead) {
        dead = false;
        y = 55;
        yaccel = 0;
        score = 0;
        platformxVelocity = -3;
        platformy = 140;
        yvelocity = 0;
        generateNextPlatformY();
        var shop = document.getElementById("shop");
        shop.innerHTML = "";
        return;
    }
};



var gameLoop = function () {
    "use strict";
};

var die = function () {
    "use strict";
    if(!inshop)
    {
        platformxVelocity = 0;
        y = -50;
        dead = true;
        canjump = false;
        //var button = document.getElementById('button');
        //button.innerHTML = "Press me to restart!";
        ctx.font = "48px sans serif";
        ctx.fillText("Score: " + score, 0, 50);
        var shop = document.getElementById("shop");
        shop.innerHTML = "Shop";
        // deal with high score!
        if(typeof(Storage) !== "undefined") {
            var highscore = localStorage.getItem("highscore");
            if(score > highscore) {
                highscore = score;
                localStorage.setItem("highscore", highscore);
            }
            ctx.fillText("High: " + highscore, 0, 100);
            //total += parseInt(score);
            localStorage.setItem("total", total);
        }
    }
};

var shop = function () {
    inshop = true;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "15px sans serif";
    ctx.fillText("Color", 10, 10);

};

var generateNextPlatformY = function()
{
    platformNexty = Math.floor(Math.min(Math.max((50 * (Math.random() - 0.8)) + platformy, pHeight), ctx.canvas.height - platformHeight));
};
