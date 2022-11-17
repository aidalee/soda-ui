export const isString = (val: unknown): val is string => typeof val === 'string'

export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean'

export const isNumber = (val: unknown): val is number => typeof val === 'number'

export const isObject = (val: unknown): val is Record<string, any> =>
  typeof val === 'object' && val !== null

export const isPlainObject = (val: unknown): val is Record<string, any> =>
  Object.prototype.toString.call(val) === '[object Object]'

export const isArray = (val: unknown): val is Array<any> => Array.isArray(val)

export const isURL = (val: string | undefined | null) => {
  if (!val) {
    return false
  }

  return /^(http)|(\.*\/)/.test(val)
}

export const isEmpty = (val: unknown) =>
  val === undefined ||
  val === null ||
  val === '' ||
  (Array.isArray(val) && !val.length)

export const toNumber = (
  val: number | string | boolean | undefined | null
): number => {
  if (val == null) return 0

  if (isString(val)) {
    val = parseFloat(val)
    val = Number.isNaN(val) ? 0 : val
    return val
  }

  if (isBoolean(val)) return Number(val)

  return val
}

export const bigCamelize = (s: string): string =>
  camelize(s).replace(s.charAt(0), s.charAt(0).toUpperCase())

export const camelize = (s: string): string =>
  s.replace(/-(\w)/g, (_: any, p: string) => p.toUpperCase())

export const kebabCase = (s: string): string => {
  const ret = s.replace(/([A-Z])/g, ' $1').trim()
  return ret.split(' ').join('-').toLowerCase()
}
