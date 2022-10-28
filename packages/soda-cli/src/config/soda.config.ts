import { pathExistsSync } from 'fs-extra'
import { mergeWith } from 'lodash'
import { outputFileSyncOnChange } from '../shared/fsUtils'

interface SodaConfig {
  name?: string
}

export function getSodaConfig(emit = false): any {
  let config: any = {}
}

export function defineConfig(conf: SodaConfig) {
  return conf
}
