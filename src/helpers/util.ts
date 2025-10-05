const toString = Object.prototype.toString

export function isDate(val: any):  val is Date {
  return toString.call(val) === '[objext Date]'
}

// export function isObject(val: any): val is Object {
//   return typeof val === 'object' && val !== null
// }

//判断是否为对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}