const download = require('download-git-repo')
const ora = require('ora')
const chalk = require('chalk')

const downloadRepo = (url, project) => {
  const spinner = ora().start()
  spinner.text = '工程正在下载……'
  // 使用clone参数克隆远程仓库到本地
  console.log(`direct:${url}`, 888)
  download(`direct:${url}`, project, { clone: true }, (err) => {
    console.log(err, 999)
    if (!err) {
      spinner.succeed('工程下载成功')
      console.log(
        chalk.blue.bold('Done!'),
        chalk.bold('接下来，你可以进入工程目录，安装依赖，启动项目:')
      )
      console.log('cd ' + project)
      console.log('npm install / yarn')
      console.log('npm run dev')
    } else {
      spinner.fail('工程下载失败')
    }
  })
}

module.exports = downloadRepo
