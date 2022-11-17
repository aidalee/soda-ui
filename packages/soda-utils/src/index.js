'use strict'
exports.__esModule = true
exports.kebabCase =
  exports.camelize =
  exports.bigCamelize =
  exports.toNumber =
  exports.isEmpty =
  exports.isURL =
  exports.isArray =
  exports.isPlainObject =
  exports.isObject =
  exports.isNumber =
  exports.isBoolean =
  exports.isString =
    void 0
var isString = function (val) {
  return typeof val === 'string'
}
exports.isString = isString
var isBoolean = function (val) {
  return typeof val === 'boolean'
}
exports.isBoolean = isBoolean
var isNumber = function (val) {
  return typeof val === 'number'
}
exports.isNumber = isNumber
var isObject = function (val) {
  return typeof val === 'object' && val !== null
}
exports.isObject = isObject
var isPlainObject = function (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}
exports.isPlainObject = isPlainObject
var isArray = function (val) {
  return Array.isArray(val)
}
exports.isArray = isArray
var isURL = function (val) {
  if (!val) {
    return false
  }
  return /^(http)|(\.*\/)/.test(val)
}
exports.isURL = isURL
var isEmpty = function (val) {
  return (
    val === undefined ||
    val === null ||
    val === '' ||
    (Array.isArray(val) && !val.length)
  )
}
exports.isEmpty = isEmpty
var toNumber = function (val) {
  if (val == null) return 0
  if ((0, exports.isString)(val)) {
    val = parseFloat(val)
    val = Number.isNaN(val) ? 0 : val
    return val
  }
  if ((0, exports.isBoolean)(val)) return Number(val)
  return val
}
exports.toNumber = toNumber
var bigCamelize = function (s) {
  return (0, exports.camelize)(s).replace(
    s.charAt(0),
    s.charAt(0).toUpperCase()
  )
}
exports.bigCamelize = bigCamelize
var camelize = function (s) {
  return s.replace(/-(\w)/g, function (_, p) {
    return p.toUpperCase()
  })
}
exports.camelize = camelize
var kebabCase = function (s) {
  var ret = s.replace(/([A-Z])/g, ' $1').trim()
  return ret.split(' ').join('-').toLowerCase()
}
exports.kebabCase = kebabCase
