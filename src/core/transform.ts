import { AxiosTransformer } from "../types";

export default function transform(
  data: any,
  headers: any, 
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
    if (!fns) {
      return data
    }
    if (!Array.isArray(fns)) { //转成数组
      fns = [fns]
    }
    //遍历转化数组, 依次处理数据
    fns.forEach(fn => {
      data = fn(data, headers)
    })
    return data
}