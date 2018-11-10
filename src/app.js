'use strict'
const readline = require("readline");
const fs = require('fs');
let tr_cmd = require("./tr_cmd");
let tr_robot = require("./tr_robot");

////mapping robots input commands and handlers

tr_cmd.addCommand("PLACE", function (data, cb) {
    if (!data || data.length !== 3) {
        cb({ message: "[ERR]PLACE: Incorrect args number " + data });
        return;
    }
    let [x, y, facing] = data;
    tr_robot.place(parseInt(x, 10), parseInt(y, 10), facing);
}, function(err) {
    console.log(err.message);
});

tr_cmd.addCommand("MOVE", function (data, cb) {
    tr_robot.move();
}, function(err) {
    console.log(err.message);
});

tr_cmd.addCommand("LEFT", function (data, cb) {
    tr_robot.turnLeft();
}, function(err) {
    console.log(err.message);
});

tr_cmd.addCommand("RIGHT", function (data, cb) {
    tr_robot.turnRight();
}, function(err) {
    console.log(err.message);
});

tr_cmd.addCommand("REPORT", function (data, cb) {
    let [x, y, facing] = tr_robot.getPos();
    console.log(`${x},${y},${facing}`);
}, function(err) {
    console.log(err.message);
});


//// get app arguments, input options include console and file
let args = process.argv.splice(2);
let input_method = process.stdin;
if (args.length !== 0) {
    input_method = fs.createReadStream(args[0]);
}

//// create read loop and execute command
console.log(`Please input commands of following form:
    PLACE X,Y,F
    MOVE
    LEFT
    RIGHT
    REPORT`);

const rl = readline.createInterface({
    input: input_method,
    output: process.stdout,
    prompt: "CMD> "
});
rl.prompt();
rl.on('line', (line) => {
    line = line.trim();
    tr_cmd.parseCommand(line.trim(), (err) => {
        console.log(err.message);
    });
    rl.prompt();
}).on('close', () => {
    process.exit(0);
});
