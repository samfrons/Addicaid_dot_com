

window.logCaller = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console){
        if (arguments.length == 1)
            console.log("~"+arguments.callee.caller.name+"~", arguments[0]);
        else
            console.log("~"+arguments.callee.caller.name+"~", Array.prototype.slice.call(arguments) );
    }
};

window.logvarCaller = function(name, obj) {
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push([name,obj]);
    if(this.console){
        console.log("~"+arguments.callee.caller.name+"~", name, obj );
    }
}


window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console){
        if (arguments.length == 2 && typeof(arguments[0]) === "string" && arguments[1] === null)
            console.log("~"+arguments[0]+"~")
        else if (arguments.length == 1)
            console.log(arguments[0]);
        else if (typeof(arguments[0]) === "string")
            console.log("~"+arguments[0]+"~", Array.prototype.slice.call(arguments, 1) );
        else
            console.log(Array.prototype.slice.call(arguments) );
    }
};

window.logvar = function(scope, name, obj) {
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push([scope,name,obj]);
    if(this.console){
        console.log("~"+scope+"~", name, obj );
    }
}

//window.log = function() {}
//window.logvar = function(){}


//window.prettyLog = function() {
//    log.history = log.history || [];   // store logs to an array for reference
//    log.history.push(arguments);
//    if(this.console){
//        if (arguments.length == 1)
//            console.log(arguments.callee.caller.name, arguments[0]);
//        else if (arguments.length == 2)
//            console.log(arguments.callee.caller.name, arguments[0], arguments[1])
//        else if (arguments.length == 3)
//            console.log(arguments.callee.caller.name, arguments[0], arguments[1], arguments[2])
//        else if (arguments.length == 4)
//            console.log(arguments.callee.caller.name, arguments[0], arguments[1], arguments[2], arguments[3])
//        else
//            console.log(arguments.callee.caller.name, Array.prototype.slice.call(arguments));
//    }
//}
