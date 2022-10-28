import { CWD } from '../shared/constant'
import { build } from 'vite'
import { resolve } from 'path'
import { copy, ensureFileSync, readdir, removeSync } from 'fs-extra'
import {
  SRC_DIR,
  ES_DIR,
  LIB_DIR,
  TESTS_DIR_NAME,
  STYLE_DIR_NAME
} from '../shared/constant'
import {
  compileESEntry,
  compileCommonJSEntry,
  compileScriptFile
} from './compileScript'
import { compileScss } from './compileStyle'
import {
  getPublicDirs,
  isDir,
  isDTS,
  isLess,
  isScss,
  isScript,
  isSFC
} from '../shared/fsUtils'
import { getESMBundleConfig, getUMDConfig } from '../config/vite.config'
import { getSodaConfig } from '../config/soda.config'

export function compileUMD() {
  return new Promise<void>((resolve, reject) => {
    const config = getUMDConfig(getSodaConfig())
    build(config)
      .then(() => resolve())
      .catch(reject)
  })
}

export function compileESMBundle() {
  return new Promise<void>((resolve, reject) => {
    const config = getESMBundleConfig(getSodaConfig())
    build(config)
      .then(() => resolve)
      .catch(reject)
  })
}

export async function compileDir(dir: string) {
  // 此处的dir为单个组件目录 如 button、tag文件目录
  // 读取组件目录
  const dirs = await readdir(dir)
  // 遍历组件目录下的文件
  await Promise.all(
    dirs.map(filename => {
      const file = resolve(dir, filename)
      // 删除组件目录下的__test__目录、example目录、docs目录   此项目没有example、docs
      // ;[TESTS_DIR_NAME, EXAMPLE_DIR_NAME, DOCS_DIR_NAME].includes(filename) && removeSync(file)
      ;[TESTS_DIR_NAME].includes(filename) && removeSync(file)
      // 如果是.d.ts文件或者是style目录（前面为样式入口文件创建的目录）直接返回
      if (isDTS(file) || filename === STYLE_DIR_NAME) {
        return Promise.resolve()
      }
      // 编译文件
      // 删除了不需要的目录，然后针对需要编译的文件调用了compileFile方法：
      return compileFile(file)
    })
  )
}

export async function compileFile(file: string) {
  // 编译vue文件
  // isSFC(file) && (await compileSFC(file))
  // 编译js文件
  isScript(file) && (await compileScriptFile(file))
  // 编译less文件
  // isLess(file) && (await compileLess(file))
  // 编译scss文件
  isScss(file) && (await compileScss(file))
  // 如果是目录则进行递归
  isDir(file) && (await compileDir(file))
}

export async function compileModule(
  modules: 'umd' | 'commonjs' | 'esm-bundle' | boolean = false
) {
  // console.log('cwd...', CWD)
  if (modules == 'umd') {
    // 打包成umd格式
    await compileUMD()
    return
  }

  if (modules == 'esm-bundle') {
    // 打包成esm-bundle格式
    await compileESMBundle()
    return
  }
  // 打包commonjs和module格式
  // 打包前设置一下环境变量
  process.env.BABEL_MODULE = modules === 'commonjs' ? 'commonjs' : 'module'
  // 设置输出目录
  // ES_DIR：varlet-ui/es
  // LIB_DIR：varlet-ui/lib
  const dest = modules === 'commonjs' ? LIB_DIR : ES_DIR
  // console.log('dest', dest)
  // SRC_DIR：varlet-ui/src，直接将组件的源码目录复制到输出目录
  try {
    await copy(SRC_DIR, dest)
  } catch (error) {
    console.log(error, 'error')
  }

  // console.log(SRC_DIR, 'SRC_DIR')
  // 读取输出目录赋值给moduleDir变量
  const moduleDir: string[] = await readdir(dest)
  // console.log('moduleDir...', moduleDir)
  // 遍历打包每个组件
  await Promise.all(
    // 遍历每个组件目录
    moduleDir.map((filename: string) => {
      const file: string = resolve(dest, filename)
      // 在每个组件目录下新建样式入口文件
      isDir(file) && ensureFileSync(resolve(file, './style/index.js'))
      // 调用compileDir打包每个组件（目录）
      return isDir(file) ? compileDir(file) : null
    })
  )

  // 遍历package目录 找到所有存在['index.vue', 'index.tsx', 'index.ts', 'index.jsx', 'index.js']这些文件之一的目录
  const publicDirs = await getPublicDirs()
  // 打包（打包主入口？。）
  if (modules === 'commonjs') {
    await compileCommonJSEntry(dest, publicDirs)
  } else {
    await compileESEntry(dest, publicDirs)
  }
  // 在输出目录增加index.d.ts文件
  // generateReference(dest)
}
