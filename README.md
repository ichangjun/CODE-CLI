<!--
 * @Author: changjun anson1992@163.com
 * @Date: 2024-04-12 14:39:32
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2024-04-15 17:33:49
 * @FilePath: /CODE-CLI/README.md
 * @Description: 文档
-->

# CODE-CLI 脚手架工具工程的搭建步骤

## 1. 自定义全局命令

### 1.1. npm init -y 执行初始化，并添加 bin 脚本执行命令

npm i 简单，省略该步骤，直接执行 bin 脚本命令即可。

```json
{
  "name": "code-cli",
  "version": "2.0.0",
  "description": "code template cli",
  "main": "app.js",
  "bin": {
    "kd-code-cli": "./bin/cli.js"
  }
}
```

完成这一步，如果我们想要在 cmd 中执行 `code-cli` 命令，我们需要在全局环境中安装 `code-cli` 包。

执行 npm link，将当前项目链接到全局环境。

```bash
npm link
# 结果如下，表示已经成功
# changed 1 package, and audited 3 packages in 3s
```

### 1.2. 创建 bin 目录及 cli.js 文件

```bash
mkdir bin && touch bin/cli.js
```

### 1.3. 编写 cli.js 脚本

```js
#! /usr/bin/env node
// 这个注释很重要，它告诉系统使用哪个解释器来执行这个脚本。
// 这里使用了 Node.js 解释器。
console.log('Hello World!')
```

### 1.4. 执行 cli.js 脚本

```bash
code-cli
# 结果如下，表示成功输出 Hello World!
# Hello World!
```

## 2. 自定义命令行交互

### 2.1. 安装 inquirer 包

注意安装的 inquirer 的包版本，不要超过 8.0.0 版本，否则不支持 require 的引入方式。

```bash

npm i inquirer
```

### 2.2. 编写 core/action.js 脚本

```js
const inquirer = require('inquirer')

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
console.log('answer:', answer)
```

### 2.3. 引入 commander 插件，编写 core/commander.js 脚本，引入 action.js 脚本，并添加命令行交互

```js
const myAction = require('./action')
const commander = (program) => {
  program
    .command('create <project> [other...]')
    .description('创建一个新项目')
    .alias('crt')
    .action(myAction)
}
```

## 3. 根据和用户自定义交互信息，完善项目的创建逻辑，并实现从远端仓库拉取代码模板

### 3.1 引入 download-git-repo、ora、chalk 插件，实现从远端仓库拉取代码模板

我们用其中一种拉取仓库代码的方式，其他方式参考官方文档。

```js

download(`direct:${url}`, project, { clone: true }, (err) => {
    if (!err) {
      spinner.succeed('工程下载成功')
      } else {

      }
  }
```

### 3.2 下载加载 loading、提示语

使用 ora 插件实现下载过程中的等待效果，使用 chalk 插件实现提示语的颜色变化，更加直观和美观。

```js
const spinner = ora().start()
spinner.text = '工程正在下载……'
// 使用clone参数克隆远程仓库到本地
download(`direct:${url}`, project, { clone: true }, (err) => {
  if (!err) {
    spinner.succeed('工程下载成功')
    console.log(
      chalk.blue.bold('Done!'),
      chalk.blue.bold('接下来，你可以进入工程目录，安装依赖，启动项目:')
    )
    console.log('cd ' + project)
    console.log('npm install / yarn')
    console.log('npm run dev')
  } else {
    spinner.fail('工程下载失败')
  }
})
```

至此，一个简单版本的脚手架工具工程已经搭建完成，接下来可以根据自己的需求进行扩展和优化。

## 4. 扩展功能

### 4.1. 增加自定义模板功能

代码模板中的 package.json 文件的 配置是统一的，怎么根据和用户的自定义问答生成项目特定的配置呢，我们可以增加一个模板配置文件，然后根据用户的输入生成 package.json 文件。

```js

```
