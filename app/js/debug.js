

// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console){
        if (arguments.length == 1)
            console.log("~"+arguments.callee.caller.name+"~", arguments[0]);
        else
            console.log("~"+arguments.callee.caller.name+"~", Array.prototype.slice.call(arguments) );
    }
};

window.logvar = function(name, obj) {
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push([name,obj]);
    if(this.console){
        console.log("~"+arguments.callee.caller.name+"~", name, obj );
    }
}

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

//// alog(this); == console.log(this,arguments);
//window.alog = function(context){
//    // grab the calling functions arguments
//    log(arguments.callee.caller.name, context, arguments.callee.caller.arguments);
//}