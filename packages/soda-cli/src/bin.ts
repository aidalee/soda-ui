#!/usr/bin/env node
import { Command } from 'commander'
import { release } from './commands/release'
import { compile } from './commands/compile'
// 创建命令行对象
const cmd = new Command()

cmd
  .command('compile')
  .description('Compile varlet components library code')
  .option('-nu, --noUmd', 'Do not compile umd target code')
  .action(compile)

cmd
  .command('release')
  .option('-r --remote <remote>', 'Remote name')
  .description('Release all packages and generate changelogs')
  .action(release)

// 执行命令行参数的解析
cmd.parse()
