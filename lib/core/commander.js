/*
 * @Author: changjun anson1992@163.com
 * @Date: 2024-04-12 17:10:19
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2024-04-13 23:41:51
 * @FilePath: /CODE-CLI/lib/core/commander.js
 * @Description: 交互命令
 */
const myAction = require('./action')
const commander = (program) => {
  program
    .command('create <project> [other...]')
    .description('创建一个新项目')
    .alias('crt')
    .action(myAction)
}

module.exports = commander
