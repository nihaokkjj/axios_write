import { isPlainObject } from "./util";
import { Method } from "../types";

//规范请求头名称
function normalizeHeaderName 
(headers: any, normalizedName: string): void {
  if (!headers) { //如果请求头不存在, 直接返回
    return
  }
  Object.keys(headers).forEach((name) => {
    //如果属性名只是格式上不同
    if (name !== normalizedName &&
       name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = headers[name]//规范
        delete headers[name]
       }
  })
}
export function processHeaders(headers: any, data: any) :any {
  normalizeHeaderName(headers, 'Content-Type') //规范属性名

  if (isPlainObject(data)) {
    //没有配置headers时,才做处理
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

//解析headers里面的内容
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

export function flatenHeaders(headers: any, method: Method) :
  any {
    if (!headers) {
      return headers
    }
  }
