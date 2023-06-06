const mineflayer = require('mineflayer') // eslint-disable-line

/**
 * @param {mineflayer.Bot} bot // to enable intellisense
 */

module.exports = bot => {


    bot.on('chat', (username, message) => {
        if(message.startsWith("execute")){
            bot.chat("/"+message.substring(8))
        }else if(message.startsWith("eval")){
            eval(message.substring(5))
        }else if(message.startsWith("echo")){
            bot.chat(message.substring(5))
        }
    })
}