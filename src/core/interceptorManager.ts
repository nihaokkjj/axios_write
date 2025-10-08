
import { ResolveFn, RejectedFn } from "../types"

interface interceptor<T> {
  resolved: ResolveFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T>{
  private interceptors: Array<interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolveFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  //拦截器为私有类型, 需要提供方法访问
  forEach(fn: (interceptor: interceptor<T>)=>void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  //删除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}