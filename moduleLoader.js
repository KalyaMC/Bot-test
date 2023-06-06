const path = require('path')
const MODULES_DIRECTORY = path.join(__dirname, 'modules')



exports.loadModule=function loadModule(bot, moduleName) {
    const plugin = require(path.join(MODULES_DIRECTORY, moduleName+".js"))
    bot.loadPlugin(plugin)
}