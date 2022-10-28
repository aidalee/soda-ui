import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
// import { injectHtml } from 'vite-plugin-html'
import { InlineConfig, PluginOption } from 'vite'
import { get } from 'lodash'
import { kebabCase } from '../shared/fsUtils'
import { resolve } from 'path'
import {
  copyFileSync,
  pathExistsSync,
  readFileSync,
  removeSync,
  writeFileSync
} from 'fs-extra'
import { CWD, ES_DIR, UMD_DIR, LIB_DIR } from '../shared/constant'
// 自定义vite插件 dir = UMD_DIR
function inlineCSS(fileName: string, dir: string): PluginOption {
  return {
    name: 'soda-inline-css-vite-plugin',
    apply: 'build',
    closeBundle() {
      const cssFile = resolve(dir, 'style.css')
      if (!pathExistsSync(cssFile)) {
        return
      }

      const jsFile = resolve(dir, fileName)
      const cssCode = readFileSync(cssFile, 'utf-8')
      const jsCode = readFileSync(jsFile, 'utf-8')
      const injectCode = `;(function(){var style=document.createElement('style');style.type='text/css';\
style.rel='stylesheet';style.appendChild(document.createTextNode(\`${cssCode.replace(/\\/g, '\\\\')}\`));\
var head=document.querySelector('head');head.appendChild(style)})();`
      writeFileSync(jsFile, `${injectCode}${jsCode}`)
      copyFileSync(cssFile, resolve(LIB_DIR, 'style.css'))
      removeSync(cssFile)
    }
  }
}

// 自定义vite插件
function clear(): PluginOption {
  return {
    name: 'soda-clear-vite-plugin',
    apply: 'build',
    closeBundle() {
      removeSync(resolve(CWD, 'dist')) // 这里为什么是dist 尚未看懂
    }
  }
}

export function getESMBundleConfig(
  sodaConfig: Record<string, any>
): InlineConfig {
  // Varlet(varlet.esm.js) => SodaUI(soda-ui.esm.js)
  // sodaConfig 应该只用到了name 那先定个常量代替
  // const name = get(sodaConfig, 'name')
  const name = 'SodaUI'
  const fileName = `${kebabCase(name)}.esm.js`

  return {
    logLevel: 'silent',
    build: {
      emptyOutDir: true,
      lib: {
        name,
        formats: ['es'],
        fileName: () => fileName,
        entry: resolve(ES_DIR, 'umdIndex.js')
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          dir: ES_DIR,
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
    plugins: [clear()]
  }
}

export function getUMDConfig(sodaConfig: Record<string, any>): InlineConfig {
  // Varlet(varlet.esm.js) => SodaUI(soda-ui.js)
  // sodaConfig 应该只用到了name 那先定个常量代替
  // const name = get(sodaConfig, 'name')
  const name = 'SodaUI'
  const fileName = `${kebabCase(name)}.js`

  return {
    logLevel: 'silent',
    build: {
      emptyOutDir: true,
      lib: {
        name,
        formats: ['umd'],
        fileName: () => fileName,
        entry: resolve(ES_DIR, 'umdIndex.js')
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          dir: UMD_DIR,
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
    plugins: [inlineCSS(fileName, UMD_DIR), clear()]
  }
}

// export function getBuildConfig(sodaConfig: Record<string, any>): InlineConfig {

// }
