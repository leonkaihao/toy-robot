let robot = require("../tr_robot");
let expect = require("chai").expect;

describe("test robot place", function() {
    it("wrong place 1", function(){
        let ret = robot.place(-1, 0, "NORTH");
        expect(ret).equal(false);
    });
    it("wrong place 2", function(){
        let ret = robot.place(0, -1, "NORTH");
        expect(ret).equal(false);
    });
    it("wrong place 3", function(){
        let ret = robot.place(0, 0, "MID");
        expect(ret).equal(false);
    });
    it("wrong place 4", function(){
        let ret = robot.place(5, 0, "NORTH");
        expect(ret).equal(false);
    });
    it("wrong place 5", function(){
        let ret = robot.place(0, 5, "NORTH");
        expect(ret).equal(false);
    });
    it("normal place 1", function(){
        let ret = robot.place(0, 0, "NORTH");
        expect(ret).equal(true);
    });
    it("normal place 2", function(){
        let ret = robot.place(0, 4, "SOUTH");
        expect(ret).equal(true);
    });
    it("normal place 3", function(){
        let ret = robot.place(4, 4, "WEST");
        expect(ret).equal(true);
    });
    it("normal place 4", function(){
        let ret = robot.place(4, 0, "EAST");
        expect(ret).equal(true);
    });
});

describe("test robot MOVE", function() {
    it("cannot move", function() {
        robot.reset();
        let ret = robot.move();
        expect(ret).equal(false);
        
    });
    it("move out 1", function() {
        robot.place(0, 0, "SOUTH");
        let ret = robot.move();
        expect(ret).equal(false);
    });
    it("move out 2", function() {
        robot.place(0, 0, "WEST");
        let ret = robot.move();
        expect(ret).equal(false);
    });
    it("move out 3", function() {
        robot.place(0, 4, "NORTH");
        let ret = robot.move();
        expect(ret).equal(false);
    });
    it("move out 4", function() {
        robot.place(0, 4, "WEST");
        let ret = robot.move();
        expect(ret).equal(false);
    });
    it("move out 5", function() {
        robot.place(4, 0, "SOUTH");
        let ret = robot.move();
        expect(ret).equal(false);
    });
    it("move out 6", function() {
        robot.place(4, 0, "EAST");
        let ret = robot.move();
        expect(ret).equal(false);
    });
    it("move out 7", function() {
        robot.place(4, 4, "NORTH");
        let ret = robot.move();
        expect(ret).equal(false);
    });
    it("move out 8", function() {
        robot.place(4, 4, "EAST");
        let ret = robot.move();
        expect(ret).equal(false);
    });

    it("move normal 1", function() {
        robot.place(0, 0, "NORTH");
        let ret = robot.move();
        expect(ret).equal(true);

        let x, y, facing;
        [x,y,facing] = robot.getPos();
        expect(x).equal(0);
        expect(y).equal(1);
        expect(facing).equal("NORTH");

    });
    it("move normal 2", function() {
        robot.place(0, 0, "EAST");
        let ret = robot.move();
        expect(ret).equal(true);

        let x, y, facing;
        [x,y,facing] = robot.getPos();
        expect(x).equal(1);
        expect(y).equal(0);
        expect(facing).equal("EAST");
    });
    
    it("move normal 3", function() {
        robot.place(4, 4, "WEST");
        let ret = robot.move();
        expect(ret).equal(true);

        let x, y, facing;
        [x,y,facing] = robot.getPos();
        expect(x).equal(3);
        expect(y).equal(4);
        expect(facing).equal("WEST");
    });
    it("move normal 4", function() {
        robot.place(4, 4, "SOUTH");
        let ret = robot.move();
        expect(ret).equal(true);

        let x, y, facing;
        [x,y,facing] = robot.getPos();
        expect(x).equal(4);
        expect(y).equal(3);
        expect(facing).equal("SOUTH");
    });
});


describe("test robot turn LEFT and RIGHT", function() {
    it("cannot turn left and right", function() {
        robot.reset();
        let ret = robot.turnLeft();
        expect(ret).equal(false);
        ret = robot.turnRight();
        expect(ret).equal(false);        
    });
    it("turn left", function() {
        let facing;
        robot.place(4, 4, "NORTH");

        let ret = robot.turnLeft();
        [,,facing] = robot.getPos();
        expect(facing).equal("WEST");
        ret = robot.turnLeft();
        [,,facing] = robot.getPos();
        expect(facing).equal("SOUTH");   
        ret = robot.turnLeft();
        [,,facing] = robot.getPos();
        expect(facing).equal("EAST");   
        ret = robot.turnLeft();
        [,,facing] = robot.getPos();
        expect(facing).equal("NORTH");   
    });
    it("turn right", function() {
        let facing;
        robot.place(4, 4, "NORTH");

        let ret = robot.turnRight();
        [,,facing] = robot.getPos();
        expect(facing).equal("EAST");
        ret = robot.turnRight();
        [,,facing] = robot.getPos();
        expect(facing).equal("SOUTH");   
        ret = robot.turnRight();
        [,,facing] = robot.getPos();
        expect(facing).equal("WEST");   
        ret = robot.turnRight();
        [,,facing] = robot.getPos();
        expect(facing).equal("NORTH");   
    });
});