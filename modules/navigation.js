const mineflayer = require('mineflayer') // eslint-disable-line
const {pathfinder, Movements,GoalBlock, GoalXZ, GoalY,  goals: {GoalFollow, GoalNear}} = require('mineflayer-pathfinder')

/**
 * @param bot {mineflayer.Bot}// to enable intellisense
 * @param target {mineflayer.Entity}
 * @param follow {boolean}
 */

function come(bot, target, follow=false) {
    const defaultMove = new Movements(bot)
    if (!target) {
        bot.chat("I don't see you !")
        return
    }
    const {x: playerX, y: playerY, z: playerZ} = target.position
    bot.pathfinder.setMovements(defaultMove)
    if(follow){
        bot.pathfinder.setGoal(new GoalFollow(target, 1), true)
    }else{
        bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, 1))
        bot.on('goal_reached', (goal) => {
            console.log('Here I am !')
        })
        bot.on('path_reset', (reason) => {
            console.log(`Path was reset for reason: ${reason}`)
        })
    }


}

module.exports = bot => {
    bot.loadPlugin(pathfinder)
    bot.once('spawn', () => {
        const defaultMove = new Movements(bot)

        bot.on('chat', (username, message) => {
            if (username === bot.username) return
            if (message.startsWith('come')) {
                const target = bot.players[username]?.entity
                come(bot, target,false)
            }else if(message.startsWith('stop')){
                bot.pathfinder.stop()
            }else if(message.startsWith('goto')){
                const cmd = message.split(' ')

                if (cmd.length === 4) { // goto x y z
                    const x = parseInt(cmd[1], 10)
                    const y = parseInt(cmd[2], 10)
                    const z = parseInt(cmd[3], 10)

                    bot.pathfinder.setMovements(defaultMove)
                    bot.pathfinder.setGoal(new GoalBlock(x, y, z))
                } else if (cmd.length === 3) { // goto x z
                    const x = parseInt(cmd[1], 10)
                    const z = parseInt(cmd[2], 10)

                    bot.pathfinder.setMovements(defaultMove)
                    bot.pathfinder.setGoal(new GoalXZ(x, z))
                } else if (cmd.length === 2) { // goto y
                    const y = parseInt(cmd[1], 10)

                    bot.pathfinder.setMovements(defaultMove)
                    bot.pathfinder.setGoal(new GoalY(y))
                }
            }else if(message.startsWith('follow')) {
                const target = bot.players[username]?.entity
                come(bot, target,true)
            }


        })
    })
}