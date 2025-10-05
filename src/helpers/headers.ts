import { isPlainObject } from "./util";

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