export type Method = 
'GET' 
| 'POST' 
| 'DELETE' 
| 'PATCH' 
| 'OPTIONS' 
| 'HEAD'
| 'Put'
| 'get' 
| 'post' 
| 'delete' 
| 'options' 
| 'patch' 
| 'head'
| 'put'

//请求
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  cancelToken?: CancelToken

  [propName: string]: any
}
//响应
export interface AxiosResponse<T=any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
// Promise封装
export interface AxiosPromise<T=any> extends
 Promise<AxiosResponse<T>> {

}

//错误
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>,
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T=any>(url: string, config?: AxiosRequestConfig): 
  AxiosPromise<T>
  
  delete<T=any>(url: string, config?: AxiosRequestConfig):
   AxiosPromise<T>
  
  head<T=any>(url: string, config?: AxiosRequestConfig): 
  AxiosPromise<T>
  
  options<T=any>(url: string, config?: AxiosRequestConfig): 
  AxiosPromise<T>

  post<T=any>(url: string, datat?: any, config?: AxiosRequestConfig): 
  AxiosPromise<T>
  
  put<T=any>(url: string, datat?: any, config?: AxiosRequestConfig): 
  AxiosPromise<T>
  
  patch<T=any>(url: string, datat?: any, config?: AxiosRequestConfig): 
  AxiosPromise<T>
} 

export interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
  //添加拦截器
  use(resolve: ResolveFn<T>, rejected?: RejectedFn): number
  //删除拦截器
  eject(id: number): void
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

//扩展方法
export interface AxiosStatic extends AxiosInstance {
  create(config: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

//取消
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested():void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}