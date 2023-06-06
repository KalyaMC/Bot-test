const worker = require('worker_threads');
const fs = require("fs");
const workers = [];

function loadConfig(path) {
    return JSON.parse(fs.readFileSync(path, {encoding: "utf8"}));
}

let botConfigs=loadConfig(process.argv[2]);
let i=0;
botConfigs.forEach((botConfig) => {
    botConfig.host=process.argv[3];
    botConfig.port=process.argv[4];
    setTimeout(function() {
        workers.push(new worker.Worker("./bot.js", { workerData: botConfig }));
    }, 500*i);
    i++;
})
//main function



