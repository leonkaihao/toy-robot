let cmdMgr = require("../tr_cmd");
let expect = require("chai").expect;

describe("test addCommand", function() {
    
    it("wrong type", function(){
        let errObj = null;
        cmdMgr.addCommand(null, function(data, cb){}, function(err){
            errObj = err;
        });
        expect(errObj).to.be.not.null;
    });

    it("empty cmd", function(){
        let errObj = null;
        cmdMgr.addCommand("", function(data, cb){}, function(err){            
            errObj = err;
        });
        expect(errObj).to.be.not.null;
    });

    it("empty function", function(){
        let errObj = null;
        cmdMgr.addCommand("cmd1", null, function(err){            
            errObj = err;
        });
        expect(errObj).to.be.not.null;
    });
    
    it("normal", function(){
        let errObj = null;
        cmdMgr.addCommand("cmd1", function(data, cb){}, function(err){            
            errObj = err;
        });
        expect(errObj).to.be.null;
    });
});


describe("test parseCommand", function() {
    cmdMgr.clean();
    cmdMgr.addCommand("cmd1", function(args, cb){}, function(err) {});
    cmdMgr.addCommand("cmd2", function(args, cb){}, function(err) {});
    cmdMgr.addCommand("cmd3", function(args, cb){}, function(err) {});
    it("wrong type", function(){
        let errObj = null;
        cmdMgr.parseCommand(null, function(err) {
            errObj = err;
        });
        expect(errObj).to.be.not.null;
    });
    it("empty cmd", function(){
        let errObj = null;
        cmdMgr.parseCommand("", function(err) {            
            errObj = err;
        });
        expect(errObj).to.be.not.null;
    });
    it("unknown command", function() {
        let errObj = null;
        cmdMgr.parseCommand("cmd4", function(err) {            
            errObj = err;
        });
        expect(errObj).to.be.not.null;
    });
    it("normal", function() {
        let errObj = null;
        cmdMgr.parseCommand("cmd3", function(err) {            
            errObj = err;
        });
        expect(errObj).to.be.null;
    });
});