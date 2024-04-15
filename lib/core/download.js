const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

// 修改工程的package.json文件
const updatePackageJson = (project, answer) => {
  const packageJson = fs.readFileSync(path.join(project, 'package.json'), 'utf-8')
  const json = JSON.parse(packageJson)
  Object.keys(answer).forEach((key) => {
    if (key === 'name') {
      json.name = answer[key] ? answer[key] : project
    } else {
      json[key] = answer[key]
    }
  })
  // 写入新的package.json文件
  fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify(json, null, 2))
  console.log(chalk.green.bold('工程初始化成功！'))
}

const downloadRepo = (url, project, answer) => {
  const spinner = ora().start()
  spinner.text = '工程正在下载……'
  // 使用clone参数克隆远程仓库到本地
  download(`direct:${url}`, project, { clone: true }, (err) => {
    if (!err) {
      spinner.succeed('success')
      console.log(chalk.green.bold('工程下载成功！'))
      updatePackageJson(project, answer)
      console.log(
        chalk.blue.bold('Done!'),
        chalk.blue.bold('接下来，你可以进入工程目录，安装依赖，启动项目:')
      )
      console.log('cd ' + project)
      console.log('npm install / yarn')
      console.log('npm run dev')
    } else {
      spinner.fail('工程下载失败')
      console.log(chalk.red.bold('Error:'), err)
    }
  })
}

module.exports = downloadRepo
