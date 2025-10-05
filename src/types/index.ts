export type Method = 
'GET' | 'POST' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
| 'get' | 'post' | 'delete' | 'options' | 'patch' | 'head'


export interface AxiosRequestConfig {
  url: string
  method?: string //默认为get请求
  data?:any
  params?:any
}