#!/usr/bin/env node
console.log('node bin test')
import { Command } from 'commander'
import { compile } from './commands/compile'
// 创建命令行对象
const cmd = new Command()

cmd
  .command('compile')
  .description('Compile varlet components library code')
  .option('-nu, --noUmd', 'Do not compile umd target code')
  .action(compile)
// 执行命令行参数的解析
cmd.parse()
