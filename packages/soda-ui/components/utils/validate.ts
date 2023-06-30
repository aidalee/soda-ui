import { inBrowser } from './basic'

export const isDef = <T>(val: T): val is NonNullable<T> =>
  val !== undefined && val !== null && val !== ''

export const isIOS = (): boolean =>
  inBrowser
    ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    : false
