const worker = require('worker_threads');
const fs = require("fs");
const workers = [];

function loadConfig(path) {
    return JSON.parse(fs.readFileSync(path, {encoding: "utf8"}));
}

let wbotConfigs=loadConfig(process.argv[2]);
let i=0;
wbotConfigs.forEach((wBotConfig) => {
    setTimeout(function() {
        workers.push(new worker.Worker("./bot.js", { workerData: wBotConfig }));
    }, 500*i);
    i++;
})
//main function



