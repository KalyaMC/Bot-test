const { parentPort, workerData } = require("worker_threads")
const mineflayer = require('mineflayer');
const modules = require("./moduleLoader.js")

function initBot(){
    let initializing= mineflayer.createBot({
        host: workerData.host,
        port: workerData.port,
        username: workerData.username,
        viewDistance: workerData.viewDistance,
        version: workerData.version,
        keepAlive: workerData.keepAlive,
        checkTimeoutInterval: workerData.checkTimeoutInterval,
    });
    setStandardListeners(initializing)
    workerData.modules.forEach((pluginName) => {
        modules.loadModule(initializing, pluginName);
    });
    return initializing;
}
function setStandardListeners(initializing){
    initializing.on("end", () => {
        initBot();
    });
    initializing.on("error", (err) => {
        console.log(err);
        initBot();
    });
    initializing.on("kicked", (reason,loggedIn) => {
        console.log("Bot "+initializing.username+" was kicked for "+reason+" while "+(loggedIn?"inside":"logging in"));
    });
}

const bot=initBot();
parentPort.on("message", msg => {
    console.log("Message received by: "+bot.username+" "+msg)  //Logs the buffer in the console
})




