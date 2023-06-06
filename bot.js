const { parentPort, workerData } = require("worker_threads")
const mineflayer = require('mineflayer');
const modules = require("./moduleLoader.js")

class UnitBot {
    constructor(username,viewDistance,version,keepAlive,checkTimeoutInterval,modules){
        this.modules=modules;
        this.username=username;
        this.viewDistance=viewDistance;
        this.version=version;
        this.keepAlive=keepAlive;
        this.checkTimeoutInterval=checkTimeoutInterval;
        this.init()
        this.loadModules()
    }
    init(){
        this.bot=mineflayer.createBot({
            host: workerData.host,
            port: workerData.port,
            username: this.username,
            viewDistance: this.viewDistance,
            version: this.version,
            keepAlive: this.keepAlive,
            checkTimeoutInterval: this.checkTimeoutInterval,
        });
        this.bot.on("login", () => {
            console.log("Bot "+this.bot.username+" logged in");
        });
        this.bot.on("end", () => {
            this.init();
        });
        this.bot.on("error", (err) => {
            console.log(err);
            this.init();
        });
        this.bot.on("kicked", (reason,loggedIn) => {
            console.log("Bot "+this.bot.username+" was kicked for "+reason+" while "+(loggedIn?"inside":"logging in"));
        });
    }
    loadModules(){
        this.modules.forEach((pluginName) => {
            modules.loadModule(this.bot, pluginName);
        })
    }
}


let initializing=[];
workerData.bots.forEach((config) => {
    const singleBot = new UnitBot(config.username,config.viewDistance,config.version,config.keepAlive,config.checkTimeoutInterval,config.modules)
    initializing.push(singleBot);
})
parentPort.on("message", msg => {
    console.log("Message received by: "+initializing[0].username+" "+msg)  //Logs the buffer in the console
})




