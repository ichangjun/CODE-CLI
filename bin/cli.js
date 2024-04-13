#! /usr/bin/env node
// 这个注释很重要，它告诉系统使用哪个解释器来执行这个脚本。
// 这里使用了 Node.js 解释器。
const { program } = require('commander')
const helper = require('../lib/core/helper')
const commander = require('../lib/core/commander')
helper(program)
commander(program)
program.parse(process.argv)
