export const isString = val => typeof val === 'string'
export const isBoolean = val => typeof val === 'boolean'
export const isNumber = val => typeof val === 'number'
export const isObject = val => typeof val === 'object' && val !== null
export const isPlainObject = val =>
  Object.prototype.toString.call(val) === '[object Object]'
export const isArray = val => Array.isArray(val)
export const isURL = val => {
  if (!val) {
    return false
  }
  return /^(http)|(\.*\/)/.test(val)
}
export const isEmpty = val =>
  val === undefined ||
  val === null ||
  val === '' ||
  (Array.isArray(val) && !val.length)
export const toNumber = val => {
  if (val == null) return 0
  if (isString(val)) {
    val = parseFloat(val)
    val = Number.isNaN(val) ? 0 : val
    return val
  }
  if (isBoolean(val)) return Number(val)
  return val
}
export const bigCamelize = s =>
  camelize(s).replace(s.charAt(0), s.charAt(0).toUpperCase())
export const camelize = s => s.replace(/-(\w)/g, (_, p) => p.toUpperCase())
export const kebabCase = s => {
  const ret = s.replace(/([A-Z])/g, ' $1').trim()
  return ret.split(' ').join('-').toLowerCase()
}
