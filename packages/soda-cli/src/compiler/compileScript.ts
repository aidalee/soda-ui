import { writeFileSync, readFileSync, removeSync, writeFile } from 'fs-extra'
import { resolve } from 'path'
import { bigCamelize, replaceExt } from '../shared/fsUtils'
import { transformAsync } from '@babel/core'
import type { BabelFileResult } from '@babel/core'
import {
  extractStyleDependencies,
  REQUIRE_CSS_RE,
  IMPORT_CSS_RE,
  REQUIRE_SCSS_RE,
  IMPORT_SCSS_RE
} from './compileStyle'
// import 语法
export const IMPORT_VUE_PATH_RE =
  /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.vue(\s*['"`]);?(?!\s*['"`])/g
export const IMPORT_TS_PATH_RE =
  /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.ts(\s*['"`]);?(?!\s*['"`])/g
export const IMPORT_JSX_PATH_RE =
  /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.jsx(\s*['"`]);?(?!\s*['"`])/g
export const IMPORT_TSX_PATH_RE =
  /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.tsx(\s*['"`]);?(?!\s*['"`])/g
// require 语法
export const REQUIRE_VUE_PATH_RE =
  /(?<!['"`]\s*)(require\s*\(\s*['"]\s*\.{1,2}\/.+)\.vue(\s*['"`]\))(?!\s*['"`])/g
export const REQUIRE_TS_PATH_RE =
  /(?<!['"`]\s*)(require\s*\(\s*['"]\s*\.{1,2}\/.+)\.ts(\s*['"`]\))(?!\s*['"`])/g
export const REQUIRE_JSX_PATH_RE =
  /(?<!['"`]\s*)(require\s*\(\s*['"]\s*\.{1,2}\/.+)\.jsx(\s*['"`]\))(?!\s*['"`])/g
export const REQUIRE_TSX_PATH_RE =
  /(?<!['"`]\s*)(require\s*\(\s*['"]\s*\.{1,2}\/.+)\.tsx(\s*['"`]\))(?!\s*['"`])/g

const scriptReplacer = (_: any, p1: string, p2: string): string =>
  `${p1}.js${p2}`

export const replaceVueExt = (script: string): string =>
  script
    .replace(IMPORT_VUE_PATH_RE, scriptReplacer)
    .replace(REQUIRE_VUE_PATH_RE, scriptReplacer)

export const replaceTSExt = (script: string): string =>
  script
    .replace(IMPORT_TS_PATH_RE, scriptReplacer)
    .replace(REQUIRE_TS_PATH_RE, scriptReplacer)

export const replaceJSXExt = (script: string): string =>
  script
    .replace(IMPORT_JSX_PATH_RE, scriptReplacer)
    .replace(REQUIRE_JSX_PATH_RE, scriptReplacer)

export const replaceTSXExt = (script: string): string =>
  script
    .replace(IMPORT_TSX_PATH_RE, scriptReplacer)
    .replace(REQUIRE_TSX_PATH_RE, scriptReplacer)

// export const moduleCompatible = (script: string): string => {

// }

export async function compileScript(script: string, file: string) {
  const modules = process.env.BABEL_MODULE
  // 针对commonjs做了一下兼容处理
  // 替换一些导入语句，Varlet组件开发是基于ESM规范的，使用其他库时导入的肯定也是ESM版本，
  // 所以编译成commonjs模块时需要修改成对应的commonjs版本，Varlet引入的第三方库不多，主要就是dayjs
  // 此项目没有用到暂时不用转换处理
  if (modules === 'commonjs') {
    // script = moduleCompatible(script)
  }
  
  let { code } = (await transformAsync(script, {
    filename: file // js内容对应的文件名，babel插件会用到
  })) as BabelFileResult

  code = extractStyleDependencies(
    file,
    code as string,
    modules === 'commonjs' ? REQUIRE_CSS_RE : IMPORT_CSS_RE
  )
  // code = extractStyleDependencies(
  //   file,
  //   code as string,
  //   modules === 'commonjs' ? REQUIRE_LESS_RE : IMPORT_LESS_RE
  // )
  code = extractStyleDependencies(
    file,
    code as string,
    modules === 'commonjs' ? REQUIRE_SCSS_RE : IMPORT_SCSS_RE
  )
  code = replaceVueExt(code as string)
  code = replaceTSXExt(code as string)
  code = replaceJSXExt(code as string)
  code = replaceTSExt(code as string)

  removeSync(file)
  writeFileSync(replaceExt(file, '.js'), code, 'utf-8')
}

export async function compileScriptFile(file: string) {
  const sources = readFileSync(file, 'utf-8')
  await compileScript(sources, file)
}

export async function compileESEntry(dir: string, publicDirs: string[]) {
  // dir 即 dest（lib/es）
  // publicDirs 所有存在['index.vue', 'index.tsx', 'index.ts', 'index.jsx', 'index.js']这些文件之一的目录,也就是组件目录
  const imports: string[] = []
  const plugins: string[] = []
  const constInternalComponents: string[] = []
  const cssImports: string[] = []
  const publicComponents: string[] = []
  // 遍历组件目录名称
  publicDirs.forEach((dirname: string) => {
    // 连字符转驼峰
    const publicComponent = bigCamelize(dirname)
    // 收集组件名称
    publicComponents.push(publicComponent)
    // 收集组件导入语句
    imports.push(
      `import ${publicComponent}, * as ${publicComponent}Module from './${dirname}'`
    )
    // 收集内部组件导入语句
    constInternalComponents.push(
      `export const _${publicComponent}Component = ${publicComponent}Module._${publicComponent}Component || {}`
    )
    // 收集插件注册语句
    plugins.push(`${publicComponent}.install && app.use(${publicComponent})`)
    // 收集样式导入语句
    cssImports.push(`import './${dirname}/style'`)
  })
  // 拼接组件注册方法
  const install = `
    function install(app) {
      ${plugins.join('\n  ')}
    }
  `
  // 拼接导出入口index.js文件的内容，注意它是不包含样式的
  const indexTemplate = `\
${imports.join('\n')}\n
${constInternalComponents.join('\n')}\n
${install}
export {
  install,
  ${publicComponents.join(',\n  ')}
}
export default {
  install,
  ${publicComponents.join(',\n  ')}
}
`
  // 拼接css导入语句
  const styleTemplate = `\
${cssImports.join('\n')}
`
  // 拼接umdIndex.js文件，这个文件是用于后续打包umd和esm-bundle格式时作为打包入口，注意它是包含样式导入语句的
  const umdTemplate = `\
${imports.join('\n')}\n
${cssImports.join('\n')}\n
${install}
export {
  install,
  ${publicComponents.join(',\n  ')}
}
export default {
  install,
  ${publicComponents.join(',\n  ')}
}
`
  // 将拼接的内容写入到对应文件
  await Promise.all([
    writeFile(resolve(dir, 'index.js'), indexTemplate, 'utf-8'),
    writeFile(resolve(dir, 'umdIndex.js'), umdTemplate, 'utf-8'),
    writeFile(resolve(dir, 'style.js'), styleTemplate, 'utf-8')
  ])
}
export async function compileCommonJSEntry(dir: string, publicDirs: string[]) {
  const requires: string[] = []
  const plugins: string[] = []
  const cssRequires: string[] = []
  const publicComponents: string[] = []
  publicDirs.forEach((dirname: string) => {
    const publicComponent = bigCamelize(dirname)
    // 收集组件名称
    publicComponents.push(publicComponent)
    // 收集组件导入语句
    requires.push(`var ${publicComponent} = require('./${dirname}')['default']`)
    // 收集插件注册语句
    plugins.push(`${publicComponent}.install && app.use(${publicComponent})`)
    cssRequires.push(`require('./${dirname}/style')`)
  })
  // 拼接组件注册方法
  const install = `
function install(app) {
  ${plugins.join('\n  ')}
}
`
  // 拼接导出入口index.js文件内容
  const indexTemplate = `\
${requires.join('\n')}\n
${install}

module.exports = {
  install,
  ${publicComponents.join(',\n  ')}
}
`
  // 拼接css导入语句
  const styleTemplate = `\
${cssRequires.join('\n')}
`
  // 将拼接的内容写入到对应文件
  await Promise.all([
    writeFile(resolve(dir, 'index.js'), indexTemplate, 'utf-8'),
    writeFile(resolve(dir, 'style.js'), styleTemplate, 'utf-8')
  ])
}
