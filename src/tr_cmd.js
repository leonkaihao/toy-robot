var CmdMgr = exports = module.exports = {
    cmdMap: {},
    /**    
    * addCommand    
    * @description insert a command and corresponding handler function.
    * @param {string} cmd - command name
    * @param {CmdMgr~commandHandler} handler - command handler with 2 args, an arg array and an error callback.
    * @param {CmdMgr~errorCallback} cb - error callback with 1 arg, an error object with message attr, null if no error.
    */  
    addCommand: function(cmd, handler, cb) {
        if ((typeof cmd) !== "string" || cmd.length == 0) {
            cb({message: "[ERR]addCommand Illegal cmd " + cmd});
            return;
        }
        if ((typeof handler) !== "function") {
            cb({message: "[ERR]addCommand Illegal function " + handler});
            return;
        }
        this.cmdMap[cmd] = handler;
        return;
    },
    /**    
    * parseCommand    
    * @description input a commandline, parsing it and dispatching to its handler.
    * @param {string} cmdline - command line with a name and args seperated by commas.
    * @param {CmdMgr~errorCallback} cb - error callback with 1 arg, an error object with message attr, null if no error.
    */  
    parseCommand: function(cmdline, cb) {
        if ((typeof cmdline) !== "string") {
            cb({message: "[ERR]parseCommand Illegal param " + cmdline});
            return;
        }

        let cmdarr = cmdline.split(" ");
        if (!this.cmdMap[cmdarr[0]]) {            
            cb({message: "[ERR]parseCommand Unknown command " + cmdarr[0]});
            return;
        }
        
        let argarr = [];
        if (cmdarr.length > 1) {
            cmdarr[1].split(",");
        }
        this.cmdMap[cmdarr[0]](argarr, cb);
        return;
    },  
    /**    
    * clean
    * @description remove stored command-handler pairs.
    */    
    clean: function() {
        this.cmdMap = {};
        return;
    }
};