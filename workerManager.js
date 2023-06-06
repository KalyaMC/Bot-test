const { Worker, isMainThread, workerData, parentPort } = require("worker_threads")

exports.createBot = function (botConfig) {
    new Worker("./bot.js", { workerData: botConfig })
}