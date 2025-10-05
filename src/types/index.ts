export type Method = 
'GET' | 'POST' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
| 'get' | 'post' | 'delete' | 'options' | 'patch' | 'head'


export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any
  atatus: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {
  
}