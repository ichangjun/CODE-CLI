/*
 * @Author: changjun anson1992@163.com
 * @Date: 2024-04-12 11:11:04
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2024-04-13 23:51:23
 * @FilePath: /CODE-CLI/lib/helper.js
 * @Description: 帮助命令提示函数
 */

const helper = function (program) {
  // 添加命令选项（--help 时打印提示）
  program.option(
    '-f, --framework <framework>',
    '指定项目框架类型：大屏（screen）、管理后台（admin）、移动端（mobile）、NodeJS服务（server）'
  )
  program.parse(process.argv)
}

module.exports = helper
