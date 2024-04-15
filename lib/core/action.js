const inquirer = require('inquirer')
const fs = require('fs')
const chalk = require('chalk')
const config = require('../../config/index.js')
const download = require('./download.js')

const action = async (project) => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入工程名称：',
      default: project,
      validate(val) {
        if (!val) {
          return '项目名称不能为空'
        } else {
          return true
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: '请输入项目描述：',
      default: 'A new project'
    },
    {
      type: 'list',
      name: 'framework',
      message: '请选择项目框架：',
      choices: config.framework
    },
    {
      type: 'input',
      name: 'author',
      message: '请输入项目作者：'
    },
    {
      type: 'input',
      name: 'email',
      message: '请输入邮箱：',
      validate(val) {
        // 使用正则表达式验证邮箱格式
        if (val && !/^\S+@\S+\.\S+$/.test(val)) {
          return '请输入有效的邮箱地址'
        } else {
          return true
        }
      }
    }
  ])
  // 检测工程目录是否存在
  if (fs.existsSync(project)) {
    console.log(chalk.red.bold('工程目录已存在'))
    return
  }
  // 下载代码模板
  download(config.frameworkUrl[answer.framework], project, answer)
}

module.exports = action
