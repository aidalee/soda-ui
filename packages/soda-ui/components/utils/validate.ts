export const isDef = <T>(val: T): val is NonNullable<T> =>
  val !== undefined && val !== null && val !== ''
