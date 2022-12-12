import { isNumber, isString, kebabCase, toNumber } from '@soda-f2e/utils'

export const isRem = (val: unknown): val is string =>
  isString(val) && val.endsWith('rem')

export const isPx = (val: unknown): val is string | number =>
  (isString(val) && val.endsWith('px')) || isNumber(val)

export const isPercent = (val: unknown): val is string =>
  isString(val) && val.endsWith('%')

export const isVw = (val: unknown): val is string =>
  isString(val) && val.endsWith('vw')

export const isVh = (val: unknown): val is string =>
  isString(val) && val.endsWith('vh')

export const toPxNum = (val: unknown): number => {
  if (isNumber(val)) {
    return val
  }

  if (isPx(val)) {
    return +(val as string).replace('px', '')
  }

  if (isVw(val)) {
    return (+(val as string).replace('vw', '') * window.innerWidth) / 100
  }

  if (isVh(val)) {
    return (+(val as string).replace('vh', '') * window.innerHeight) / 100
  }

  if (isRem(val)) {
    const num = +(val as string).replace('rem', '')
    const rootFontSize = window.getComputedStyle(
      document.documentElement
    ).fontSize

    return num * parseFloat(rootFontSize)
  }

  if (isString(val)) {
    return toNumber(val)
  }

  // % and 0
  return 0
}

export const toSizeUnit = (val: unknown) => {
  if (val == null) {
    return undefined
  }

  if (isPercent(val) || isVw(val) || isVh(val) || isRem(val)) {
    return val
  }

  return `${toPxNum(val)}px`
}

export const getParentProp = (instance, name: string) => {
  if (instance.props && instance.props[name]) {
    return instance.props[name]
  }
  if (instance.parent.props && instance.parent.props[name]) {
    return instance.parent.props[name]
  }
  if (instance.parent.parent.props && instance.parent.parent.props[name]) {
    return instance.parent.parent.props[name]
  }
}
interface styleObj {
  [propName: string]: string | number
}

export const cleanStyle = (style: styleObj) => {
  for (const i in style) {
    if (typeof style[i] === 'undefined') {
      delete style[i]
    }
  }
  return style
}
