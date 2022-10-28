import { extname, resolve } from 'path'
import {
  appendFileSync,
  ensureFileSync,
  lstatSync,
  outputFileSync,
  pathExistsSync,
  readdir,
  readFileSync
} from 'fs-extra'
import { PUBLIC_DIR_INDEXES, SCRIPTS_EXTENSIONS, SRC_DIR } from './constant'
// getPublicDirs, isDir, isDTS, isLess, isScript, isSFC
export const isPublicDir = (dir: string): boolean =>
  PUBLIC_DIR_INDEXES.some(index => pathExistsSync(resolve(dir, index)))

export async function getPublicDirs(): Promise<string[]> {
  const srcDir: string[] = await readdir(SRC_DIR)
  return srcDir.filter((filename: string) =>
    isPublicDir(resolve(SRC_DIR, filename))
  )
}

export const isDir = (file: string): boolean =>
  pathExistsSync(file) && lstatSync(file).isDirectory()

export const isDTS = (file: string): boolean =>
  pathExistsSync(file) && file.endsWith('.d.ts')

export const isScript = (file: string): boolean =>
  pathExistsSync(file) && SCRIPTS_EXTENSIONS.includes(extname(file))

export const isLess = (file: string): boolean =>
  pathExistsSync(file) && extname(file) === '.less'

export const isScss = (file: string): boolean =>
  pathExistsSync(file) && extname(file) === '.scss'

export const isSFC = (file: string): boolean =>
  pathExistsSync(file) && extname(file) === '.vue'

export const replaceExt = (file: string, ext: string): string =>
  file.replace(extname(file), ext)

export function smartAppendFileSync(file: string, code: string) {
  if (pathExistsSync(file)) {
    const content = readFileSync(file, 'utf-8')

    if (!content.includes(code)) {
      appendFileSync(file, code)
    }
  }
}

export function outputFileSyncOnChange(path: string, code: string) {
  ensureFileSync(path)
  const content = readFileSync(path, 'utf-8')
  if (content !== code) {
    outputFileSync(path, code)
  }
}

export function kebabCase(str: string) {
  str = str.replace(str.charAt(0), str.charAt(0).toLowerCase())
  return str.replace(
    /([a-z])([A-Z])/g,
    (_, p1, p2) => p1 + '-' + p2.toLowerCase()
  )
}

export function camelize(str: string): string {
  return str.replace(/-(\w)/g, (_: any, p: string) => p.toUpperCase())
}

export function bigCamelize(str: string): string {
  return camelize(str).replace(str.charAt(0), str.charAt(0).toUpperCase())
}
