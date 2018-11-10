var robot = exports = module.exports = {
    width: 5,
    height: 5,
    DIR: {
        NORTH: {name: "NORTH", step: [0, 1]}, 
        SOUTH: {name: "SOUTH", step: [0, -1]}, 
        EAST: {name: "EAST", step: [1, 0]}, 
        WEST: {name: "WEST", step: [-1, 0]}
    }, 
    posX: -1, 
    posY: -1,
    facing: null,


    reset: function() {
        this.width = 5;
        this.height = 5;
        this.posX = -1;
        this.posY = -1;
        this.facing = this.DIR.NORTH;
        return;
    },

    place: function(x, y , facing) {
        if (x >= this.width || x < 0) {
            return false;
        }
        if (y >= this.height || y < 0) {
            return false;
        }
        if (!this.DIR[facing]) {
            return false;
        }
        this.posX = x;
        this.posY = y;
        this.facing = this.DIR[facing];
        return true;
    },
    move: function() {
        if (this.posX < 0 || this.posY < 0) {
            return false;
        }
        let nextX = this.posX + this.facing.step[0];
        let nextY = this.posY + this.facing.step[1];
        if (nextX < 0 || nextX >= this.width || nextY < 0 || nextY >= this.height){
            return false;
        }
        this.posX = nextX;
        this.posY = nextY;
        return true;
    },
    turnLeft: function() {
        if (this.posX < 0 || this.posY < 0) {
            return false;
        }
        switch (this.facing)
        {
        case this.DIR.NORTH:
            this.facing = this.DIR.WEST;
            break;            
        case this.DIR.SOUTH:
            this.facing = this.DIR.EAST;
            break;
        case this.DIR.EAST:
            this.facing = this.DIR.NORTH;
            break;
        case this.DIR.WEST:
            this.facing = this.DIR.SOUTH;
            break;
        }
        return true;
    },
    turnRight: function() {
        if (this.posX < 0 || this.posY < 0) {
            return false;
        }
        switch (this.facing)
        {
        case this.DIR.NORTH:
            this.facing = this.DIR.EAST;
            break;            
        case this.DIR.SOUTH:
            this.facing = this.DIR.WEST;
            break;
        case this.DIR.EAST:
            this.facing = this.DIR.SOUTH;
            break;
        case this.DIR.WEST:
            this.facing = this.DIR.NORTH;
            break;
        }
        return true;
    },
    getPos: function() {
        if (this.posX < 0 || this.posY < 0) {
            return null;
        }
        return [this.posX, this.posY, this.facing.name];
    }
};

Object.freeze(robot.DIR);