/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const fs = require('fs-extra')

// 引入vite导出的build方法，用它来创建
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')
const version = require('../package.json').version

// 基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})
// 入口文件
const entryFile = path.resolve(__dirname, './entry.ts')
// 组件目录
const componentsDir = path.resolve(__dirname, '../packages/soda')
// 输出目录
const outputDir = path.resolve(__dirname, '../lib')

// rollup配置
const rollupOptions = {
  // 外置
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

// 生成package.json

const createPackageJson = name => {
  // 预设模板
  const fileStr = `{
    "name": "${name ? name : 'soda-ui'}",
    "version": "${version}",
    "main": "${name ? 'index.umd.js' : 'soda-ui.umd.js'}",
    "module": "${name ? 'index.umd.js' : 'soda-ui.umd.js'}",
    "author": "aidalee",
    "description": "mobile web components",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/aidalee/soda-ui.git"
    },
    "keywords": ["vue3", "组件库", "tsx", "UI"],
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/aidalee/soda-ui/issues"
    }
  }`

  if (name) {
    // 单个组件 输出组件对应的package.json
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    // 全量
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}

// 但组件按需构建
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: path.resolve(outputDir, name)
      }
    })
  )
  createPackageJson(name)
}

// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'soda-ui',
          fileName: 'soda-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
  // 生成package.json
  createPackageJson()
}

const buildLib = async () => {
  await buildAll()

  // 按需打包
  fs.readdirSync(componentsDir)
    .filter(name => {
      // 只找目录不找文件（排除组件文件夹以外的其他文件），且里面包含index.ts
      const componentDir = path.resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => {
      await buildSingle(name)
    })
}
// 执行创建
buildLib()
