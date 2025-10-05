import { isDate, isObject } from "./util"

function encode(val: string): string {
  //encodeURIComponent(val): 这是 JavaScript 的内置函数，
  // 用于对 URI（统一资源标识符）的组件进行编码。它会把大多数特殊字符
  // （包括空格、@、:、$ 等）转换成 %xx 的形式，
  // 以确保它们能安全地作为 URL 的一部分传输
  return encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/g, ':')
  .replace(/%24/g, '$')
  .replace(/%2ig/, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/ig, '[')
  .replace(/%5D/ig, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]' //告诉后端返回参数是一个数组
    } else {
      values = [val]
    }
    //对数据进行预处理
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  
  let serializedParams = parts.join('&')
  //将数组中的所有元素，通过指定的分隔符连接起来，组成一个单一的字符串并返回

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}