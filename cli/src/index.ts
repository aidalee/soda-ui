import { Command } from 'commander'
// import * as inquirer from 'inquirer'
// import { red } from 'kolorist'
import { onCreate } from '../command/create'
// 创建命令行对象
const cmd = new Command()
// const CREATE_TYPES = ['component', 'lib-entry']
// 注册命令、参数，以及用户传入之后的回调函数
// eg. tsnd ./src/index.ts create
cmd
  .command('create')
  .description('创建一个组件模版或配置文件')
  // 添加命令行参数-t ｜ --type,<type>表明为必选参数
  .option('-t --type <type>', '创建类型，可选值：component, lib-entry')
  // 注册回掉函数
  .action(onCreate)
// 执行命令行参数的解析
cmd.parse()
