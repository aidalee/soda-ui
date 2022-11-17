import hash from 'hash-sum'
import { parse, resolve } from 'path'
import { readFile, writeFileSync } from 'fs-extra'
import { parse as parseSFC, compileTemplate, compileStyle } from '@vue/compiler-sfc'
import { replaceExt, smartAppendFileSync } from '../shared/fsUtils'
import { compileScript } from './compileScript'
import {
  clearEmptyLine,
  compileScss,
  extractStyleDependencies,
  normalizeStyleDependency,
  STYLE_IMPORT_RE
} from './compileStyle'
import type { SFCStyleBlock } from '@vue/compiler-sfc'
import logger from '../shared/logger'

const NORMAL_EXPORT_START_RE = /export\s+default\s+{/
const DEFINE_EXPORT_START_RE = /export\s+default\s+defineComponent\s*\(\s*{/

export function injectRender(script: string, render: string): string {
  if (DEFINE_EXPORT_START_RE.test(script.trim())) {
    return script.trim().replace(
      DEFINE_EXPORT_START_RE,
      `${render}\nexport default defineComponent({
        render,\
      `
    )
  }
  if (NORMAL_EXPORT_START_RE.test(script.trim())) {
    return script.trim().replace(
      NORMAL_EXPORT_START_RE,
      `${render}\nexport default {
        render,\
      `
    )
  }
  return script
}

export async function compileSFC(sfc: string) {
  // 使用@vue/compiler-sfc包来解析Vue单文件，parse方法可以解析出Vue单文件中的各个块，针对各个块，
  // @vue/compiler-sfc包都提供了相应的编译方法，后续都会涉及到
  const sources: string = await readFile(sfc, 'utf-8')
  const { descriptor } = parseSFC(sources, { sourceMap: false })

  const { script, scriptSetup, template, styles } = descriptor
  if (scriptSetup) {
    logger.warning(
      `\n soda Cli does not support compiling script setup syntax\
       \n  The error in ${sfc}`
    )
    return
  }
  // scoped
  const hasScope = styles.some((style) => style.scoped)
  const id = hash(sources)
  const scopeId = hasScope ? `data-v-${id}` : ''
  if (script) {
    // template
    const render = template && compileTemplate({
      id,
      source: template.content,
      filename: sfc,
      compilerOptions: {
        scopeId
      }
    })
    let { content } = script

    if (render) {
      const { code } = render
      content = injectRender(content, code)
    }
    // script
    // script部分，主要是ts、tsx文件，部分组件是使用Vue单文件编写的，
    // 不过也有一些组件使用的是tsx 在compileModule.ts中直接调用了compileScriptFile处理整个文件
    await compileScript(content, sfc)
    // style
    for ( let index = 0; index < styles.length; index++ ) {
      const style: SFCStyleBlock = styles[index]
      const file = replaceExt(sfc, `Sfc${index || ''}.${style.lang || 'css'}`)
      const { base, dir } = parse(file)
      const dependencyPath = normalizeStyleDependency(base, STYLE_IMPORT_RE)
      const cssFile = resolve(dir, './style/index.js')

      let { code } = compileStyle({
        source: style.content,
        filename: file,
        id: scopeId,
        scoped: style.scoped
      })
      // extractStyleDependencies方法会...
      // 那么会生成一个ButtonSfc.scss，因为是scss，所以同时也会再编译生成一个ButtonSfc.css文件，
      // 当然这两个样式文件里只包括内联在Vue单文件中的样式，
      // 不包括使用@import导入的样式，所以生成的这两个样式文件都是空的
      code = extractStyleDependencies(file, code, STYLE_IMPORT_RE)
      writeFileSync(file, clearEmptyLine(code), 'utf-8')
      smartAppendFileSync(
        cssFile,
        process.env.BABEL_MODULE === 'commonjs'
          ? `require('${dependencyPath}.css')\n`
          : `import '${dependencyPath}.css'\n`
      )

      if(style.lang === 'scss') {
        await compileScss(file)
      }

    }

  }
}