var x = 0, ctx, repeat, move, counter = 0;

var main = function () {
    "use strict";
    move = 0;
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, 50, 50);
    //setTimeout(main, 10);
};

var toggle = function () {
    "use strict";
    if (move === 0) {move = 0.1; } else {move = 0; }
    counter = x;
    repeat();
};

repeat = function () {
    "use strict";
    counter += 0.1;
    var p = document.getElementById("does this work");
    p.innerHTML = move.toString() + " " + x.toString() + " " + counter.toString();
    x += move;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillRect(x, 0, 50, 50);
    if (x > ctx.canvas.width - 50) {
        ctx.fillRect(x - ctx.canvas.width, 0, 50, 50);
    }
    if (x > ctx.canvas.width) {
        x -= ctx.canvas.width;
    }
    setTimeout(repeat, 10);

};
