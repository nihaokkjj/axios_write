import { AxiosPromise, AxiosRequestConfig, AxiosResponse,
   Method, ResolveFn, RejectedFn } from "../types";
import dispatchResquest from "./dispatchResquest";
import InterceptorManager from "./interceptorManager";
import mergeConfig from "./mergeCOnfig";

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config:AxiosRequestConfig) => AxiosPromise),
  rejected?: RejectedFn
}

export default class Axios {

  defaults: AxiosRequestConfig
  //拦截器
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  //支持重载, 多种方式调用
  //只对函数内部做修改, 实际接口并未改变
  request(url: any, config?: any) {
    if(typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    //拦截器链
    const chain: PromiseChain<any>[] = [{
      resolved: dispatchResquest,
      rejected: undefined
    }]
    //对于请求拦截器, 后添加的先执行
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    //对于响应拦截器, 先添加的先执行
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const {resolved, rejected} = chain.shift()!
      //删除并返回第一个拦截器

      //利用promise的链式调用
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWidthoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWidthoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWidthoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWidthoutData('options', url, config)
  }

  post (url: string, data?: any, config?: AxiosRequestConfig) 
  :AxiosPromise {
    return this._requestMethodWidthData('post', url, data, config)
  }

  put (url: string, data?: any, config?: AxiosRequestConfig) 
  :AxiosPromise {
    return this._requestMethodWidthData('put', url, data, config)
  }

  patch (url: string, data?: any, config?: AxiosRequestConfig) 
  :AxiosPromise {
    return this._requestMethodWidthData('patch', url, data, config)
  }

  _requestMethodWidthoutData
  (method: Method, url: string, config?:AxiosRequestConfig)
   :AxiosPromise{
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }

  _requestMethodWidthData
  (method: Method, url: string, data?: any, config?: AxiosRequestConfig)
   :AxiosPromise{
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }
}


