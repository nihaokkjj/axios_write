import { isPlainObject } from "./util";

export function transformRequest (data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  // console.log('/help/data', data)
  //默认转化成JSON对象
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.error("解析错误");
    }
  }
  return data
}