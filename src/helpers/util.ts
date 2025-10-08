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

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from ) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

//深拷贝
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) { // 确保在处理无效或非对象参数时不会崩溃
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) { 
        //检查属性值是否是另一个普通对象，如果是，则递归地合并这个嵌套对象
        //确保子对象也被合并
            result[key] = deepMerge(result[key], val)
            //避免重复合并
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  
  return result
}