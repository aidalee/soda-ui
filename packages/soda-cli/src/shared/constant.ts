import { resolve } from 'path'

export const CWD = process.cwd()

export const SRC_DIR = resolve(CWD, '../soda-ui/components')
export const ES_DIR = resolve(CWD, '../soda-ui/es')
export const LIB_DIR = resolve(CWD, '../soda-ui/lib')
export const UMD_DIR = resolve(CWD, '../soda-ui/umd')
export const TYPES_DIR = resolve(CWD, '../soda-ui/types')
export const UI_PACKAGE_JSON = resolve(CWD, '../soda-ui/package.json')
export const TESTS_DIR_NAME = 'test'
export const STYLE_DIR_NAME = 'style'
export const SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']
export const PUBLIC_DIR_INDEXES = [
  'index.vue',
  'index.tsx',
  'index.ts',
  'index.jsx',
  'index.js'
]
